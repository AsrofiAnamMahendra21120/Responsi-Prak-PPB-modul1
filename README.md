# Shoe Laundry API

REST API sederhana untuk layanan cuci sepatu berbasis Node.js, Express.js, dan Supabase.

## Fitur
- CRUD data sepatu yang sedang dicuci
- Filter berdasarkan status (Menunggu, Proses, Selesai)
- Deploy ke Vercel agar dapat diakses publik

## Endpoint Utama
| Method | Endpoint | Deskripsi |
|--------|-----------|-----------|
| POST | /api/items | Tambah data |
| GET | /api/items | Ambil semua data |
| GET | /api/items?status=Selesai | Filter berdasarkan status |
| PUT | /api/items/:id | Update data |
| DELETE | /api/items/:id | Hapus data |

## Teknologi
- Node.js + Express.js
- Supabase (PostgreSQL)
- Vercel (Hosting)

## Deploy
1. Tambahkan variabel lingkungan di Vercel:
   - SUPABASE_URL
   - SUPABASE_KEY
2. Deploy langsung dari repository GitHub.
3. Akses API publik: `https://responsi-prak-ppb-modul1.vercel.app/`

