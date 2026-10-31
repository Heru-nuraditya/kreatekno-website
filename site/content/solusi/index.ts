import { checkKatalog } from "@/lib/solusi/schema";
import { KARTU as KARTU_RAW } from "./kartu";
import orderGrup from "./items/order-grup";
import bookingJasa from "./items/booking-jasa";
import berkasDokumen from "./items/berkas-dokumen";
import risetKonten from "./items/riset-konten";
import csKlinik from "./items/cs-klinik";
import pengingatTagihan from "./items/pengingat-tagihan";
import rekapPenjualan from "./items/rekap-penjualan";
import followupProspek from "./items/followup-prospek";
import carouselKonten from "./items/carousel-konten";
import asistenSop from "./items/asisten-sop";
import stokMenipis from "./items/stok-menipis";
import ulasanPelanggan from "./items/ulasan-pelanggan";

/**
 * Katalog Solusi. Tambah solusi baru: buat file di `items/`, lalu daftarkan di sini.
 * Urutan di etalase: "Sudah berjalan" dulu, lalu "Siap dibuat", masing-masing sesuai urutan di bawah.
 */
const ALL = [
  orderGrup,
  bookingJasa,
  berkasDokumen,
  risetKonten,
  csKlinik,
  pengingatTagihan,
  rekapPenjualan,
  followupProspek,
  carouselKonten,
  asistenSop,
  stokMenipis,
  ulasanPelanggan,
];

export const { SOLUSI, KARTU, BY_SLUG } = checkKatalog(ALL, KARTU_RAW);
export * from "./taksonomi";
