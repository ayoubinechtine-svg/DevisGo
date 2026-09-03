import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

export default function ResetPassword() {
  const { t } = useI18n();
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
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
    const { error: err } = await updatePassword(password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate('/tableau-de-bord');
  };

  return (
    <AuthLayout title={t.auth.resetPassword}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="password">{t.auth.newPassword}</label>
          <input id="password" type="password" required minLength={6} className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-alert">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? t.common.loading : t.common.save}
        </button>
      </form>
    </AuthLayout>
  );
}
