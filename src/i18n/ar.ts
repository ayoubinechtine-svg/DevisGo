import type { TranslationShape } from './fr';

const ar: TranslationShape = {
  common: {
    save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', add: 'إضافة', search: 'بحث', loading: 'جارٍ التحميل…',
    confirmDeleteTitle: 'تأكيد الحذف', confirmDeleteBody: 'هذا الإجراء نهائي. هل تريد المتابعة؟', empty: 'لا يوجد شيء لعرضه حالياً.',
    back: 'رجوع', close: 'إغلاق', download: 'تحميل PDF', print: 'طباعة', share: 'مشاركة', duplicate: 'نسخ',
    total: 'المجموع', subtotal: 'المجموع الفرعي', vat: 'الضريبة', discount: 'التخفيض', client: 'العميل', date: 'التاريخ', status: 'الحالة',
    demoData: 'بيانات تجريبية', name: 'الاسم', firstName: 'الاسم الأول', lastName: 'اسم العائلة', phone: 'الهاتف', email: 'البريد الإلكتروني',
    address: 'العنوان', city: 'المدينة', notes: 'ملاحظات', description: 'الوصف', category: 'الفئة', price: 'السعر (درهم)',
    duration: 'المدة (دقيقة)', select: 'اختيار', none: 'لا شيء', dateTime: 'التاريخ والوقت', errorLoading: 'خطأ في التحميل',
    minCharacters: 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.', closeMenu: 'إغلاق القائمة', openMenu: 'فتح القائمة',
  },
  nav: {
    dashboard: 'لوحة التحكم', clients: 'العملاء', services: 'الخدمات', quotes: 'عروض الأسعار', invoices: 'الفواتير',
    appointments: 'المواعيد', subscription: 'الاشتراك', settings: 'المؤسسة', publicPage: 'الصفحة العامة', logout: 'تسجيل الخروج',
  },
  landing: {
    heroTitle: 'أدر عملك من مكان واحد.', heroSubtitle: 'أنشئ عروض الأسعار والفواتير والمواعيد وأدر عملاءك بسهولة.',
    ctaStart: 'ابدأ مجاناً', ctaHow: 'كيف يعمل', featuresTitle: 'كل ما تحتاجه لنشاطك', pricingTitle: 'أسعار تناسب نمو عملك',
    features: {
      quotes: 'عروض أسعار احترافية', quotesDesc: 'أنشئ وأرسل عروض أسعار واضحة ببضع نقرات.',
      invoices: 'الفواتير', invoicesDesc: 'أصدر الفواتير لعملائك وتابع المدفوعات المستلمة.',
      clients: 'إدارة العملاء', clientsDesc: 'كل سجل العميل في مكان واحد.',
      appointments: 'المواعيد', appointmentsDesc: 'جدول واضح لفريقك وعملائك.',
      payments: 'المدفوعات', paymentsDesc: 'تابع ما تم دفعه وما هو قيد الانتظار أو متأخر.',
      stats: 'الإحصائيات', statsDesc: 'اطلع على رقم معاملاتك في لمحة.',
      page: 'صفحة مهنية', pageDesc: 'صفحة عامة لعرض نشاطك.',
      whatsapp: 'واتساب', whatsappDesc: 'أرسل عروض الأسعار والتذكيرات مباشرة عبر واتساب.',
    },
    plans: {
      free: 'مجاني', starter: 'Starter', pro: 'Pro', business: 'Business', perMonth: 'درهم/شهرياً',
      free1: '10 عملاء', free2: '5 عروض أسعار/شهر', free3: '5 فواتير/شهر', free4: 'جدول أساسي',
      starter1: 'عملاء غير محدودين', starter2: 'عروض أسعار غير محدودة', starter3: 'فواتير غير محدودة', starter4: 'جدول المواعيد', starter5: 'صفحة مهنية', starter6: 'واتساب',
      pro1: 'كل ميزات Starter', pro2: 'إحصائيات متقدمة', pro3: 'تخصيص المستندات', pro4: 'عدة موظفين', pro5: 'تصدير', pro6: 'إشعارات',
      business1: 'كل ميزات Pro', business2: 'عدة فروع', business3: 'إدارة متقدمة للموظفين', business4: 'إحصائيات متقدمة', business5: 'دعم ذو أولوية',
    },
    footer: 'أدر عملك بسهولة.',
  },
  auth: {
    login: 'تسجيل الدخول', signup: 'إنشاء حساب', email: 'البريد الإلكتروني', password: 'كلمة المرور', fullName: 'الاسم الكامل',
    forgotPassword: 'نسيت كلمة المرور؟', resetPassword: 'إعادة تعيين كلمة المرور', noAccount: 'ليس لديك حساب؟', hasAccount: 'لديك حساب بالفعل؟',
    signInCta: 'تسجيل الدخول', signUpCta: 'إنشاء حساب', sendResetLink: 'إرسال رابط إعادة التعيين', newPassword: 'كلمة مرور جديدة',
    resetSent: 'تم إرسال رابط إعادة التعيين إلى', resetSentSuffix: 'إذا كان البريد الإلكتروني مرتبطاً بحساب موجود.',
  },
  onboarding: {
    title: 'إعداد مؤسستك', subtitle: 'ستظهر هذه المعلومات في عروض الأسعار والفواتير وصفحتك العامة.',
    businessName: 'اسم المؤسسة', businessType: 'نوع النشاط', website: 'الموقع الإلكتروني', postalCode: 'الرمز البريدي', ice: 'ICE', ifNumber: 'IF',
  },
  businessTypes: { coiffeur: 'حلاق', restaurant: 'مطعم', garage: 'مرآب', plombier: 'سباك', electricien: 'كهربائي', photographe: 'مصور', consultant: 'مستشار', artisan: 'حرفي', boutique: 'متجر', autre: 'أخرى' },
  status: { pending: 'قيد الانتظار', confirmed: 'مؤكد', cancelled: 'ملغى', done: 'مكتمل', draft: 'مسودة', sent: 'مرسل', accepted: 'مقبول', refused: 'مرفوض', expired: 'منتهي', paid: 'مدفوعة', partial: 'مدفوعة جزئياً', late: 'متأخرة' },
  dashboard: {
    welcome: 'مرحباً،', revenue: 'الإيرادات المحصلة', quotes: 'عروض الأسعار', invoices: 'الفواتير', drafts: 'مسودات', sent: 'مرسلة', accepted: 'مقبولة', refused: 'مرفوضة',
    paid: 'مدفوعة', waiting: 'قيد الانتظار', late: 'متأخرة', upcoming: 'المواعيد القادمة', viewAgenda: 'عرض الجدول', noUpcoming: 'لا توجد مواعيد قادمة.',
  },
  appointments: { title: 'المواعيد', subtitle: 'أدر جدول مواعيدك بسهولة.', new: 'موعد جديد', modify: 'تعديل الموعد', noAppointments: 'لا توجد مواعيد.' },
  clients: { back: 'العودة إلى العملاء', totalPaid: 'إجمالي المدفوع', totalDue: 'إجمالي المتبقي', noQuotes: 'لا توجد عروض أسعار.', noInvoices: 'لا توجد فواتير.', noAppointments: 'لا توجد مواعيد.' },
  services: { suggestions: 'اقتراحات لـ', tax: 'الضريبة', min: 'دقيقة' },
  notFound: { title: 'الصفحة غير موجودة', body: 'هذه الصفحة غير موجودة أو تم نقلها.', backHome: 'العودة إلى الصفحة الرئيسية' },
};
export default ar;
