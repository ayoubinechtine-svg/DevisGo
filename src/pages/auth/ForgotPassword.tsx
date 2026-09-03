import { FormEvent, useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

export default function ForgotPassword() {
  const { t } = useI18n();
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await sendPasswordReset(email);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    setSent(true);
  };

  return (
    <AuthLayout title={t.auth.resetPassword}>
      {sent ? (
        <p className="text-sm text-ink/70">
          {t.auth.resetSent} <strong>{email}</strong> {t.auth.resetSentSuffix}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">{t.auth.email}</label>
            <input id="email" type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error && <p className="text-sm text-alert">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? t.common.loading : t.auth.sendResetLink}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
