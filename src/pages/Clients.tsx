import { FormEvent, useEffect, useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import SlideOver from '../components/SlideOver';
import ConfirmDialog from '../components/ConfirmDialog';
import type { Client } from '../types';

const EMPTY_FORM = { first_name: '', last_name: '', phone: '', email: '', address: '', city: '', notes: '' };

export default function Clients() {
  const { t } = useI18n();
  const { business } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Client | null>(null);

  const load = async () => {
    if (!business) return;
    setLoading(true);
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('business_id', business.id)
      .order('created_at', { ascending: false });
    setClients((data as Client[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [business]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setPanelOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setForm({
      first_name: client.first_name,
      last_name: client.last_name,
      phone: client.phone ?? '',
      email: client.email ?? '',
      address: client.address ?? '',
      city: client.city ?? '',
      notes: client.notes ?? '',
    });
    setPanelOpen(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setSaving(true);
    if (editing) {
      await supabase.from('clients').update(form).eq('id', editing.id);
    } else {
      await supabase.from('clients').insert({ ...form, business_id: business.id });
    }
    setSaving(false);
    setPanelOpen(false);
    load();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await supabase.from('clients').delete().eq('id', toDelete.id);
    setToDelete(null);
    load();
  };

  const filtered = clients.filter((c) => {
    const haystack = `${c.first_name} ${c.last_name} ${c.phone ?? ''} ${c.email ?? ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-medium text-ink">{t.nav.clients}</h1>
        <button onClick={openNew} className="btn-primary">
          <Plus size={16} /> {t.common.add}
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-ink/35" />
        <input
          className="input-field ps-9"
          placeholder={t.common.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="card overflow-x-auto p-0">
        {loading ? (
          <p className="p-5 text-sm text-ink/50">{t.common.loading}</p>
        ) : filtered.length === 0 ? (
          <p className="p-5 text-sm text-ink/50">{t.common.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-start text-ink/50">
                <th className="px-4 py-3 text-start font-medium">{t.common.name}</th>
                <th className="px-4 py-3 text-start font-medium">{t.common.phone}</th>
                <th className="px-4 py-3 text-start font-medium">{t.common.email}</th>
                <th className="px-4 py-3 text-start font-medium">{t.common.city}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-sand/30">
                  <td className="px-4 py-3">
                    <Link to={`/clients/${client.id}`} className="font-medium text-ink hover:text-moss-600">
                      {client.first_name} {client.last_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{client.phone || '—'}</td>
                  <td className="px-4 py-3 text-ink/70">{client.email || '—'}</td>
                  <td className="px-4 py-3 text-ink/70">{client.city || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(client)} aria-label={t.common.edit} className="p-1.5 text-ink/50 hover:text-moss-600">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setToDelete(client)} aria-label={t.common.delete} className="p-1.5 text-ink/50 hover:text-alert">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SlideOver open={panelOpen} onClose={() => setPanelOpen(false)} title={editing ? t.common.edit : t.common.add}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t.common.firstName}</label>
              <input required className="input-field" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
            </div>
            <div>
              <label className="label">{t.common.lastName}</label>
              <input className="input-field" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">{t.common.phone}</label>
            <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="label">{t.common.email}</label>
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label">{t.common.address}</label>
            <input className="input-field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div>
            <label className="label">{t.common.city}</label>
            <input className="input-field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>
          <div>
            <label className="label">{t.common.notes}</label>
            <textarea rows={3} className="input-field" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? t.common.loading : t.common.save}
          </button>
        </form>
      </SlideOver>

      <ConfirmDialog open={!!toDelete} onConfirm={confirmDelete} onCancel={() => setToDelete(null)} />
    </div>
  );
}
