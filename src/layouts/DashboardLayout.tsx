import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Wrench, FileText, Receipt, CalendarCheck,
  CreditCard, Building2, Menu, X, LogOut, Globe2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../contexts/I18nContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const NAV_ITEMS = [
  { to: '/tableau-de-bord', icon: LayoutDashboard, key: 'dashboard' as const },
  { to: '/clients', icon: Users, key: 'clients' as const },
  { to: '/services', icon: Wrench, key: 'services' as const },
  { to: '/devis', icon: FileText, key: 'quotes' as const },
  { to: '/factures', icon: Receipt, key: 'invoices' as const },
  { to: '/rendez-vous', icon: CalendarCheck, key: 'appointments' as const },
  { to: '/abonnement', icon: CreditCard, key: 'subscription' as const },
  { to: '/entreprise', icon: Building2, key: 'settings' as const },
];

export default function DashboardLayout() {
  const { t, dir } = useI18n();
  const { business, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const NavContent = () => (
    <>
      <div className="mb-6 px-2">
        <span className="font-display text-lg font-semibold text-ink">DevisGo</span>
        {business && <p className="mt-0.5 truncate text-xs text-ink/45">{business.name}</p>}
      </div>
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-card px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-moss-100 font-medium text-moss-800' : 'text-ink/65 hover:bg-sand/60'
              }`
            }
          >
            <Icon size={18} strokeWidth={1.75} />
            {t.nav[key]}
          </NavLink>
        ))}
        {business && (
          <a
            href={`/entreprise/${business.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-card px-3 py-2.5 text-sm text-ink/65 hover:bg-sand/60"
          >
            <Globe2 size={18} strokeWidth={1.75} />
            {t.nav.publicPage}
          </a>
        )}
      </nav>
      <div className="mt-auto space-y-3 border-t border-ink/10 pt-3">
        <LanguageSwitcher />
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-sm text-ink/65 hover:bg-sand/60"
        >
          <LogOut size={18} strokeWidth={1.75} />
          {t.nav.logout}
        </button>
      </div>
    </>
  );

  return (
    <div className={`flex min-h-screen bg-paper ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-e border-ink/10 bg-white p-4 lg:flex">
        <NavContent />
      </aside>

      {/* Nav mobile */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3 lg:hidden">
        <span className="font-display text-lg font-semibold text-ink">DevisGo</span>
        <button onClick={() => setMobileOpen(true)} aria-label={t.common.openMenu} className="p-1.5 text-ink">
          <Menu size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 start-0 flex w-72 flex-col bg-white p-4">
            <button onClick={() => setMobileOpen(false)} aria-label={t.common.closeMenu} className="mb-4 self-end p-1.5 text-ink">
              <X size={20} />
            </button>
            <NavContent />
          </aside>
        </div>
      )}

      <main className="min-w-0 flex-1 px-4 pb-10 pt-20 lg:px-8 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
