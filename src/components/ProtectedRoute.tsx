import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-ink/50">
        Chargement…
      </div>
    );
  }

  if (!session) return <Navigate to="/connexion" replace />;

  return <Outlet />;
}
