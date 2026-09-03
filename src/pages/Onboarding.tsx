import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import type { BusinessType, Lang } from '../types';

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: 'coiffeur', label: 'Coiffeur' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'garage', label: 'Garage' },
  { value: 'plombier', label: 'Plombier' },
  { value: 'electricien', label: 'Électricien' },
  { value: 'photographe', label: 'Photographe' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'artisan', label: 'Artisan' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'autre', label: 'Autre' },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function Onboarding() {
  const { t, lang } = useI18n();
  const { user, refreshBusiness } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: user?.email ?? '',
    address: '',
    city: '',
    postal_code: '',
    ice: '',
    if_number: '',
    website: '',
    description: '',
    business_type: 'autre' as BusinessType,
    currency: 'MAD',
    language: lang as Lang,
  });

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setLoading(true);

    const baseSlug = slugify(form.name) || `entreprise-${user.id.slice(0, 6)}`;
    const slug = `${baseSlug}-${user.id.slice(0, 5)}`;

    const { error: err } = await supabase.from('businesses').insert({
      owner_id: user.id,
      slug,
      ...form,
      language: lang,
    });

    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    await refreshBusiness();
    navigate('/tableau-de-bord');
  };

  return (
    <div className="min-h-screen bg-sand/40 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-ink">DevisGo</span>
          <LanguageSwitcher compact />
        </div>
        <div className="card">
          <h1 className="mb-1 font-display text-xl font-medium text-ink">{t.onboarding.title}</h1>
          <p className="mb-6 text-sm text-ink/55">{t.onboarding.subtitle}</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label">{t.onboarding.businessName}</label>
                <input required className="input-field" value={form.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.onboarding.businessType}</label>
                <select className="input-field" value={form.business_type} onChange={(e) => update('business_type', e.target.value)}>
                  {BUSINESS_TYPES.map((bt) => (
                    <option key={bt.value} value={bt.value}>{t.businessTypes[bt.value]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">{t.common.phone}</label>
                <input className="input-field" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.common.email}</label>
                <input type="email" className="input-field" value={form.email} onChange={(e) => update('email', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.onboarding.website}</label>
                <input className="input-field" value={form.website} onChange={(e) => update('website', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">{t.common.address}</label>
                <input className="input-field" value={form.address} onChange={(e) => update('address', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.common.city}</label>
                <input className="input-field" value={form.city} onChange={(e) => update('city', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.onboarding.postalCode}</label>
                <input className="input-field" value={form.postal_code} onChange={(e) => update('postal_code', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.onboarding.ice}</label>
                <input className="input-field" value={form.ice} onChange={(e) => update('ice', e.target.value)} />
              </div>
              <div>
                <label className="label">{t.onboarding.ifNumber}</label>
                <input className="input-field" value={form.if_number} onChange={(e) => update('if_number', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">{t.common.description}</label>
                <textarea rows={3} className="input-field" value={form.description} onChange={(e) => update('description', e.target.value)} />
              </div>
            </div>

            {error && <p className="text-sm text-alert">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.common.save}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
