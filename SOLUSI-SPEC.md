# Halaman Solusi: spesifikasi

_1 Nov 2026. Disusun dari keputusan Heru (chat "Portofolio dan use case", 29–31 Okt, dan sesi 1 Nov). Wildan sudah setuju halaman Portofolio diganti menjadi Solusi. Dokumen ini menggantikan `PORTFOLIO.md` (rencana Tonton/Baca, 25 Okt)._

Referensi tampilan dan perilaku: `prototype/solusi-etalase.html`. Buka langsung di browser (Three.js 0.170 dimuat dari CDN). Prototype ini satu file dengan routing hash. Pakai sebagai acuan perilaku, **bukan** kode untuk disalin mentah ke `site/`.

---

## 1. Ringkasan

Halaman Solusi adalah **toko**. Seorang kasir (Heru, karakter vinyl-toy 3D dari kode) berdiri di balik meja panjang.

- **Etalase:** kaca di depan meja berisi semua solusi. Setiap solusi berupa kotak 3D di atas label rak. Etalase ikut bertambah panjang saat katalog bertambah.
- **Dua tombol:** "Cari solusi" dan "Kartu masalah". Keduanya memindahkan kamera ke atas meja. Di sana kasir menyerahkan hasil pencarian, atau membagikan kartu masalah.
- **Isi katalog:**
  - Proyek klien yang **Sudah berjalan**, ditampilkan dalam versi yang disamarkan.
  - **Siap dibuat:** ide solusi yang belum dibangun.

Tujuannya:
- Pemilik usaha yang punya masalah yang sama bisa melihat solusinya, lalu klik **Konsultasi gratis**.
- Halaman detail tiap solusi (fase 2) menjadi tempat utama optimasi AEO/GEO.

## 2. Keputusan yang sudah dikunci

| Topik | Keputusan |
|---|---|
| Nama menu | **Solusi** (EN: Solutions), menggantikan Portofolio |
| URL | `/solusi` (EN `/en/solutions`). `/portofolio` dan `/en/portfolio` di-redirect permanen (308) ke URL baru. Detail (fase 2): `/solusi/[slug]`. Hasil kartu: `/solusi/hasil` (EN `/en/solutions/results`) |
| Bahasa | Tanpa redirect otomatis dari IP (panduan Google, dan repo memakai `localeDetection: false`). Fase 2: pengunjung dari luar Indonesia melihat bar kecil "View in English" yang bisa ditutup. Switcher bahasa tetap di header dan footer |
| Urutan fase | **3D dulu.** Fase 1 = toko 3D lengkap. Fase 2 = halaman detail + EN + SEO/AEO |
| 3D | Three.js **vanilla** (sama dengan K0–K2 di `prototype/k0-k2`), `three` 0.187.x, `WebGLRenderer`. Tanpa React Three Fiber. Semua bentuk dari kode, tanpa file model |
| Data | Satu file per solusi di `site/content/solusi/items/`, bank kartu di `kartu.ts`, divalidasi zod (`site/lib/solusi/schema.ts`). Sudah berisi 12 solusi dan 24 kartu dari prototype |
| Kasir | **Heru** gaya vinyl-toy K0–K2, sesuai character sheet `KARKATER/HERU.png` **ditambah celemek ungu Kreatekno**. Ini karakter vinyl-toy pertama; modulnya harus bisa dipakai ulang untuk Home (tahap 3 K0–K2) |
| Label status | "Sudah berjalan" / "Siap dibuat" (EN "Live" / "Ready to build") |
| Bentuk kotak | Bentuk sama untuk semua. Warna dari aplikasi pertama (`APPS[].color`). Gerak hanya idle + hover, **tanpa animasi scroll** |
| HP murah | 3D versi ringan: pixel ratio 1, tanpa bayangan, gerak kotak dikurangi. Kalau fps tetap jelek, turun ke gambar diam. Semua fitur tetap jalan sebagai HTML |
| CTA | "Konsultasi gratis" lewat `WhatsAppButton`, pesan otomatis menyebut konteksnya (masalah atau solusi yang dipilih). Tanpa harga |

## 3. Aturan isi (berlaku untuk semua teks dan data)

1. Boleh menyebut aplikasi yang dilihat klien: WhatsApp, Google Sheets, Instagram, Gmail, Google Calendar, Google Drive. **Tidak boleh** menyebut alat backend (n8n, WAHA, Supabase...) atau model AI.
2. Jangan membuka mekanik workflow yang bisa ditiru pesaing, misalnya nomor cadangan (failover), aturan pencocokan harga atau rute, dan aturan batal otomatis.
3. Proyek "Sudah berjalan" adalah versi fiksi dari proyek klien (Ragamuda, Riau Home Cleaning, PT JAFA) dengan label **"Disamarkan atas permintaan klien"**.
   - Ragamuda tampil sepenuhnya anonim, tanpa angka hasil.
   - `metrics` hanya diisi untuk angka yang disetujui klien.
