export type Work = {
  id: string;
  title: string;
  cat: string;
  year: string;
  img: string;
  result: string;
  orient?: "l" | "p";
};

/** 14 karya — urutan nomor W.01–W.14 */
export const WORKS: Work[] = [
  {
    id: "W.01",
    title: "PITCH DECK — BATU SAJI",
    cat: "SERIES A • FINTECH",
    year: "2025",
    img: "/images/work-startup.png",
    result: "Dana cair Rp 4,2 M",
  },
  {
    id: "W.02",
    title: "KEYNOTE — LUNCUR JAGOAN",
    cat: "PRODUCT LAUNCH • FMCG",
    year: "2025",
    img: "/images/work-launch.png",
    result: "Trending #2 Twitter",
  },
  {
    id: "W.03",
    title: "ANNUAL REPORT — GUDANG KITA",
    cat: "KORPORAT • LOGISTIK",
    year: "2025",
    img: "/images/work-corporate.png",
    result: "Dipakai 34 cabang",
  },
  {
    id: "W.04",
    title: "SERIES B — DOMPETKU",
    cat: "FINTECH • APP",
    year: "2025",
    img: "/images/work-fintech.png",
    result: "Dana cair $2,1 Juta",
  },
  {
    id: "W.05",
    title: "PITCH DECK — RASA NUSANTARA",
    cat: "F&B • RESTORAN",
    year: "2024",
    img: "/images/work-fnb.png",
    result: "Ekspansi 12 cabang",
  },
  {
    id: "W.06",
    title: "KATALOG — NUSA KELIMA",
    cat: "TRAVEL • WISATA",
    year: "2024",
    img: "/images/work-travel.png",
    result: "Sold out 3 hari",
  },
  {
    id: "W.07",
    title: "KAMPANYE — BUMI MUDA",
    cat: "NGO • LINGKUNGAN",
    year: "2025",
    img: "/images/work-ngo.png",
    result: "1,2 juta tanda tangan",
  },
  {
    id: "W.08",
    title: "PROFIL — SEHAT! KLINIK",
    cat: "HEALTHCARE • KLINIK",
    year: "2024",
    img: "/images/work-health.png",
    result: "MoU 5 asuransi",
  },
  {
    id: "W.09",
    title: "DATA STORY — NUSA ANALYTICS",
    cat: "DATA VIZ • SAAS",
    year: "2025",
    img: "/images/work-data.png",
    result: "Deal naik 3x",
  },
  {
    id: "W.10",
    title: "MODUL AJAR — SKILLHUB",
    cat: "PENDIDIKAN • E-LEARNING",
    year: "2024",
    img: "/images/work-edu.png",
    result: "12.400 siswa",
  },
  {
    id: "W.11",
    title: "UNDANGAN — DIKA & RARA",
    cat: "WEDDING • INTERAKTIF",
    year: "2024",
    img: "/images/work-wedding.png",
    result: "Tamu dateng 98%",
  },
  {
    id: "W.12",
    title: "LOOKBOOK — KAIN RIMBA",
    cat: "FASHION • EDITORIAL",
    year: "2025",
    img: "/images/work-fashion.png",
    result: "Order 3x lipat",
    orient: "p",
  },
  {
    id: "W.13",
    title: "SALES DECK — KELOLA.ID",
    cat: "SAAS • B2B",
    year: "2025",
    img: "/images/work-saas.png",
    result: "Trial naik 210%",
    orient: "p",
  },
  {
    id: "W.14",
    title: "SALES KIT — BUMI ASRI",
    cat: "PROPERTI • RESIDENSIAL",
    year: "2024",
    img: "/images/work-property.png",
    result: "Closing +40%",
  },
];

export const byId = (id: string) => WORKS.find((w) => w.id === id)!;
