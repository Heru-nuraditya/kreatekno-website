# Three.js K0 → K2: serah-terima antar sesi

_Terakhir diperbarui: 30 Okt 2026, awal tahap 3, setelah pindah dari container ke clone lokal di Windows. Untuk sesi Claude berikutnya: baca file ini dulu sampai habis sebelum menyentuh kode._

## Status

| Tahap | Isi | Status |
|---|---|---|
| 1 | Kamera dan ukuran dunia dari keyframe K0, K1, K2 (pc dan hp) | ✅ disetujui 30 Okt |
| 2 | Lokasi eksterior dan interior, cahaya, AO saat load, placeholder karakter | ✅ disetujui 30 Okt |
| 3 | Karakter vinyl-toy dari kode (Heru, Bu Dewi, Sinta, Bayu, Nadia, Fajar) dan burung merpati K0 | 🟡 riset dan keputusan selesai 30 Okt; plan menunggu persetujuan |
| 4 | Animasi dan fisika tanpa engine, kamera final dengan inersia | ⬜ |
| 5 | Pengerasan untuk HP murah, tes di HP Android murah milik user | ⬜ |
| 6 | Publish, dokumen (`THREEJS.md`, `PLAN.md`), commit dan push | ⬜ |

- Preview tahap 2: https://claude.ai/artifact/TSFkWQ3P7p4mRcRd3VZwUi (privat, tanpa gambar keyframe di dalamnya). Untuk update dari sesi lain: `Artifact` dengan `url` itu, setelah `action: "read"`.
- Hasil build: `prototype/k0-k2-3d.html` (sekitar 668 KB, 178 KB gzip, tanpa CDN).

## Alat dan akses (clone lokal, Windows)

- **Git:** clone di `C:\Users\herun\Documents\GitHub\kreatekno-website`, branch `feat/threejs-k0-k2`.
  - Push **hanya** ke remote `fork` (Heru-nuraditya/kreatekno-website), jangan ke `origin` (iwilwildan).
  - Draft PR: iwilwildan/kreatekno-website#2.
  - Commit dan push hanya setelah user setuju.
- **Data kerja** di `prototype/k0-k2/`, semuanya di-gitignore dan **tidak boleh di-commit**:
  - `ref/`: salinan lokal semua file Drive di daftar referensi (spasi jadi `_`), plus dua upload user.
  - `ref/video/`: `pc_k0-k1.mp4`, `pc_k1-k2.mp4` (17,7 MB, 1920×1080), `hp_k0-k1.mp4`, `hp_k1-k2.mp4`.
  - `kf/`: keyframe dengan nama yang dipakai tool (`K0_pc.png` … `K2_hp.png`, `EXT_master.png`, `INT_master.png`).
  - `meas/`, `review/`: hasil ukur dan review tahap 1–2. `render/` dibuat oleh `render.js`. `.venv/`: venv Python.
- **Node** 24.11.1 dan npm 11.6.2. Jalankan `npm ci` di `prototype/k0-k2`; `package-lock.json` sekarang ada di repo.
- **Python** 3.14.5 lewat launcher `py`. Di Git Bash, `python` dan `python3` menunjuk ke stub Microsoft Store, jadi jangan dipakai.
  - Buat venv: `py -3.14 -m venv .venv`, lalu `.venv/Scripts/python.exe -m pip install -r requirements-tools.txt`.
  - Isinya numpy 2.5.4, opencv-python-headless 5.0.0.93, pillow 13.0.0, scipy 1.18.1.
  - Tool dijalankan dari `prototype/k0-k2`, misalnya `.venv/Scripts/python.exe tools/compare.py <folder-keluaran>`.
- **Build:** `sh build.sh` dari Git Bash.
  - Langkah inline sekarang memakai Node, bukan Python.
  - `prototype/.gitattributes` memaksa LF untuk take ini (`core.autocrlf` di Windows bernilai `true`).
  - Hasilnya identik byte per byte dengan build container (dicek 30 Okt: hash blob sama dengan commit `e56e08c`).
