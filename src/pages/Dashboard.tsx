import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { formatMoney } from '../utils/format';

interface Stats {
  revenue: number;
  quoteCounts: Record<string, number>;
  invoiceCounts: Record<string, number>;
  clientsCount: number;
  upcomingAppointments: { id: string; starts_at: string; client_id: string; clients: { first_name: string; last_name: string } | null }[];
}

const EMPTY_STATS: Stats = {
  revenue: 0,
  quoteCounts: { draft: 0, sent: 0, accepted: 0, refused: 0 },
  invoiceCounts: { paid: 0, sent: 0, late: 0 },
  clientsCount: 0,
  upcomingAppointments: [],
};

export default function Dashboard() {
  const { business } = useAuth();
  const { t, lang } = useI18n();
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!business) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const [invoicesRes, quotesRes, clientsRes, apptRes] = await Promise.all([
        supabase.from('invoices').select('status, total, paid_total').eq('business_id', business.id),
        supabase.from('quotes').select('status').eq('business_id', business.id),
        supabase.from('clients').select('id', { count: 'exact', head: true }).eq('business_id', business.id),
        supabase
          .from('appointments')
          .select('id, starts_at, client_id, clients(first_name, last_name)')
          .eq('business_id', business.id)
          .gte('starts_at', new Date().toISOString())
          .order('starts_at', { ascending: true })
          .limit(5),
      ]);

      if (cancelled) return;

      const revenue = (invoicesRes.data ?? [])
        .filter((i) => i.status === 'paid' || i.status === 'partial')
        .reduce((sum, i) => sum + Number(i.paid_total ?? 0), 0);

      const quoteCounts: Record<string, number> = { draft: 0, sent: 0, accepted: 0, refused: 0 };
      (quotesRes.data ?? []).forEach((q) => {
        quoteCounts[q.status] = (quoteCounts[q.status] ?? 0) + 1;
      });

      const invoiceCounts: Record<string, number> = { paid: 0, sent: 0, late: 0 };
      (invoicesRes.data ?? []).forEach((i) => {
        const key = i.status === 'partial' ? 'sent' : i.status;
        if (key in invoiceCounts) invoiceCounts[key] += 1;
      });

      setStats({
        revenue,
        quoteCounts,
        invoiceCounts,
        clientsCount: clientsRes.count ?? 0,
        // @ts-expect-error - Supabase join typing simplified for this view
        upcomingAppointments: apptRes.data ?? [],
      });
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [business]);

  if (!business) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium text-ink">{t.nav.dashboard}</h1>
        <p className="text-sm text-ink/55">{t.dashboard.welcome} {business.name}.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-sm text-ink/50">{t.dashboard.revenue}</p>
          <p className="mt-2 font-display text-2xl font-medium text-ink">
            {loading ? '—' : formatMoney(stats.revenue, business.currency)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-ink/50">{t.nav.clients}</p>
          <p className="mt-2 font-display text-2xl font-medium text-ink">{loading ? '—' : stats.clientsCount}</p>
        </div>
        <div className="card">
          <p className="mb-2 text-sm text-ink/50">{t.dashboard.quotes}</p>
          <ul className="space-y-1 text-sm text-ink/70">
            <li>{t.dashboard.drafts} — {stats.quoteCounts.draft}</li>
            <li>{t.dashboard.sent} — {stats.quoteCounts.sent}</li>
            <li>{t.dashboard.accepted} — {stats.quoteCounts.accepted}</li>
            <li>{t.dashboard.refused} — {stats.quoteCounts.refused}</li>
          </ul>
        </div>
        <div className="card">
          <p className="mb-2 text-sm text-ink/50">{t.dashboard.invoices}</p>
          <ul className="space-y-1 text-sm text-ink/70">
            <li>{t.dashboard.paid} — {stats.invoiceCounts.paid}</li>
            <li>{t.dashboard.waiting} — {stats.invoiceCounts.sent}</li>
            <li>{t.dashboard.late} — {stats.invoiceCounts.late}</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium text-ink">{t.dashboard.upcoming}</h2>
          <Link to="/rendez-vous" className="text-sm text-moss-600 hover:underline">{t.dashboard.viewAgenda}</Link>
        </div>
        {loading ? (
          <p className="text-sm text-ink/50">{t.common.loading}</p>
        ) : stats.upcomingAppointments.length === 0 ? (
          <p className="text-sm text-ink/50">{t.dashboard.noUpcoming}</p>
        ) : (
          <ul className="divide-y divide-ink/10">
            {stats.upcomingAppointments.map((appt) => (
              <li key={appt.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink/80">
                  {appt.clients ? `${appt.clients.first_name} ${appt.clients.last_name}` : t.common.client}
                </span>
                <span className="text-ink/50">
                  {new Date(appt.starts_at).toLocaleString(lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-MA' : 'fr-MA', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
