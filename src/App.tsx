import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

import Landing from './pages/Landing';
import PublicPage from './pages/PublicPage';
import Login from './pages/auth/Login';

import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Services from './pages/Services';
import Appointments from './pages/Appointments';
import NotFound from './pages/NotFound';

export default function App() {
  return (
      <Routes> 
  <Route path="/" element={<Landing />} /> 
  <Route path="/business/:slug" element={<PublicPage />} />
  <Route path="/connexion" element={<Login />} />
      
      <Route path="/inscription" element={<Signup />} />
      <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/configuration-entreprise" element={<Onboarding />} />

        <Route element={<DashboardLayout />}>
          <Route path="/tableau-de-bord" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/rendez-vous" element={<Appointments />} />
          <Route path="/devis" element={<NotFound />} />
          <Route path="/factures" element={<NotFound />} />
          <Route path="/abonnement" element={<NotFound />} />
          <Route path="/entreprise" element={<Onboarding />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}