import { FormEvent, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import SlideOver from '../components/SlideOver';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatMoney } from '../utils/format';
import type { ServiceItem, BusinessType } from '../types';const SUGGESTIONS: Record<BusinessType, { name: string; price: number; duration_minutes: number }[]> = {
  restaurant: [
    { name: 'Petit déjeuner', price: 35, duration_minutes: 30 },
    { name: 'Déjeuner', price: 80, duration_minutes: 45 },
    { name: 'Dîner', price: 120, duration_minutes: 60 },
    { name: 'Menu spécial', price: 180, duration_minutes: 60 },
  ],
  coiffeur: [
    { name: 'Coupe homme', price: 60, duration_minutes: 30 },
    { name: 'Coupe femme', price: 120, duration_minutes: 45 },
    { name: 'Barbe', price: 40, duration_minutes: 20 },
    { name: 'Coloration', price: 250, duration_minutes: 90 },
    { name: 'Brushing', price: 90, duration_minutes: 30 },
  ],
  garage: [
    { name: 'Vidange', price: 250, duration_minutes: 30 },
    { name: 'Diagnostic', price: 150, duration_minutes: 30 },
    { name: 'Changement de pneus', price: 400, duration_minutes: 45 },
    { name: 'Freins', price: 500, duration_minutes: 60 },
  ],
  plombier: [
    { name: 'Réparation fuite', price: 200, duration_minutes: 45 },
    { name: 'Installation robinet', price: 150, duration_minutes: 30 },
    { name: 'Débouchage', price: 180, duration_minutes: 30 },
    { name: 'Installation chauffe-eau', price: 600, duration_minutes: 120 },
  ],
  electricien: [
    { name: 'Diagnostic électrique', price: 150, duration_minutes: 30 },
    { name: 'Installation prise', price: 120, duration_minutes: 30 },
    { name: 'Tableau électrique', price: 800, duration_minutes: 180 },
  ],
  photographe: [
    { name: 'Séance portrait', price: 500, duration_minutes: 60 },
    { name: 'Reportage événement', price: 2500, duration_minutes: 240 },
  ],
  consultant: [
    { name: 'Consultation 1h', price: 400, duration_minutes: 60 },
    { name: 'Audit complet', price: 3000, duration_minutes: 480 },
  ],
  artisan: [
    { name: 'Devis sur mesure', price: 0, duration_minutes: 60 },
  ],
  boutique: [
    { name: 'Article standard', price: 100, duration_minutes: 0 },
  ],
  autre: [],
};

const EMPTY_FORM = { name: '', description: '', price: '0', vat_rate: '20', category: '', duration_minutes: '' };

export default function Services() {
  const { t } = useI18n();
  const { business } = useAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<ServiceItem | null>(null);

  const load = async () => {
    if (!business) return;
    setLoading(true);
    const { data } = await supabase.from('services').select('*').eq('business_id', business.id).order('created_at');
    setServices((data as ServiceItem[]) ?? []);
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

  const openEdit = (s: ServiceItem) => {
    setEditing(s);
    setForm({
      name: s.name,
      description: s.description ?? '',
      price: String(s.price),
      vat_rate: String(s.vat_rate),
      category: s.category ?? '',
      duration_minutes: s.duration_minutes ? String(s.duration_minutes) : '',
    });
    setPanelOpen(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description || null,
      price: Number(form.price) || 0,
      vat_rate: Number(form.vat_rate) || 0,
      category: form.category || null,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
    };
    if (editing) {
      await supabase.from('services').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('services').insert({ ...payload, business_id: business.id });
    }
    setSaving(false);
    setPanelOpen(false);
    load();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await supabase.from('services').delete().eq('id', toDelete.id);
    setToDelete(null);
    load();
  };

  const applySuggestions = async () => {
    if (!business) return;
    const suggestions = SUGGESTIONS[business.business_type] ?? [];
    if (suggestions.length === 0) return;
    await supabase.from('services').insert(
      suggestions.map((s) => ({
        business_id: business.id,
        name: s.name,
        price: s.price,
        vat_rate: 20,
        duration_minutes: s.duration_minutes || null,
      }))
    );
    load();
  };

  const hasSuggestions = business && SUGGESTIONS[business.business_type]?.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-medium text-ink">{t.nav.services}</h1>
        <div className="flex gap-2">
          {hasSuggestions && services.length === 0 && (
            <button onClick={applySuggestions} className="btn-secondary">
              <Sparkles size={16} /> {t.services.suggestions} {t.businessTypes[business?.business_type ?? "autre"]}
            </button>
          )}
          <button onClick={openNew} className="btn-primary">
            <Plus size={16} /> {t.common.add}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-ink/50">{t.common.loading}</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-ink/50">{t.common.empty}</p>
        ) : (
          services.map((s) => (
            <div key={s.id} className="card">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="font-medium text-ink">{s.name}</h3>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(s)} aria-label={t.common.edit} className="p-1 text-ink/40 hover:text-moss-600">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => setToDelete(s)} aria-label={t.common.delete} className="p-1 text-ink/40 hover:text-alert">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {s.description && <p className="mb-2 text-sm text-ink/55">{s.description}</p>}
              <p className="font-display text-lg text-moss-700">{formatMoney(s.price, business?.currency)}</p>
              <p className="text-xs text-ink/40">{t.services.tax} {s.vat_rate}% {s.duration_minutes ? `· ${s.duration_minutes} ${t.services.min}` : ''}</p>
            </div>
          ))
        )}
      </div>

      <SlideOver open={panelOpen} onClose={() => setPanelOpen(false)} title={editing ? t.common.edit : t.common.add}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">{t.common.name}</label>
            <input required className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">{t.common.description}</label>
            <textarea rows={2} className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t.common.price}</label>
              <input type="number" step="0.01" className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="label">{t.common.vat} (%)</label>
              <input type="number" step="0.01" className="input-field" value={form.vat_rate} onChange={(e) => setForm({ ...form, vat_rate: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t.common.category}</label>
              <input className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div>
              <label className="label">{t.common.duration}</label>
              <input type="number" className="input-field" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })} />
            </div>
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
