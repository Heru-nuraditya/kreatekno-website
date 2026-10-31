import { defineSolusi } from "@/lib/solusi/schema";

// Teks Indonesia di `id`. Versi Inggris (`en`) ditambahkan di fase 2.
export default defineSolusi({
  slug: "order-grup",
  status: "jalan",
  updated: "2026-10-28",
  industri: ["logistik", "retail"],
  tim: ["operasional", "penjualan"],
  apps: ["whatsapp", "sheets"],
  id: {
    title: "Order dari grup WhatsApp tercatat sendiri ke Google Sheets",
    question: "Bagaimana order dari grup WhatsApp bisa tercatat otomatis?",
    result: "Order tercatat tanpa diketik ulang",
    answer:
      "Asisten order dipasang di grup WhatsApp yang sudah dipakai tim. Setiap order yang ditulis sales dicatat ke Google Sheets, tim diberi kabar di grup, dan pemilik menerima rekap setiap malam. Tim tidak perlu mengubah cara mereka mengirim order.",
    client: "Distributor air minum, Pekanbaru",
    pains: [
      "Satu admin membaca seluruh grup lalu mengetik ulang setiap order ke tabel.",
      "Revisi order tertimbun obrolan, sehingga ada order yang terlewat.",
      "Pemilik baru tahu angka penjualan keesokan paginya.",
    ],
    steps: [
      {
        title: "Tim mengirim order seperti biasa",
        body: "Sales tetap menulis di grup WhatsApp yang sama, tanpa format khusus.",
      },
      {
        title: "Asisten mencatat ordernya",
        body: "Order tersusun rapi di Google Sheets. Kalau ada yang kurang jelas, tim ditanya dulu.",
      },
      {
        title: "Status selalu terbaru",
        body: "Kurir cukup membalas di grup, dan status di tabel ikut berubah.",
      },
      {
        title: "Pemilik menerima rekap",
        body: "Setiap malam, ringkasan order hari itu dikirim ke pemilik.",
      },
    ],
    compare: [
      {
        aspect: "Mencatat order",
        before: "Admin mengetik ulang dari chat",
        after: "Tercatat dari chat yang sama",
      },
      {
        aspect: "Tahu status pengiriman",
        before: "Bertanya ke admin atau kurir",
        after: "Terlihat di tabel",
      },
      {
        aspect: "Angka harian",
        before: "Dihitung keesokan pagi",
        after: "Dikirim malam itu juga",
      },
    ],
    fit: [
      "Usaha yang menerima puluhan order sehari lewat grup chat tim.",
      "Tim sales dan kurir yang sudah terbiasa memakai WhatsApp.",
    ],
    notFit: ["Usaha yang sudah memakai aplikasi kasir atau order online untuk semua pesanan."],
    prep: [
      "Grup WhatsApp yang dipakai untuk order",
      "Daftar produk dan harga",
      "Google Sheets tujuan, atau kami yang buatkan",
    ],
    metrics: [
      {
        value: "3",
        unit: "jam",
        label: "waktu admin kembali setiap hari",
      },
      {
        value: "120",
        unit: "order",
        label: "tercatat sehari tanpa diketik ulang",
      },
      {
        value: "1",
        unit: "pesan",
        label: "rekap untuk pemilik setiap malam",
      },
    ],
    faq: [
      {
        q: "Apakah sales harus menulis order dengan format tertentu?",
        a: "Tidak. Asisten membaca order yang ditulis dengan bahasa sehari-hari, termasuk singkatan.",
      },
      {
        q: "Bagaimana kalau pesan ordernya kurang jelas?",
        a: "Asisten tidak menebak. Tim ditanya dulu, dan order baru dicatat setelah datanya jelas.",
      },
      {
        q: "Di mana data order disimpan?",
        a: "Di Google Sheets milik Anda sendiri, jadi data tetap bisa Anda buka dan bagikan kapan saja.",
      },
    ],
  },
});
