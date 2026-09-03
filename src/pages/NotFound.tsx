import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper text-center">
      <h1 className="font-display text-3xl text-ink">{t.notFound.title}</h1>
      <p className="text-sm text-ink/55">{t.notFound.body}</p>
      <Link to="/" className="btn-primary mt-2">{t.notFound.backHome}</Link>
    </div>
  );
}
