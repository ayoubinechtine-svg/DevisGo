const fr = {
  common: {
    save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', add: 'Ajouter',
    search: 'Rechercher', loading: 'Chargement…', confirmDeleteTitle: 'Confirmer la suppression',
    confirmDeleteBody: 'Cette action est définitive. Voulez-vous continuer ?', empty: 'Rien à afficher pour le moment.',
    back: 'Retour', close: 'Fermer', download: 'Télécharger PDF', print: 'Imprimer', share: 'Partager',
    duplicate: 'Dupliquer', total: 'Total', subtotal: 'Sous-total', vat: 'TVA', discount: 'Remise',
    client: 'Client', date: 'Date', status: 'Statut', demoData: 'Données de démonstration',
    name: 'Nom', firstName: 'Prénom', lastName: 'Nom', phone: 'Téléphone', email: 'Email',
    address: 'Adresse', city: 'Ville', notes: 'Notes', description: 'Description', category: 'Catégorie',
    price: 'Prix (DH)', duration: 'Durée (min)', select: 'Sélectionner', none: 'Aucun',
    dateTime: 'Date et heure', errorLoading: 'Erreur de chargement', minCharacters: 'Le mot de passe doit contenir au moins 6 caractères.',
    closeMenu: 'Fermer le menu', openMenu: 'Ouvrir le menu',
  },
  nav: {
    dashboard: 'Tableau de bord', clients: 'Clients', services: 'Services', quotes: 'Devis', invoices: 'Factures',
    appointments: 'Rendez-vous', subscription: 'Abonnement', settings: 'Entreprise', publicPage: 'Page publique', logout: 'Déconnexion',
  },
  landing: {
    heroTitle: 'Gérez votre entreprise depuis un seul endroit.',
    heroSubtitle: 'Créez vos devis, factures, rendez-vous et gérez vos clients facilement.',
    ctaStart: 'Commencer gratuitement', ctaHow: 'Voir comment ça marche',
    featuresTitle: 'Tout ce qu’il faut pour votre activité', pricingTitle: 'Des tarifs adaptés à votre croissance',
    features: {
      quotes: 'Devis professionnels', quotesDesc: 'Créez et envoyez des devis clairs en quelques clics.',
      invoices: 'Factures', invoicesDesc: 'Facturez vos clients et suivez les paiements reçus.',
      clients: 'Gestion des clients', clientsDesc: 'Tout l’historique client au même endroit.',
      appointments: 'Rendez-vous', appointmentsDesc: 'Un agenda clair pour votre équipe et vos clients.',
      payments: 'Paiements', paymentsDesc: 'Suivez ce qui est payé, en attente ou en retard.',
      stats: 'Statistiques', statsDesc: 'Votre chiffre d’affaires en un coup d’œil.',
      page: 'Page professionnelle', pageDesc: 'Une page publique pour présenter votre activité.',
      whatsapp: 'WhatsApp', whatsappDesc: 'Envoyez devis et rappels directement sur WhatsApp.',
    },
    plans: {
      free: 'Gratuit', starter: 'Starter', pro: 'Pro', business: 'Business', perMonth: 'DH/mois',
      free1: '10 clients', free2: '5 devis/mois', free3: '5 factures/mois', free4: 'Agenda basique',
      starter1: 'Clients illimités', starter2: 'Devis illimités', starter3: 'Factures illimitées', starter4: 'Agenda', starter5: 'Page professionnelle', starter6: 'WhatsApp',
      pro1: 'Tout Starter', pro2: 'Statistiques avancées', pro3: 'Personnalisation des documents', pro4: 'Plusieurs employés', pro5: 'Export', pro6: 'Notifications',
      business1: 'Tout Pro', business2: 'Plusieurs établissements', business3: 'Gestion avancée des employés', business4: 'Statistiques avancées', business5: 'Support prioritaire',
    },
    footer: 'Gérez votre entreprise simplement.',
  },
  auth: {
    login: 'Connexion', signup: 'Inscription', email: 'Adresse email', password: 'Mot de passe', fullName: 'Nom complet',
    forgotPassword: 'Mot de passe oublié ?', resetPassword: 'Réinitialiser le mot de passe', noAccount: 'Pas encore de compte ?',
    hasAccount: 'Déjà un compte ?', signInCta: 'Se connecter', signUpCta: "S'inscrire",
    sendResetLink: 'Envoyer le lien de réinitialisation', newPassword: 'Nouveau mot de passe',
    resetSent: 'Un lien de réinitialisation a été envoyé à', resetSentSuffix: "s'il correspond à un compte existant.",
  },
  onboarding: {
    title: 'Configuration de votre entreprise', subtitle: 'Ces informations apparaîtront sur vos devis, factures et votre page publique.',
    businessName: 'Nom de l’entreprise', businessType: 'Type d’entreprise', website: 'Site web', postalCode: 'Code postal', ice: 'ICE', ifNumber: 'IF',
  },
  businessTypes: { coiffeur: 'Coiffeur', restaurant: 'Restaurant', garage: 'Garage', plombier: 'Plombier', electricien: 'Électricien', photographe: 'Photographe', consultant: 'Consultant', artisan: 'Artisan', boutique: 'Boutique', autre: 'Autre' },
  status: { pending: 'En attente', confirmed: 'Confirmé', cancelled: 'Annulé', done: 'Terminé', draft: 'Brouillon', sent: 'Envoyé', accepted: 'Accepté', refused: 'Refusé', expired: 'Expiré', paid: 'Payée', partial: 'Partiellement payée', late: 'En retard' },
  dashboard: {
    welcome: 'Bienvenue,', revenue: 'Chiffre d’affaires encaissé', quotes: 'Devis', invoices: 'Factures', drafts: 'Brouillons', sent: 'Envoyés', accepted: 'Acceptés', refused: 'Refusés',
    paid: 'Payées', waiting: 'En attente', late: 'En retard', upcoming: 'Prochains rendez-vous', viewAgenda: 'Voir l’agenda', noUpcoming: 'Aucun rendez-vous à venir.',
  },
  appointments: {
    title: 'Rendez-vous', subtitle: 'Gérez votre agenda facilement.', new: 'Nouveau rendez-vous', modify: 'Modifier le rendez-vous', noAppointments: 'Aucun rendez-vous.',
  },
  clients: { back: 'Retour aux clients', totalPaid: 'Total payé', totalDue: 'Total restant', noQuotes: 'Aucun devis.', noInvoices: 'Aucune facture.', noAppointments: 'Aucun rendez-vous.' },
  services: { suggestions: 'Suggestions pour', tax: 'TVA', min: 'min' },
  notFound: { title: 'Page introuvable', body: 'Cette page n’existe pas ou a été déplacée.', backHome: 'Retour à l’accueil' },
} as const;
export default fr;
type DeepString<T> = { [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string };
export type TranslationShape = DeepString<typeof fr>;