- **Render uji:** `node tools/render.js ../k0-k2-3d.html render pc,hp K0,K1,K2`.
  - `tools/browser.js` menjalankan Chrome yang terpasang lewat `playwright-core` 1.64.1, tanpa unduh browser. `frames.js` dan `tune.js` memakai launcher yang sama.
  - Default SwiftShader, sama seperti container. Selisih dengan render container rata-rata 1,4–2,4/255, sebagian besar karena JPEG. Pakai mode ini untuk perbandingan dengan keyframe.
  - `PW_GL=gpu` memakai GPU asli (AMD Radeon, ANGLE D3D11). AO selesai sekitar 1,5 s, lawan 4–8 s di SwiftShader. Peringatan HLSL `X4122` dari compiler D3D tidak berbahaya.
  - `PW_CHANNEL=msedge` untuk Edge.

## Aturan kerja dari user (wajib)

1. Jawab dalam bahasa Indonesia.
2. Tiap tahap: riset internet dulu untuk info terbaru dan best practice. Library atau skill yang dipakai harus aman dan terbukti. Laporkan temuan yang bisa mengubah plan, lalu tanya sampai yakin 98% sebelum membuat plan dan sebelum implementasi.
3. Berhenti di akhir tiap tahap untuk review: screenshot render, keyframe dan overlay dikirim **hanya di chat**. Gambar keyframe tidak boleh ikut ke halaman preview.
4. Google Drive: **jangan pakai file Drive lain tanpa izin**. Yang sudah disetujui ada di daftar di bawah. Media tambahan diupload user di chat.
5. Semua dari kode, tanpa model 3D eksternal. Karakter harus semirip mungkin dengan turnaround. Fisika gerak tanpa engine.
6. Prioritas referensi kalau bertentangan: keyframe > video > Master Lokasi.

## Keputusan user

| Topik | Keputusan |
|---|---|
| Lingkup | K0 → K1 → K2 dulu (K2.1 dan K2.2 nanti) |
| Ruko kanan COMPANY | Mint (ikut K1 dan denah), bukan biru seperti di Master |
| Billboard K0 | Kosong; copy hero nanti berupa HTML |
| Keset di balik pintu | Kuning (ikut video hp) |
| Font huruf COMPANY | Nunito ExtraBold 800 (OFL), dipilih karena paling mirip |
| AO | Dihitung saat load dengan three-mesh-bvh (sudah jalan) |
| Rambut, hijab, tutup kepala | SDF yang diubah jadi mesh dengan `MarchingCubes` resmi three.js, dibuat saat load; versi sederhana untuk mode hemat |
| Gerak | Pegas dan redaman yang ditulis sendiri. Gerak utama di-bake saat load lalu disampel dari posisi scroll, jadi bisa diputar mundur. Gerak sekunder (rambut, hijab, kuncir, lanyard) memakai pegas live; `@pixiv/three-vrm-springbone` 3.5.5 boleh dipakai |
| Library yang disetujui | three 0.186.1, three-mesh-bvh 0.9.16, @pixiv/three-vrm-springbone 3.5.5; `SimplifyModifier` bawaan three (meshoptimizer 1.1, WASM) untuk rambut, hijab dan tutup kepala; alat dev saja (tidak masuk halaman): opentype.js 2.0.0, OpenCV dan SciPy, esbuild 0.28.2, playwright-core 1.64.1 |
| Tanpa | detect-gpu (kualitas diturunkan dari fps yang terukur), skill three.js komunitas |
| Interior versi HP | Disetujui: ruangan portrait lebih sempit (±5,3 m lawan 8,3 m), kamera K2 hp 2,2 m lebih mundur; layout diblend menurut aspect |
| Skala karakter K1 vs K2 | **Opsi (c)**: Heru tetap 1,8 m seperti di K1, kamera K2 dinaikkan sedikit sampai kepala Heru (dari belakang) muat seperti di K2. Untuk Bu Dewi dan seberapa jauh kamera naik, lihat baris tahap 3 di bawah |
| Cahaya | Sudah cukup (selisih warna rata-rata ±12/255) |
| Review | Berhenti di tiap tahap; user punya HP Android murah untuk tes |
| Tinggi karakter (tahap 3) | Ikuti lineup ALL KARAKTER: semua ±1,75–1,80 m, Heru 1,80 m. Yang duduk di K2 (Bayu, Nadia, Fajar) memang sudah seskala ini |
| Bu Dewi (tahap 3) | Tinggi sesuai skala (±1,75 m), **tanpa trik** panggung. Di K2 ia tampak lebih rendah dari keyframe (yang setara ±2,16 m), dan itu diterima |
| Kamera K2 (tahap 3) | Opsi (c) butuh kamera naik ±0,5 m, bukan "sedikit". Render dulu 3 varian (naik ±0,3 / 0,45 / 0,55 m) untuk pc dan hp, lengkap dengan overlay dan error keyframe, lalu user memilih |
| Anggaran karakter | Total ±170 ribu segitiga. Sekitar 9 ribu per karakter, 1–2 draw call per karakter (semua bagian jadi satu `SkinnedMesh`). Mode hemat ±4 ribu |
| Bayangan karakter | Karakter yang diam ikut shadow map matahari statis (dihitung sekali). Heru memakai bayangan kontak. Semua karakter dapat AO diri yang dihitung saat load |
| Wajah | Mata dan alis dari geometri 3D, dengan titik kilau putih tetap. Mulut, rona pipi, kumis dan janggut digambar di tekstur canvas bersama |
| Kain | Motif lewat atlas canvas, plus satu tekstur normal halus bersama (efek felt dan linen) yang mati di mode hemat |
| Notifikasi hijau Sinta | Dibuat statis di tahap 3, dianimasikan di tahap 4 |
| Checkpoint tahap 3 | (1) varian kamera K2, (2) Heru jadi, (3) akhir tahap |

