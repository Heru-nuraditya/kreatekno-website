import { defineKartu } from "@/lib/solusi/schema";

/**
 * Bank kartu masalah untuk mode "Kartu masalah".
 * - `industri` kosong = cocok untuk semua bidang usaha.
 * - `solusi` = slug solusi dengan bobotnya (1 sampai 3) untuk menghitung hasil.
 * Bank ini diperbarui berkala oleh tim Kreatekno.
 */
export const KARTU = defineKartu([
  {
    id: "k1",
    text: {
      id: "Order dari grup chat sering terlewat?",
    },
    industri: ["logistik", "retail"],
    tim: ["operasional", "penjualan"],
    solusi: {
      "order-grup": 3,
    },
  },
  {
    id: "k2",
    text: {
      id: "Admin mengetik ulang pesanan ke Excel setiap hari?",
    },
    industri: ["logistik", "retail", "jasa"],
    tim: ["operasional", "keuangan"],
    solusi: {
      "order-grup": 3,
      "rekap-penjualan": 1,
    },
  },
  {
    id: "k3",
    text: {
      id: "Angka penjualan baru Anda ketahui keesokan harinya?",
    },
    industri: ["retail", "logistik"],
    tim: ["manajemen"],
    solusi: {
      "rekap-penjualan": 3,
      "order-grup": 1,
    },
  },
  {
    id: "k4",
    text: {
      id: "Pelanggan menunggu lama hanya untuk tahu jadwal yang kosong?",
    },
    industri: ["jasa", "klinik"],
    tim: ["cs"],
    solusi: {
      "booking-jasa": 3,
      "cs-klinik": 2,
    },
  },
  {
    id: "k5",
    text: {
      id: "Chat pelanggan menumpuk di luar jam kerja?",
    },
    industri: ["klinik", "jasa", "retail", "properti"],
    tim: ["cs"],
    solusi: {
      "cs-klinik": 3,
      "booking-jasa": 2,
    },
  },
  {
    id: "k6",
    text: {
      id: "Pertanyaan harga dan jam buka dijawab berulang kali?",
    },
    industri: ["klinik", "retail", "jasa"],
    tim: ["cs"],
    solusi: {
      "cs-klinik": 3,
      "booking-jasa": 1,
    },
  },
  {
    id: "k7",
    text: {
      id: "Jadwal tim lapangan sering bentrok?",
    },
    industri: ["jasa"],
    tim: ["operasional"],
    solusi: {
      "booking-jasa": 3,
    },
  },
  {
    id: "k8",
    text: {
      id: "Dokumen pelanggan dikirim berantakan lewat chat?",
    },
    industri: ["perjalanan", "jasa", "properti"],
    tim: ["operasional", "keuangan"],
    solusi: {
      "berkas-dokumen": 3,
    },
  },
  {
    id: "k9",
    text: {
      id: "Foto dokumen harus dirapikan satu per satu?",
    },
    industri: ["perjalanan"],
    tim: ["operasional"],
    solusi: {
      "berkas-dokumen": 3,
    },
  },
  {
    id: "k10",
    text: {
      id: "Sulit melihat berkas pelanggan mana yang belum lengkap?",
    },
    industri: ["perjalanan", "properti", "jasa"],
    tim: ["keuangan", "operasional"],
    solusi: {
      "berkas-dokumen": 3,
    },
  },
  {
    id: "k11",
    text: {
      id: "Bingung mau posting apa minggu ini?",
    },
    industri: ["retail", "klinik", "jasa"],
    tim: ["marketing"],
    solusi: {
      "riset-konten": 3,
      "carousel-konten": 1,
    },
  },
  {
    id: "k12",
    text: {
      id: "Membuat satu carousel makan waktu berjam-jam?",
    },
    industri: ["retail", "klinik"],
    tim: ["marketing"],
    solusi: {
      "carousel-konten": 3,
    },
  },
  {
    id: "k13",
    text: {
      id: "Posting media sosial tidak rutin?",
    },
    industri: ["retail", "klinik", "jasa", "properti"],
    tim: ["marketing"],
    solusi: {
      "carousel-konten": 2,
      "riset-konten": 2,
    },
  },
  {
    id: "k14",
    text: {
      id: "Tagihan pelanggan sering telat dibayar?",
    },
    industri: ["jasa", "properti", "logistik"],
    tim: ["keuangan"],
    solusi: {
      "pengingat-tagihan": 3,
    },
  },
  {
    id: "k15",
    text: {
      id: "Mengingatkan tagihan satu per satu terasa sungkan?",
    },
    industri: ["jasa", "properti"],
    tim: ["keuangan"],
    solusi: {
      "pengingat-tagihan": 3,
    },
  },
  {
    id: "k16",
    text: {
      id: "Calon pembeli lupa dihubungi lagi setelah survei?",
    },
    industri: ["properti"],
    tim: ["penjualan"],
    solusi: {
      "followup-prospek": 3,
    },
  },
  {
    id: "k17",
    text: {
      id: "Prospek dari iklan tidak tercatat rapi?",
    },
    industri: ["properti", "retail"],
    tim: ["penjualan", "marketing"],
    solusi: {
      "followup-prospek": 3,
    },
  },
  {
    id: "k18",
    text: {
      id: "Staf baru terus bertanya hal yang sama?",
    },
    industri: [],
    tim: ["sdm", "operasional"],
    solusi: {
      "asisten-sop": 3,
    },
  },
  {
    id: "k19",
    text: {
      id: "SOP ada, tapi jarang dibuka?",
    },
    industri: [],
    tim: ["sdm", "manajemen"],
    solusi: {
      "asisten-sop": 3,
    },
  },
  {
    id: "k20",
    text: {
      id: "Stok habis sebelum sempat dipesan ulang?",
    },
    industri: ["retail", "logistik"],
    tim: ["operasional"],
    solusi: {
      "stok-menipis": 3,
    },
  },
  {
    id: "k21",
    text: {
      id: "Cek stok gudang masih manual?",
    },
    industri: ["retail", "logistik"],
    tim: ["operasional", "manajemen"],
    solusi: {
      "stok-menipis": 2,
      "rekap-penjualan": 1,
    },
  },
  {
    id: "k22",
    text: {
      id: "Keluhan pelanggan tercecer di banyak tempat?",
    },
    industri: ["retail", "klinik", "jasa"],
    tim: ["cs", "manajemen"],
    solusi: {
      "ulasan-pelanggan": 3,
    },
  },
  {
    id: "k23",
    text: {
      id: "Tidak tahu apa yang paling sering dikeluhkan pelanggan?",
    },
    industri: ["retail", "klinik", "jasa"],
    tim: ["manajemen"],
    solusi: {
      "ulasan-pelanggan": 3,
    },
  },
  {
    id: "k24",
    text: {
      id: "Anda sendiri masih ikut membalas chat setiap hari?",
    },
    industri: [],
    tim: ["manajemen", "cs"],
    solusi: {
      "cs-klinik": 2,
      "booking-jasa": 1,
      "order-grup": 1,
    },
  },
]);
