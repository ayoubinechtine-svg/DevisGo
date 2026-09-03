import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/40 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-semibold text-ink">DevisGo</Link>
          <LanguageSwitcher compact />
        </div>
        <div className="card">
          <h1 className="mb-1 font-display text-xl font-medium text-ink">{title}</h1>
          {subtitle && <p className="mb-5 text-sm text-ink/55">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