## Referensi

**Drive (disetujui):** folder "Aset Video web Kreatekno" milik akun kreatekno.

| File | Drive ID |
|---|---|
| `KARKATER/HERU.png` | `1-86VP0Z-Poqr2KcRunjajQXV145AU5n5` |
| `KARKATER/BUK DEWI.png` | `1xzEV3zO2cMsJKpJE0BaNyAgmxlyDJQMi` |
| `KARKATER/SINTA.png` | `1GYCxrSkBC0BXLU8vJkimyITub8SQ4oti` |
| `KARKATER/BAYU.png` | `1lSvIcu4tdYvDYvVZf-9y9gkgQrhp-ua1` |
| `KARKATER/NADIA.png` | `1AuzmhPQbX0Yhrqsd0cSSfpJxc4kMFM1R` |
| `KARKATER/FAJAR.png` | `10lOCAXZs2lsT9aTgHIazNNTUfUyB7Gl7` |
| `KARKATER/ALL KARAKTER.png` | `1cBPnUrmgQm-oh_gLVkm9QDxd460BlnSH` |
| `Master Lokasi/(PAGI) EXTERIOR Toko COMPANY.png` | `1yqMrt3bciTcgKrOvpSkcITXTJL4ONOlS` |
| `Master Lokasi/(SIANG) Toko Company.png` | `1yG_mdip4XeTmry2AKCPfD0jwrQGsJYXV` |
| `Master Lokasi/master8_denah.png` | `1fXmLsrJNc0vb4gtxlRe5ZflnY1Pdochr` |
| `Key frame pc/K0 fix.png`, `K1 fix.png`, `K2 fix.png` | `1trm6RLP3dHiRf9hjCi1sAw9o4EFkC2Ty`, `1x4gWL6MN_Rp1Er_m2WmbJYiW5NNqun7k`, `1tNcX7nMiOfCsLf1dCOa9bYKjrAEB1cCG` |
| `Key frame hp/K0 hp.png`, `K1 hp.png` | `1kJvWEM578IkSpYkRUsXvtVcb5ADssmWQ`, `1hYWxbSYoHpsu-aYo58scIO1ti6ACzRR2` |
| `Video web Pc/k0 - k1.mp4` | `1-zbpawQer2Bn0RckNCCUKWpSmFYRJ2I6` |
| `Video web hp/k0 - k1.mp4`, `k1 - k2.mp4` | `1EXQT6kOWH6joCU-IWISXi6MkKISA3LOL`, `1et-mrqTJwgANM-1ZkUzm-CcHBw2RG4D8` |

