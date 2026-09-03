import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

export default function Signup() {
  const { t } = useI18n();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError(t.common.minCharacters);
      return;
    }
    setLoading(true);
    const { error: err } = await signUp(email, password, fullName);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate('/configuration-entreprise');
  };

  return (
    <AuthLayout title={t.auth.signup}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="fullName">{t.auth.fullName}</label>
          <input id="fullName" required className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="email">{t.auth.email}</label>
          <input id="email" type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="password">{t.auth.password}</label>
          <input id="password" type="password" required minLength={6} className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-alert">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? t.common.loading : t.auth.signUpCta}
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/50">
        {t.auth.hasAccount}{' '}
        <Link to="/connexion" className="font-medium text-moss-600 hover:underline">{t.auth.login}</Link>
      </p>
    </AuthLayout>
  );
}
