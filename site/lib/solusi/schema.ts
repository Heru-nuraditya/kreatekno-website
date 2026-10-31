import { z } from "zod";
import { APPS, INDUSTRI, STATUS, TIM } from "@/content/solusi/taksonomi";

/**
 * Bentuk data halaman Solusi, divalidasi saat build (data yang salah menggagalkan `next build`).
 *
 * Aturan isi (lihat SOLUSI-SPEC.md bagian 3):
 * - Hanya aplikasi yang dilihat klien boleh disebut (WhatsApp, Google Sheets...). Tidak ada nama
 *   alat backend atau model AI, dan tidak ada mekanik workflow yang bisa ditiru pesaing
 *   (nomor cadangan, aturan cocok harga/rute, aturan batal otomatis...).
 * - Proyek "Sudah berjalan" adalah versi yang disamarkan atas permintaan klien.
 */

const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((x) => x.id) as unknown as [T[number]["id"], ...T[number]["id"][]];

const Industri = z.enum(ids(INDUSTRI));
const Tim = z.enum(ids(TIM));
const App = z.enum(ids(APPS));
const Status = z.enum(Object.keys(STATUS) as [keyof typeof STATUS, ...(keyof typeof STATUS)[]]);

const line = z.string().trim().min(1);

/** Semua teks satu solusi dalam satu bahasa. */
const SolusiText = z.strictObject({
  /** Judul di label rak dan H1 halaman detail. */
  title: line,
  /** Pertanyaan yang dijawab halaman detail, ditulis seperti orang bertanya ke mesin pencari/AI. */
  question: line,
  /** Hasil dalam satu baris, tampil di label rak. */
  result: line,
  /** Jawaban langsung 2–4 kalimat (kotak jawaban di atas halaman detail, sumber utama AEO/GEO). */
  answer: line,
  /** Hanya untuk "Sudah berjalan": jenis usaha klien yang disamarkan, mis. "Distributor air minum, Pekanbaru". */
  client: line.optional(),
  pains: z.array(line).min(1),
  steps: z
    .array(z.strictObject({ title: line, body: line }))
    .min(3)
    .max(7),
  compare: z.array(z.strictObject({ aspect: line, before: line, after: line })).min(1),
  fit: z.array(line).min(1),
  notFit: z.array(line).min(1),
  prep: z.array(line).min(1),
  /** Hanya untuk "Sudah berjalan", dan hanya angka yang disetujui klien. */
  metrics: z
    .array(z.strictObject({ value: line, unit: line, label: line }))
    .max(3)
    .optional(),
  faq: z.array(z.strictObject({ q: line, a: line })).min(1),
});

export const SolusiSchema = z
  .strictObject({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug: huruf kecil, angka dan tanda hubung")
      .refine((s) => s !== "hasil", "slug 'hasil' dipakai halaman hasil kartu masalah"),
    status: Status,
    /** Tanggal terakhir diperbarui, YYYY-MM-DD. */
    updated: z.iso.date(),
    industri: z.array(Industri).min(1),
    tim: z.array(Tim).min(1),
    /** Aplikasi pertama menentukan warna kotak 3D. */
    apps: z.array(App).min(1),
    id: SolusiText,
    /** Versi Inggris, wajib mulai fase 2. */
    en: SolusiText.optional(),
  })
  .superRefine((s, ctx) => {
    if (s.status === "ide" && (s.id.client || s.id.metrics?.length)) {
      ctx.addIssue({
        code: "custom",
        message: `${s.slug}: solusi "Siap dibuat" tidak boleh punya client atau metrics`,
      });
    }
  });

export const KartuSchema = z.strictObject({
  id: z.string().regex(/^k\d+$/),
  text: z.strictObject({ id: line, en: line.optional() }),
  /** Kosong = cocok untuk semua bidang usaha. */
  industri: z.array(Industri),
  tim: z.array(Tim).min(1),
  /** slug solusi → bobot 1..3 */
  solusi: z.record(z.string(), z.number().int().min(1).max(3)),
});

export type Solusi = z.infer<typeof SolusiSchema>;
export type SolusiTextData = z.infer<typeof SolusiText>;
export type Kartu = z.infer<typeof KartuSchema>;

/** Dipakai di setiap file `content/solusi/items/*.ts` supaya editor langsung memberi tahu kalau ada yang salah. */
export const defineSolusi = (s: z.input<typeof SolusiSchema>): z.input<typeof SolusiSchema> => s;
export const defineKartu = (k: z.input<typeof KartuSchema>[]): z.input<typeof KartuSchema>[] => k;

/** Memvalidasi seluruh katalog dan bank kartu, lalu mengurutkan katalog untuk etalase. */
export function checkKatalog(items: unknown[], kartu: unknown[]) {
  const SOLUSI_RAW = items.map((it, i) => {
    const r = SolusiSchema.safeParse(it);
    if (!r.success) throw new Error(`Solusi #${i + 1} tidak valid:\n${z.prettifyError(r.error)}`);
    return r.data;
  });

  const BY_SLUG = new Map<string, Solusi>();
  for (const s of SOLUSI_RAW) {
    if (BY_SLUG.has(s.slug)) throw new Error(`Slug solusi ganda: ${s.slug}`);
    BY_SLUG.set(s.slug, s);
  }

  const seen = new Set<string>();
  const KARTU = kartu.map((k, i) => {
    const r = KartuSchema.safeParse(k);
    if (!r.success) throw new Error(`Kartu #${i + 1} tidak valid:\n${z.prettifyError(r.error)}`);
    if (seen.has(r.data.id)) throw new Error(`Id kartu ganda: ${r.data.id}`);
    seen.add(r.data.id);
    for (const slug of Object.keys(r.data.solusi)) {
      if (!BY_SLUG.has(slug)) throw new Error(`Kartu ${r.data.id} menunjuk solusi yang tidak ada: ${slug}`);
    }
    return r.data;
  });

  // "Sudah berjalan" dulu, lalu "Siap dibuat"; urutan dalam kelompok mengikuti daftar di index.ts.
  const SOLUSI = [...SOLUSI_RAW.filter((s) => s.status === "jalan"), ...SOLUSI_RAW.filter((s) => s.status === "ide")];
  return { SOLUSI, KARTU, BY_SLUG: BY_SLUG as ReadonlyMap<string, Solusi> };
}