- Semua file di atas sudah ada di `ref/` lokal, jadi biasanya tidak perlu diunduh lagi. Kalau perlu: `download_file_content`, **paling banyak 3 file per giliran** (lebih dari itu koneksi MCP putus) dan file di atas sekitar 6 MB gagal.
- **Upload dari user** (tidak ada di Drive yang bisa diunduh): `refs-upload/K2_hp_upload.webp` (keyframe K2 hp), `refs-upload/master7_kolase_upload.webp` (deret ruko). Video `k1 - k2.mp4` versi pc (17,7 MB, 1920×1080) sudah ada di `ref/video/pc_k1-k2.mp4` untuk tahap 4.

**Ciri karakter dari turnaround** (vinyl toy, sekitar 4,2 kepala, mata hitam mengkilap tanpa putih, alis tebal, hidung kecil, pipi merona):

| Karakter | Ciri |
|---|---|
| Heru | Rambut hitam bergelombang sebatas dagu dengan belahan samping, kumis tipis dan janggut dagu, blazer ungu dengan kancing manset, kaos putih, lanyard ungu dengan kartu ID, tas selempang hitam, celana dan sepatu abu gelap |
| Bu Dewi | Hijab terakota, tunik krem dengan pinggiran motif oranye, bros bunga oranye, kulot cokelat, sepatu cokelat |
| Sinta | Hijab kuning, rompi kotak cokelat-kuning, pin balon chat kuning, kemeja putih, celana cokelat, sepatu kuning |
| Bayu | Rambut pendek, kacamata bulat, pensil di telinga, baju cokelat berkerah, sarung kotak kuning, celana cokelat, sepatu hitam |
| Nadia | Kuncir kuda dengan ikat rambut merah, atasan pink, tas pinggang merah, celana zigzag merah-pink, sepatu putih |
| Fajar | Tutup kepala lilit hijau zaitun dengan pita emas, kemeja hijau, jogger krem, sepatu hijau |

**Pose di K2:** Sinta mengetik di HP dengan notifikasi hijau, Bayu dengan monitor dan tumpukan kertas, Nadia bertopang dagu di depan laptop, Fajar menggaruk kepala dengan nampan oranye dan tablet, Bu Dewi berdiri dengan kedua tangan di meja kasir.

## Hasil tahap 1 (solver `tools/solve.py`, hasil di `data/solve.json`)

| Keyframe | Rata-rata | Maksimal |
|---|---|---|
| K0 pc / hp | 0,17% / 0,13% | 0,31% / 0,21% |
| K1 pc / hp | 0,14% / 0,28% | 0,32% / 0,55% |
| K2 pc | 0,18% | 0,89% |
| K2 hp | 0,49% | 1,51% |

Angka dalam persen lebar layar.

- **Dunia** dalam meter. Origin di tengah pintu COMPANY, di permukaan trotoar, pada bidang fasad; x menyusuri jalan, y ke atas, z ke arah jalan. Tinggi pintu 2,2 m jadi patokan skala.
- **Kamera:**
  - K1 pc ada di z 15,2 dengan FOV vertikal 20°.
  - K0 pc ada di z 12,9, tinggi 8,7 m.
  - Interior diselesaikan di frame-nya sendiri, lalu digeser sehingga kamera K2 berada 0,6 m di dalam dinding depan (z −0,89).
- **Inkonsistensi keyframe yang sudah diketahui:**
  - Heru 1,8 m di K1, tapi hanya muat sekitar 1,3 m di K2 dengan kamera setinggi 1,69 m. Diselesaikan dengan opsi (c).
  - Bu Dewi di K2 terhitung sekitar 2,2 m.
  - Dari kamera K0, atap terlihat, padahal di keyframe area itu langit; warna atap disamakan dengan langit.
  - Trotoar dari kamera hp hanya sekitar 1,7 m.

## Struktur file

