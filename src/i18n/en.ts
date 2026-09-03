import type { TranslationShape } from './fr';

const en: TranslationShape = {
  common: {
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', add: 'Add', search: 'Search', loading: 'Loading…',
    confirmDeleteTitle: 'Confirm deletion', confirmDeleteBody: 'This action is permanent. Do you want to continue?', empty: 'Nothing to show yet.',
    back: 'Back', close: 'Close', download: 'Download PDF', print: 'Print', share: 'Share', duplicate: 'Duplicate', total: 'Total',
    subtotal: 'Subtotal', vat: 'VAT', discount: 'Discount', client: 'Client', date: 'Date', status: 'Status', demoData: 'Demo data',
    name: 'Name', firstName: 'First name', lastName: 'Last name', phone: 'Phone', email: 'Email', address: 'Address', city: 'City',
    notes: 'Notes', description: 'Description', category: 'Category', price: 'Price (DH)', duration: 'Duration (min)', select: 'Select',
    none: 'None', dateTime: 'Date and time', errorLoading: 'Loading error', minCharacters: 'Password must contain at least 6 characters.',
    closeMenu: 'Close menu', openMenu: 'Open menu',
  },
  nav: {
    dashboard: 'Dashboard', clients: 'Clients', services: 'Services', quotes: 'Quotes', invoices: 'Invoices', appointments: 'Appointments',
    subscription: 'Subscription', settings: 'Business', publicPage: 'Public page', logout: 'Log out',
  },
  landing: {
    heroTitle: 'Run your business from one place.', heroSubtitle: 'Create quotes, invoices, appointments and manage your clients with ease.',
    ctaStart: 'Start for free', ctaHow: 'See how it works', featuresTitle: 'Everything your business needs', pricingTitle: 'Pricing that grows with you',
    features: {
      quotes: 'Professional quotes', quotesDesc: 'Create and send clear quotes in a few clicks.', invoices: 'Invoices', invoicesDesc: 'Invoice your clients and track payments received.',
      clients: 'Client management', clientsDesc: 'All client history in one place.', appointments: 'Appointments', appointmentsDesc: 'A clear schedule for your team and clients.',
      payments: 'Payments', paymentsDesc: 'Track what is paid, pending or overdue.', stats: 'Statistics', statsDesc: 'See your revenue at a glance.',
      page: 'Professional page', pageDesc: 'A public page to showcase your business.', whatsapp: 'WhatsApp', whatsappDesc: 'Send quotes and reminders directly on WhatsApp.',
    },
    plans: {
      free: 'Free', starter: 'Starter', pro: 'Pro', business: 'Business', perMonth: 'DH/month',
      free1: '10 clients', free2: '5 quotes/month', free3: '5 invoices/month', free4: 'Basic calendar',
      starter1: 'Unlimited clients', starter2: 'Unlimited quotes', starter3: 'Unlimited invoices', starter4: 'Calendar', starter5: 'Professional page', starter6: 'WhatsApp',
      pro1: 'Everything in Starter', pro2: 'Advanced statistics', pro3: 'Document customization', pro4: 'Multiple employees', pro5: 'Export', pro6: 'Notifications',
      business1: 'Everything in Pro', business2: 'Multiple locations', business3: 'Advanced employee management', business4: 'Advanced statistics', business5: 'Priority support',
    },
    footer: 'Manage your business simply.',
  },
  auth: {
    login: 'Log in', signup: 'Sign up', email: 'Email address', password: 'Password', fullName: 'Full name', forgotPassword: 'Forgot password?',
    resetPassword: 'Reset password', noAccount: "Don't have an account?", hasAccount: 'Already have an account?', signInCta: 'Sign in',
    signUpCta: 'Sign up', sendResetLink: 'Send reset link', newPassword: 'New password', resetSent: 'A reset link was sent to',
    resetSentSuffix: 'if it matches an existing account.',
  },
  onboarding: {
    title: 'Set up your business', subtitle: 'This information will appear on your quotes, invoices and public page.',
    businessName: 'Business name', businessType: 'Business type', website: 'Website', postalCode: 'Postal code', ice: 'ICE', ifNumber: 'Tax ID',
  },
  businessTypes: { coiffeur: 'Hairdresser', restaurant: 'Restaurant', garage: 'Garage', plombier: 'Plumber', electricien: 'Electrician', photographe: 'Photographer', consultant: 'Consultant', artisan: 'Craftsperson', boutique: 'Shop', autre: 'Other' },
  status: { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled', done: 'Completed', draft: 'Draft', sent: 'Sent', accepted: 'Accepted', refused: 'Refused', expired: 'Expired', paid: 'Paid', partial: 'Partially paid', late: 'Overdue' },
  dashboard: {
    welcome: 'Welcome,', revenue: 'Collected revenue', quotes: 'Quotes', invoices: 'Invoices', drafts: 'Drafts', sent: 'Sent', accepted: 'Accepted', refused: 'Refused',
    paid: 'Paid', waiting: 'Pending', late: 'Overdue', upcoming: 'Upcoming appointments', viewAgenda: 'View calendar', noUpcoming: 'No upcoming appointments.',
  },
  appointments: { title: 'Appointments', subtitle: 'Manage your schedule easily.', new: 'New appointment', modify: 'Edit appointment', noAppointments: 'No appointments.' },
  clients: { back: 'Back to clients', totalPaid: 'Total paid', totalDue: 'Total remaining', noQuotes: 'No quotes.', noInvoices: 'No invoices.', noAppointments: 'No appointments.' },
  services: { suggestions: 'Suggestions for', tax: 'VAT', min: 'min' },
  notFound: { title: 'Page not found', body: 'This page does not exist or has been moved.', backHome: 'Back to home' },
};
export default en;
