import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import { formatMoney } from '../utils/format';
import type { Client, Quote, Invoice, Appointment } from '../types';

export default function ClientDetail() {
  const { id } = useParams();
  const { business } = useAuth();
  const { t, lang } = useI18n();
  const [client, setClient] = useState<Client | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!business || !id) return;
    (async () => {
      const [clientRes, quotesRes, invoicesRes, apptRes] = await Promise.all([
        supabase.from('clients').select('*').eq('id', id).single(),
        supabase.from('quotes').select('*').eq('client_id', id).order('created_at', { ascending: false }),
        supabase.from('invoices').select('*').eq('client_id', id).order('created_at', { ascending: false }),
        supabase.from('appointments').select('*').eq('client_id', id).order('starts_at', { ascending: false }),
      ]);
      setClient(clientRes.data as Client);
      setQuotes((quotesRes.data as Quote[]) ?? []);
      setInvoices((invoicesRes.data as Invoice[]) ?? []);
      setAppointments((apptRes.data as Appointment[]) ?? []);
    })();
  }, [business, id]);

  if (!client) return <p className="text-sm text-ink/50">{t.common.loading}</p>;

  const totalPaid = invoices.reduce((s, i) => s + Number(i.paid_total), 0);
  const totalDue = invoices.reduce((s, i) => s + (Number(i.total) - Number(i.paid_total)), 0);

  return (
    <div className="space-y-6">
      <Link to="/clients" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft size={16} /> Retour aux clients
      </Link>

      <div>
        <h1 className="font-display text-2xl font-medium text-ink">{client.first_name} {client.last_name}</h1>
        <p className="text-sm text-ink/55">{client.phone} {client.email && `· ${client.email}`}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-ink/50">{t.clients.totalPaid}</p>
          <p className="mt-1 font-display text-xl font-medium text-ink">{formatMoney(totalPaid, business?.currency)}</p>
        </div>
        <div className="card">
          <p className="text-sm text-ink/50">{t.clients.totalDue}</p>
          <p className="mt-1 font-display text-xl font-medium text-ink">{formatMoney(totalDue, business?.currency)}</p>
        </div>
        <div className="card">
          <p className="text-sm text-ink/50">{t.common.address}</p>
          <p className="mt-1 text-sm text-ink/70">{client.address || '—'} {client.city}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-3 font-medium text-ink">{t.nav.quotes}</h2>
        {quotes.length === 0 ? <p className="text-sm text-ink/50">{t.clients.noQuotes}</p> : (
          <ul className="divide-y divide-ink/10 text-sm">
            {quotes.map((q) => (
              <li key={q.id} className="flex justify-between py-2">
                <span>{q.number}</span>
                <span className="text-ink/50">{q.status}</span>
                <span>{formatMoney(q.total, business?.currency)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2 className="mb-3 font-medium text-ink">{t.nav.invoices}</h2>
        {invoices.length === 0 ? <p className="text-sm text-ink/50">{t.clients.noInvoices}</p> : (
          <ul className="divide-y divide-ink/10 text-sm">
            {invoices.map((inv) => (
              <li key={inv.id} className="flex justify-between py-2">
                <span>{inv.number}</span>
                <span className="text-ink/50">{inv.status}</span>
                <span>{formatMoney(inv.total, business?.currency)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2 className="mb-3 font-medium text-ink">{t.nav.appointments}</h2>
        {appointments.length === 0 ? <p className="text-sm text-ink/50">{t.clients.noAppointments}</p> : (
          <ul className="divide-y divide-ink/10 text-sm">
            {appointments.map((a) => (
              <li key={a.id} className="flex justify-between py-2">
                <span>{new Date(a.starts_at).toLocaleString(lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-MA' : 'fr-MA', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                <span className="text-ink/50">{a.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