```
prototype/k0-k2-3d.html      hasil build (jangan diedit tangan)
prototype/k0-k2/
  src/scene.js               seluruh scene (impor three, addons, three-mesh-bvh, ./data.json)
  src/page.html              HTML dan HUD; /*BUNDLE*/ diganti hasil esbuild
  src/data.json              dunia, kamera pc/hp, offset interior, posisi figur, awan, burung, glyph COMPANY
  data/solve.json            hasil solver kamera (ext, int, int_hp, error per titik)
  tools/                     solve.py, solve_hp.py, prep.py (data.json), glyphs.mjs, render.js, compare.py, grid.py, orange.py, frames.js, tune.js
  tools/browser.js           launcher Playwright bersama (Chrome terpasang, SwiftShader atau GPU)
  build.sh, package.json     npm ci && sh build.sh (package-lock.json ikut repo)
  requirements-tools.txt     versi pip untuk tool Python
prototype/.gitattributes     LF untuk take ini
```

- Tool Python membutuhkan folder `kf/`, `meas/`, `render/` dan `review/`. Folder itu tidak ada di repo, tapi sudah ada di clone lokal (lihat "Alat dan akses").
- URL dev: `?k=K0|K1|K2`, `?fmt=pc|hp`, `?shot`, `?noao`, `?hemat`, `?tone=agx`, `?exp=0.9`. Di window tersedia `window.__k02.setP(p)`, `keyP`, `aoState()` dan `lights`.

## Langkah berikutnya: tahap 3

Riset dan tanya-jawab selesai 30 Okt; keputusannya ada di tabel "Keputusan user". Plan tahap 3 sudah diajukan di chat dan **menunggu persetujuan** user sebelum implementasi.

**Temuan riset yang dipakai:**

- Scene tanpa karakter sudah 101–107 draw call dan 111–117 ribu segitiga, jadi tiap karakter harus jadi satu mesh.
- Proporsi turnaround: pusat kepala di sekitar 0,88 × tinggi badan, dan pusat kepala saat duduk sekitar 0,52 × tinggi di atas dudukan kursi.
- three 0.187.0 rilis 30 Okt (terlalu baru), jadi tetap memakai 0.186.1.
- `SimplifyModifier` di 0.186.1 sudah memakai meshoptimizer.
- `libs/surfaceNet.js` ikut terpasang tapi sudah tidak dipakai addon apa pun; `SDFGeometryGenerator` sudah dihapus.
- `LightShadow.autoUpdate` per lampu tersedia.
- Springbone 3.5.5 bisa dipakai tanpa VRM lewat `VRMSpringBoneManager` dan `VRMSpringBoneJoint`.
- `MeshPhysicalMaterial` mahal per piksel, jadi vinyl memakai `MeshStandardMaterial`.

**Urutan kerja:**

1. Varian kamera K2 (checkpoint 1).
2. Fondasi karakter.
3. Heru (checkpoint 2).
4. Lima karakter lain dan merpati.
5. Mode hemat, ukur anggaran, review akhir (checkpoint 3).

Tiap karakter dibandingkan berdampingan dengan turnaround dari depan, samping dan belakang, lalu dengan K1 dan K2.

## Catatan teknis

- three 0.186 tidak lagi menyediakan `three.module.min.js` (split `three.module.js` + `three.core.js`, 417 KB gzip tanpa minify), jadi kode dibundel dengan esbuild.
- Dari Migration Guide: `Clock` → `Timer` (r183), `PCFSoftShadowMap` → `PCFShadowMap` (r182).
- Cahaya eksterior: matahari rendah dari depan-kiri, ditambah penghalang tak terlihat di seberang jalan (z 20) untuk bayangan diagonal; hemisphere lavender; Neutral tone mapping; eksposur 0,9.
- Di dalam toko, hemisphere dan environment diblend dengan `smoothstep` dari posisi z kamera (adaptasi eksposur).
- AO diproses per potongan kecil di frame loop; sekitar 1,5 s di container dan di GPU lokal (AMD Radeon), 4–8 s di SwiftShader lokal, belum diukur di HP.
- Akses push ke `iwilwildan/kreatekno-website` tidak ada; pekerjaan dibawa lewat remote `fork` dan draft PR (lihat "Alat dan akses").
