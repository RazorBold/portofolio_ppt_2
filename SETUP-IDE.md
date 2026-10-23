# CARA BUKA PROJECT INI DI IDE KAMU

Project: JAGO SLIDE™ — Portfolio PPT Designer (Next.js 16 + TypeScript + Tailwind 4 + GSAP)

---

## 1) Ekstrak ZIP

Ekstrak file zip ini ke folder mana saja, contoh:
`D:\Projects\jago-slide` (Windows) atau `~/Projects/jago-slide` (Mac/Linux)

## 2) Install software yang dibutuhkan

- **Node.js 20 atau lebih baru (LTS)** → download di https://nodejs.org
- **VS Code** (rekomendasi IDE) → https://code.visualstudio.com
- Opsional: **Bun** (lebih cepat) → https://bun.sh

Cek instalasi, buka Terminal / PowerShell, ketik:

```bash
node -v   # harus v20 atau lebih
npm -v
```

## 3) Buka folder project di VS Code

VS Code → File → Open Folder → pilih folder hasil ekstrak.

Buka terminal di dalam VS Code: menu Terminal → New Terminal.

## 4) Install dependencies

Pilih salah satu:

```bash
npm install
# atau kalau pakai Bun:
bun install
```

Proses ini butuh internet dan butuh 1-3 menit (menghasilkan folder `node_modules`).

## 5) Jalankan project

### Windows (PowerShell / CMD):
```bash
npx next dev -p 3000
```

### Mac / Linux (atau pakai Bun):
```bash
npm run dev
# atau
bun run dev
```

> Catatan Windows: script `npm run dev` di package.json memakai perintah
> Linux (`tee`), jadi di Windows langsung pakai `npx next dev -p 3000` saja,
> atau jalankan lewat WSL / Git Bash.

Lalu buka browser ke: **http://localhost:3000**

## 6) Edit-Edit File Penting

| File | Isi |
|---|---|
| `src/app/page.tsx` | Susunan semua section di halaman |
| `src/components/site/Hero.tsx` | Hero "PPT JUGA SENI" |
| `src/components/site/WorksHub.tsx` | Halaman utama karya (hub) |
| `src/components/site/ShowcaseGrid.tsx` | Grid karya + animasi hover |
| `src/components/site/ShowcaseHorizontal.tsx` | Galeri horizontal (scroll pin) |
| `src/components/site/ShowcaseStack.tsx` | Animasi tumpukan kartu |
| `src/components/site/ShowcaseSlides.tsx` | Animasi slide fullscreen |
| `src/components/site/FeaturedZoom.tsx` | Zoom featured work |
| `src/lib/works.ts` | DATA karya (judul, klien, gambar) — tambah karya baru di sini |
| `public/images/` | Semua gambar karya |
| `src/app/globals.css` | Warna & style global (ink/paper/hot/lime) |

Ganti teks/warna/harga: cari di file section masing-masing.

## 7) Build versi produksi (opsional)

```bash
npm run build
npm start
```

## Catatan Teknis

- Font (Anton, Space Grotesk, Space Mono) diunduh otomatis dari Google Fonts
  saat `dev`/`build` pertama kali — pastikan ada internet.
- Database: SQLite via Prisma. File `.env` sudah disiapkan dengan path relatif
  (`file:../db/custom.db`), jadi jalan di folder mana pun.
  Kalau perlu regenerate client: `npx prisma generate`.
- Folder `db/`, `public/images/` sudah termasuk di dalam zip.
- Folder yang TIDAK ikut di-zip: `node_modules`, `.next` (build cache) —
  keduanya dibuat ulang otomatis lewat `npm install` dan `npm run dev`.