4. Gaya bahasa: sapaan "Anda", kalimat pendek, tanpa em dash, tanpa janji waktu, dan tanpa gaya bahasa AI.
5. Link `watch` ke artifact motion graphic dihapus dari data karena link itu privat. Jangan dipasang lagi sebelum ada versi publik.

## 4. Lingkup

### Fase 1 (PR pertama)

1. **Routing dan menu:** route `/solusi` dan `/solusi/hasil`, redirect dari `/portofolio`, menu "Solusi". Sitemap ikut diubah (`/solusi/hasil` tidak masuk sitemap).
2. **Hero toko + kasir 3D.**
   - Desktop: judul di kiri, TV di dinding di belakang kasir.
   - HP: judul tampil di layar TV, dua tombol di bawahnya, kasir di bawah tombol.
3. **Etalase:** grid 12 solusi dengan kotak 3D, idle + hover. Label rak berisi judul, hasil, ikon aplikasi dan status, plus legenda status.
   - **Kotak dan kartu belum bisa diklik di fase 1.** Tampilkan petunjuk kecil "Detail segera hadir" saat hover atau fokus.
   - Tidak ada link mati.
4. **Mode Cari solusi:**
   - Judul hilang dan kamera turun ke meja.
   - Kasir melambai, lalu kertas struk muncul berisi pencarian teks dan 4 filter (bidang usaha, tim, aplikasi, status).
   - Saat mengetik, kasir jongkok bersiap di bawah meja.
   - Saat Enter, kasir meletakkan maksimal 6 kotak bernomor di meja, dan daftar lengkapnya tercetak di struk.
   - Di HP, struk diringkas setelah pencarian supaya kotak terlihat. Daftar dan filter bisa dibuka lagi.
5. **Mode Kartu masalah:**
   - Kasir meletakkan kertas pilihan bidang usaha. Pengunjung boleh melewatinya.
   - Setiap ronde, kasir meletakkan kartu baru. Geser kanan = "ya", kiri = "tidak", atas = "lihat solusinya". Ada juga tombol untuk ketiganya dan dukungan keyboard.
   - Setelah 9 kartu, pengunjung pindah ke **halaman hasil terpisah** `/solusi/hasil`.
   - Penilaian memakai bobot di bank kartu, tanpa AI API. Logikanya ada di prototype (`cardScore`, `pickRound`, `results`).
6. **Halaman hasil:**
   - Isinya daftar solusi terurut dengan tingkat kecocokan, jawaban yang dipilih, dan CTA WhatsApp berisi masalah yang dipilih.
   - Halaman ini tetap statis. Jawaban dibaca di client dari query string, misalnya `?b=retail&y=k1,k5&n=k3`, di dalam `<Suspense>`.
   - `noindex`.
   - Item hasil belum bisa diklik ke detail.
7. **EN sementara:**
   - `/en/solutions` dan `/en/solutions/results` memakai UI berbahasa Inggris, sedangkan isi solusinya masih Indonesia.
   - Keduanya diberi `robots: noindex` sampai fase 2.
8. **Versi tanpa 3D** (reduced motion, tanpa WebGL, atau tanpa JavaScript):
   - Hero dan etalase tampil sebagai HTML biasa dengan kotak CSS.
   - Mode Cari dan Kartu tetap berfungsi tanpa adegan kamera.

### Fase 2 (PR berikutnya)

- Halaman detail `/solusi/[slug]`: H1 + kotak jawaban langsung (`answer`), masalah, langkah, tabel sebelum/sesudah, cocok/tidak cocok, persiapan, metrik, FAQ, aplikasi, solusi terkait, CTA. Bentuk dan urutannya mengikuti `renderDetail` di prototype.
- Struktur data JSON-LD: `BreadcrumbList`, `FAQPage`, `Service`. Kebutuhannya diriset ulang saat fase 2 dimulai.
- `generateStaticParams` untuk semua slug di kedua bahasa, sitemap per slug, dan hreflang.
- Isi EN untuk semua solusi dan kartu. Saat itu `en` di schema menjadi wajib.
- Kotak, kartu, dan hasil bisa diklik ke detail. Bar "View in English" ditambahkan, dan `noindex` EN dicabut.
- Section use case di Home diberi copy baru dan menjadi pintu masuk ke halaman ini.

