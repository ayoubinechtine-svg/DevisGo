import { FormEvent, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import SlideOver from '../components/SlideOver';
import ConfirmDialog from '../components/ConfirmDialog';
import type { Appointment, Client, ServiceItem, AppointmentStatus } from '../types';

const EMPTY_FORM = { client_id: '', service_id: '', starts_at: '', duration_minutes: '30', status: 'pending' as AppointmentStatus, notes: '' };

export default function Appointments() {
  const { business } = useAuth();
  const { t, lang } = useI18n();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toDelete, setToDelete] = useState<Appointment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!business) return;
    setLoading(true);
    const [a, c, s] = await Promise.all([
      supabase.from('appointments').select('*').eq('business_id', business.id).order('starts_at', { ascending: true }),
      supabase.from('clients').select('*').eq('business_id', business.id).order('first_name'),
      supabase.from('services').select('*').eq('business_id', business.id).order('name'),
    ]);
    if (a.error || c.error || s.error) setError(a.error?.message ?? c.error?.message ?? s.error?.message ?? t.common.errorLoading);
    setAppointments((a.data as Appointment[]) ?? []);
    setClients((c.data as Client[]) ?? []);
    setServices((s.data as ServiceItem[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [business]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM, client_id: clients[0]?.id ?? '' });
    setError(null);
    setOpen(true);
  };

  const openEdit = (a: Appointment) => {
    setEditing(a);
    setForm({ client_id: a.client_id, service_id: a.service_id ?? '', starts_at: new Date(a.starts_at).toISOString().slice(0, 16), duration_minutes: String(a.duration_minutes), status: a.status, notes: a.notes ?? '' });
    setError(null);
    setOpen(true);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!business || !form.client_id || !form.starts_at) return;
    setError(null);
    const payload = { business_id: business.id, client_id: form.client_id, service_id: form.service_id || null, starts_at: new Date(form.starts_at).toISOString(), duration_minutes: Number(form.duration_minutes) || 30, status: form.status, notes: form.notes || null };
    const result = editing ? await supabase.from('appointments').update(payload).eq('id', editing.id) : await supabase.from('appointments').insert(payload);
    if (result.error) { setError(result.error.message); return; }
    setOpen(false);
    await load();
  };

  const remove = async () => {
    if (!toDelete) return;
    const { error: err } = await supabase.from('appointments').delete().eq('id', toDelete.id);
    if (err) setError(err.message);
    setToDelete(null);
    await load();
  };

  const clientName = (id: string) => { const c = clients.find(x => x.id === id); return c ? `${c.first_name} ${c.last_name}`.trim() : t.common.client; };
  const serviceName = (id: string | null) => services.find(x => x.id === id)?.name ?? '—';

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h1 className="font-display text-2xl font-medium text-ink">{t.appointments.title}</h1><p className="text-sm text-ink/55">{t.appointments.subtitle}</p></div>
      <button onClick={openNew} className="btn-primary"><Plus size={16} /> {t.appointments.new}</button>
    </div>
    {error && <div className="rounded-card bg-alert/10 p-3 text-sm text-alert">{error}</div>}
    <div className="card overflow-x-auto p-0">
      {loading ? <p className="p-5 text-sm text-ink/50">{t.common.loading}</p> : appointments.length === 0 ? <p className="p-5 text-sm text-ink/50">{t.appointments.noAppointments}</p> : <table className="w-full text-sm"><thead><tr className="border-b border-ink/10 text-ink/50"><th className="px-4 py-3 text-start">{t.common.date}</th><th className="px-4 py-3 text-start">{t.common.client}</th><th className="px-4 py-3 text-start">{t.nav.services}</th><th className="px-4 py-3 text-start">{t.common.status}</th><th className="px-4 py-3" /></tr></thead><tbody className="divide-y divide-ink/10">{appointments.map(a => <tr key={a.id}><td className="px-4 py-3">{new Date(a.starts_at).toLocaleString(lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-MA' : 'fr-MA', { dateStyle: 'medium', timeStyle: 'short' })}</td><td className="px-4 py-3">{clientName(a.client_id)}</td><td className="px-4 py-3">{serviceName(a.service_id)}</td><td className="px-4 py-3">{a.status}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button onClick={() => openEdit(a)} className="p-1.5 text-ink/50 hover:text-moss-600"><Pencil size={16}/></button><button onClick={() => setToDelete(a)} className="p-1.5 text-ink/50 hover:text-alert"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table>}
    </div>
    <SlideOver open={open} onClose={() => setOpen(false)} title={editing ? t.appointments.modify : t.appointments.new}>
      <form onSubmit={save} className="space-y-4">
        <div><label className="label">{t.common.client}</label><select required className="input-field" value={form.client_id} onChange={e => setForm({...form, client_id:e.target.value})}><option value="">{t.common.select}</option>{clients.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>)}</select></div>
        <div><label className="label">{t.nav.services}</label><select className="input-field" value={form.service_id} onChange={e => setForm({...form, service_id:e.target.value})}><option value="">{t.common.none}</option>{services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
        <div><label className="label">{t.common.dateTime}</label><input required type="datetime-local" className="input-field" value={form.starts_at} onChange={e => setForm({...form, starts_at:e.target.value})}/></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="label">{t.common.duration}</label><input type="number" min="5" className="input-field" value={form.duration_minutes} onChange={e => setForm({...form, duration_minutes:e.target.value})}/></div><div><label className="label">{t.common.status}</label><select className="input-field" value={form.status} onChange={e => setForm({...form, status:e.target.value as AppointmentStatus})}><option value="pending">{t.status.pending}</option><option value="confirmed">{t.status.confirmed}</option><option value="cancelled">{t.status.cancelled}</option><option value="done">{t.status.done}</option></select></div></div>
        <div><label className="label">{t.common.notes}</label><textarea className="input-field" rows={3} value={form.notes} onChange={e => setForm({...form, notes:e.target.value})}/></div>
        <button className="btn-primary w-full" type="submit">{t.common.save}</button>
      </form>
    </SlideOver>
    <ConfirmDialog open={!!toDelete} onConfirm={remove} onCancel={() => setToDelete(null)} />
  </div>;
}
