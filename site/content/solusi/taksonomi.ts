/**
 * Taksonomi halaman Solusi: bidang usaha, tim, dan aplikasi.
 * Id di sini dipakai oleh file solusi (`items/*.ts`) dan bank kartu (`kartu.ts`);
 * `lib/solusi/schema.ts` menolak id yang tidak terdaftar.
 */

export const INDUSTRI = [
  { id: "retail", label: { id: "Retail & F&B", en: "Retail & F&B" }, icon: "Storefront" },
  { id: "klinik", label: { id: "Klinik", en: "Clinics" }, icon: "FirstAid" },
  { id: "properti", label: { id: "Properti", en: "Property" }, icon: "Buildings" },
  { id: "logistik", label: { id: "Logistik", en: "Logistics" }, icon: "Truck" },
  { id: "jasa", label: { id: "Jasa", en: "Services" }, icon: "Handshake" },
  { id: "perjalanan", label: { id: "Perjalanan", en: "Travel" }, icon: "GlobeSimple" },
] as const;

export const TIM = [
  { id: "marketing", label: { id: "Marketing", en: "Marketing" } },
  { id: "penjualan", label: { id: "Penjualan", en: "Sales" } },
  { id: "cs", label: { id: "Layanan pelanggan", en: "Customer service" } },
  { id: "operasional", label: { id: "Operasional", en: "Operations" } },
  { id: "keuangan", label: { id: "Keuangan & admin", en: "Finance & admin" } },
  { id: "manajemen", label: { id: "Manajemen", en: "Management" } },
  { id: "sdm", label: { id: "SDM", en: "HR" } },
] as const;

/**
 * Aplikasi yang boleh disebut di halaman Solusi (hanya aplikasi yang dilihat klien,
 * tidak pernah alat backend). `color` adalah warna polos untuk kotak 3D, bukan tiruan warna brand.
 * `icon` adalah nama komponen di `@phosphor-icons/react`.
 */
export const APPS = [
  { id: "whatsapp", label: "WhatsApp", icon: "WhatsappLogo", color: "#12B5A6" },
  { id: "sheets", label: "Google Sheets", icon: "Table", color: "#2E9E5B" },
  { id: "instagram", label: "Instagram", icon: "InstagramLogo", color: "#C2307A" },
  { id: "gmail", label: "Gmail", icon: "Envelope", color: "#E5484D" },
  { id: "calendar", label: "Google Calendar", icon: "CalendarDots", color: "#3B6FE0" },
  { id: "drive", label: "Google Drive", icon: "Folder", color: "#E0A11B" },
] as const;

export const STATUS = {
  jalan: { id: "Sudah berjalan", en: "Live" },
  ide: { id: "Siap dibuat", en: "Ready to build" },
} as const;

export type IndustriId = (typeof INDUSTRI)[number]["id"];
export type TimId = (typeof TIM)[number]["id"];
export type AppId = (typeof APPS)[number]["id"];
export type StatusId = keyof typeof STATUS;