### Nanti (bukan fase 1–2)

- 3D kecil di halaman detail.
- Penulisan solusi otomatis oleh Hermes lewat PR.
- Bahasa tambahan.

## 5. Struktur kode (usulan, dikonfirmasi di tahap T0)

```
site/
  app/[locale]/(pages)/solusi/page.tsx          server: metadata, H1 + intro, etalase HTML, memasang <Toko>
  app/[locale]/(pages)/solusi/hasil/page.tsx    shell statis + <HasilKartu> (client, dalam Suspense)
  content/solusi/                               SUDAH ADA: taksonomi.ts, kartu.ts, items/*.ts, index.ts
  lib/solusi/schema.ts                          SUDAH ADA: zod + checkKatalog()
  lib/solusi/search.ts                          pencarian + filter (fungsi murni, mudah dites)
  lib/solusi/kartu.ts                           ronde, penilaian, hasil (fungsi murni)
  components/solusi/                            Etalase, LabelRak, StrukCari, DekKartu, HasilKartu, Toko (client)
  lib/three/                                    renderer, kualitas, kotak produk, adegan toko, kamera
  lib/three/characters/heru.ts                  Heru vinyl-toy + rig + pose (dipakai ulang Home nanti)
```

- Teks UI masuk ke `messages/{id,en}.json` di bawah `pages.solutions` dan `meta.solutions`. Key `portfolio` diganti.
- Isi solusi tetap di `content/solusi/`.
- Halaman `/solusi` server-rendered. H1, etalase, label rak, dan teks struk semuanya HTML, karena isi canvas tidak terbaca mesin pencari.
- Canvas memakai `aria-hidden`, dan ruangnya dipesan sejak awal supaya layout tidak bergeser (CLS).
- Three.js dimuat lewat `import()` dinamis setelah halaman selesai dimuat, **hanya** di `/solusi`.
- Pakai **satu canvas** untuk adegan toko dan semua kotak etalase. Kotak etalase digambar per kartu dengan scissor/viewport, seperti di prototype.

## 6. Adegan 3D

Patokannya bagian "3D" di prototype, dari baris `/* ===... 3D ...=== */` sampai sebelum routing.

- **Set:** dinding lavender dengan wainscot dan rail, meja panjang (permukaan terang, trim ungu, strip cyan, bagian depan navy), mesin kasir dengan layar cyan, rak kecil, lampu gantung ungu, dan TV di dinding.
- **Kamera:** dua keadaan, "hero" dan "fokus meja". Perpindahannya dengan easing, dan framing berbeda untuk portrait dan landscape.
- **Kotak produk:**
  - Satu geometri dengan sisi berwarna aplikasi, label depan berisi glyph aplikasi, dan tepi tipis.
  - Kotak "Siap dibuat" tampil sebagai versi garis tepi atau transparan, mengikuti prototype.
  - Gerak: ayunan idle pelan dan putaran saat hover.
- **Kasir Heru:**
  - Proporsi vinyl-toy sekitar 4,2 kepala.
  - Wajah: mata hitam mengkilap tanpa putih, alis tebal, hidung kecil, pipi merona.
  - Rambut: hitam bergelombang sebatas dagu dengan belahan samping. Kumis tipis dan janggut dagu.
  - Pakaian: blazer ungu, kaos putih, lanyard ungu dengan kartu ID, dan **celemek ungu Kreatekno** di atasnya. Tas selempang dihilangkan kalau mengganggu celemek, dikonfirmasi saat review.
  - Ikuti keputusan teknis K0–K2 di `prototype/k0-k2/HANDOFF.md`:
    - rambut dari SDF → `MarchingCubes`, dengan versi sederhana untuk mode hemat;
    - pegas dan redaman ditulis sendiri;
    - `@pixiv/three-vrm-springbone` boleh dipakai untuk gerak sekunder.
  - Pose: idle (bernapas), melambai, jongkok di bawah meja, meletakkan kotak (maksimal 6, bernomor), dan membagikan kartu.
  - Bandingkan berdampingan dengan turnaround dari depan, samping dan belakang.
- **Anggaran:**
  - Draw call di bawah ±120 dan segitiga di bawah ±150 ribu untuk seluruh adegan. Kasir ±5–15 ribu segitiga.
  - Chunk Three.js ±200 KB gzip atau kurang, dan hanya dimuat di `/solusi`.
  - LCP tetap teks H1, CLS < 0,1, dan Lighthouse mobile ≥ 85.
