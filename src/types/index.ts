export type Lang = 'fr' | 'ar' | 'en';
export type PlanId = 'free' | 'starter' | 'pro' | 'business';

export type BusinessType =
  | 'coiffeur'
  | 'restaurant'
  | 'garage'
  | 'plombier'
  | 'electricien'
  | 'photographe'
  | 'consultant'
  | 'artisan'
  | 'boutique'
  | 'autre';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  created_at: string;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  ice: string | null;
  if_number: string | null;
  website: string | null;
  description: string | null;
  business_type: BusinessType;
  currency: string;
  language: Lang;
  plan: PlanId;
  created_at: string;
}

export interface Client {
  id: string;
  business_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  notes: string | null;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number;
  vat_rate: number;
  category: string | null;
  duration_minutes: number | null;
  is_demo: boolean;
  created_at: string;
}

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'refused' | 'expired';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'late';
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'done';

export interface Quote {
  id: string;
  business_id: string;
  client_id: string;
  number: string;
  status: QuoteStatus;
  issue_date: string;
  valid_until: string | null;
  subtotal: number;
  vat_total: number;
  discount: number;
  total: number;
  notes: string | null;
  is_demo: boolean;
  created_at: string;
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  service_id: string | null;
  name: string;
  quantity: number;
  unit_price: number;
  vat_rate: number;
}

export interface Invoice {
  id: string;
  business_id: string;
  client_id: string;
  quote_id: string | null;
  number: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string | null;
  subtotal: number;
  vat_total: number;
  discount: number;
  total: number;
  paid_total: number;
  is_demo: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  business_id: string;
  client_id: string;
  service_id: string | null;
  status: AppointmentStatus;
  starts_at: string;
  duration_minutes: number;
  notes: string | null;
  is_demo: boolean;
  created_at: string;
}
