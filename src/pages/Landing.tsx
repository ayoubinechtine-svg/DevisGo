import { Link } from 'react-router-dom';
import {
  FileText, Receipt, Users, CalendarCheck, Wallet, BarChart3, Globe2, MessageCircle,
} from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const FEATURES = [
  { icon: FileText, key: 'quotes' as const },
  { icon: Receipt, key: 'invoices' as const },
  { icon: Users, key: 'clients' as const },
  { icon: CalendarCheck, key: 'appointments' as const },
  { icon: Wallet, key: 'payments' as const },
  { icon: BarChart3, key: 'stats' as const },
  { icon: Globe2, key: 'page' as const },
  { icon: MessageCircle, key: 'whatsapp' as const },
];

const PLANS = [
  { key: 'free' as const, price: '0', features: ['free1','free2','free3','free4'] as const },
  { key: 'starter' as const, price: '49', features: ['starter1','starter2','starter3','starter4','starter5','starter6'] as const, highlight: true },
  { key: 'pro' as const, price: '99', features: ['pro1','pro2','pro3','pro4','pro5','pro6'] as const },
  { key: 'business' as const, price: '199', features: ['business1','business2','business3','business4','business5'] as const },
];

export default function Landing() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-display text-xl font-semibold text-ink">DevisGo</span>
        <div className="flex items-center gap-3">
          <LanguageSwitcher compact />
          <Link to="/connexion" className="text-sm font-medium text-ink/70 hover:text-ink">
            {t.auth.login}
          </Link>
          <Link to="/inscription" className="btn-primary">
            {t.landing.ctaStart}
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-10 text-center">
        <h1 className="text-balance font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
          {t.landing.heroTitle}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink/60">{t.landing.heroSubtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/inscription" className="btn-primary px-6 py-3 text-base">
            {t.landing.ctaStart}
          </Link>
          <a href="#fonctionnalites" className="btn-secondary px-6 py-3 text-base">
            {t.landing.ctaHow}
          </a>
        </div>
      </section>

      <section id="fonctionnalites" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center font-display text-2xl font-medium text-ink">
          {t.landing.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, key }) => (
            <div key={key} className="card">
              <Icon className="mb-3 text-moss-600" size={22} strokeWidth={1.75} />
              <h3 className="mb-1 font-medium text-ink">{t.landing.features[key]}</h3>
              <p className="text-sm text-ink/55">{t.landing.features[`${key}Desc` as keyof typeof t.landing.features]}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tarifs" className="bg-moss-900 py-16 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center font-display text-2xl font-medium">
            {t.landing.pricingTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className={`rounded-card border p-6 ${
                  plan.highlight ? 'border-moss-400 bg-moss-800' : 'border-white/10 bg-moss-900'
                }`}
              >
                <h3 className="font-display text-lg">{t.landing.plans[plan.key]}</h3>
                <p className="mt-2 text-3xl font-semibold">
                  {plan.price} <span className="text-base font-normal text-paper/60">{t.landing.plans.perMonth}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-paper/80">
                  {plan.features.map((f) => (
                    <li key={f}>• {t.landing.plans[f]}</li>
                  ))}
                </ul>
                <Link
                  to="/inscription"
                  className="mt-6 block rounded-card bg-paper px-4 py-2.5 text-center text-sm font-medium text-ink hover:bg-paper/90"
                >
                  {t.landing.ctaStart}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-sm text-ink/50">
        <LanguageSwitcher />
        <p>© {new Date().getFullYear()} DevisGo — {t.landing.footer}</p>
      </footer>
    </div>
  );
}
