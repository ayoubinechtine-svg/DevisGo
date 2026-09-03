import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

export default function Login() {
  const { t } = useI18n();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate('/tableau-de-bord');
  };

  return (
    <AuthLayout title={t.auth.login}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">{t.auth.email}</label>
          <input id="email" type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="password">{t.auth.password}</label>
          <input id="password" type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-alert">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? t.common.loading : t.auth.signInCta}
        </button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm">
        <Link to="/mot-de-passe-oublie" className="text-moss-600 hover:underline">{t.auth.forgotPassword}</Link>
        <span className="text-ink/50">
          {t.auth.noAccount}{' '}
          <Link to="/inscription" className="font-medium text-moss-600 hover:underline">{t.auth.signup}</Link>
        </span>
      </div>
    </AuthLayout>
  );
}