- **Kualitas otomatis:**
  - Pixel ratio dibatasi 1,5 di desktop. Turunkan kualitas bertahap dari fps terukur: matikan bayangan, pixel ratio 1, kurangi gerak kotak. Kalau masih jelek, tampilkan gambar diam (poster hero) dan matikan render.
  - Render berhenti saat tab tersembunyi atau canvas di luar layar.
  - Tangani `webglcontextlost`.
- **HUD dev:** `?hud` menampilkan fps, draw call, segitiga, pixel ratio, dan tingkat kualitas. HUD ini dipakai Heru untuk tes di HP Android murah. Tidak pernah ditautkan dari halaman.

## 7. Tahapan kerja (berhenti untuk review di akhir setiap tahap)

| # | Tahap | Hasil yang direview |
|---|---|---|
| T0 | Riset terbaru (Three.js 0.187 + Next.js 16.4 Cache Components, karakter vinyl dari kode, swipe yang aksesibel), lalu tanya sampai yakin 98%, lalu buat plan di Plan mode | Temuan riset + plan disetujui |
| T1 | Routing, redirect, menu, messages, halaman `/solusi` statis (H1, etalase HTML, versi tanpa 3D) | Screenshot 1440/375, `npm run build` lolos |
| T2 | Adegan toko 3D (set, kamera hero/fokus) + kotak etalase 3D (satu canvas, idle + hover), dimuat setelah HTML | Screenshot + angka draw call/segitiga/ukuran chunk |
| T3 | Heru vinyl-toy + rig + pose | Screenshot berdampingan dengan turnaround; Heru mengirim referensi kalau Drive tidak tersambung |
| T4 | Mode Cari solusi (struk, filter, kasir meletakkan kotak bernomor, versi HP ringkas) | Rekaman atau urutan screenshot desktop + HP |
| T5 | Mode Kartu masalah + halaman hasil `/solusi/hasil` | Alur 9 kartu sampai hasil, keyboard dan swipe |
| T6 | Kualitas HP: tingkat kualitas, fallback gambar diam, reduced motion, context lost; Playwright + axe | Hasil tes + Heru mengetes di HP Android murah lewat `?hud` |
| T7 | Update `PLAN.md` (milestone + log), tandai `PORTFOLIO.md` digantikan, commit, push branch ke fork, buka PR ke `iwilwildan/kreatekno-website` | Link PR |

## 8. Definisi selesai fase 1

- `npm --prefix site run typecheck`, `lint`, `format:check` dan `build` lolos. Build harus prerender `/solusi`, `/en/solutions`, `/solusi/hasil` dan `/en/solutions/results` sebagai HTML statis.
- Tes Playwright di 375×812, 768×1024 dan 1440×900:
  - hero, etalase, mode Cari (sebelum dan sesudah Enter), Kartu (ronde 1, ronde 3, hasil);
  - versi reduced motion;
  - tanpa error di console.
- Scan axe tanpa pelanggaran serius. Semua kontrol bisa dipakai dengan keyboard, dan target sentuh ≥ 44 px.
- `/portofolio` → 308 → `/solusi`, dan `/en/portfolio` → `/en/solutions`.
- Tidak ada link mati. Kotak di fase 1 memang tidak bisa diklik.
- Diuji Heru di HP Android murah, dan angka fps dicatat di `PLAN.md`.

Playwright dan `@axe-core/playwright` belum terpasang. Pasang di T6 dengan versi terbaru yang stabil, lalu tambah script `test:e2e`.

## 9. Catatan terbuka

- Belum ada preview Vercel (butuh akun Vercel Kreatekno). Review dilakukan lokal: `npm --prefix site run dev`, lalu buka di HP lewat IP laptop.
- Teks 12 solusi adalah isi sementara dari prototype. Tim mengganti dan menyetujuinya sebelum launch.
- Warna celemek ungu di atas blazer ungu bisa menyatu. Tunjukkan dua opsi ungu saat review T3.

## 10. Cara mulai di Claude Code (laptop Heru)

```powershell
git clone https://github.com/Heru-nuraditya/kreatekno-website
cd kreatekno-website
git checkout feat/solusi-claude-setup
git remote add upstream https://github.com/iwilwildan/kreatekno-website
npm --prefix site ci
claude
```

Prompt pertama, dijalankan di Plan mode (Shift+Tab sampai "plan mode"):

> Baca CLAUDE.md dan SOLUSI-SPEC.md, lalu kerjakan tahap T0: riset dulu, laporkan temuan yang mengubah rencana, dan tanya saya sampai kamu yakin 98% sebelum membuat plan untuk fase 1.
