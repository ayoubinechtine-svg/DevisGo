import { Globe } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import type { Lang } from '../types';

const OPTIONS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1.5">
      {!compact && <Globe size={16} className="text-ink/40" aria-hidden />}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        aria-label="Language"
        className="rounded-card border border-ink/15 bg-transparent px-2 py-1.5 text-sm text-ink"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
