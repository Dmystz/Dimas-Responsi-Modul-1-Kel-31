
# Library Loans REST API

REST API sederhana untuk pencatatan peminjaman buku perpustakaan menggunakan Node.js, Express.js, dan Supabase PostgreSQL.

## Fitur
- Create: menambahkan data peminjaman.
- Read: menampilkan semua data dan detail peminjaman.
- Update: memperbarui data peminjaman.
- Delete: menghapus data peminjaman.
- Filter: mencari peminjaman berdasarkan status.

## Teknologi
- Node.js
- Express.js
- Supabase PostgreSQL
- Vercel
- GitHub

## Struktur Data

| Field | Tipe | Keterangan |
|---|---|---|
| id | BIGINT | Primary key |
| member_name | TEXT | Nama anggota |
| book_title | TEXT | Judul buku |
| loan_date | DATE | Tanggal peminjaman |
| due_date | DATE | Batas pengembalian |
| return_date | DATE | Tanggal pengembalian |
| status | TEXT | Status peminjaman |

## Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | / | Informasi API |
| GET | /loans | Daftar peminjaman |
| GET | /loans/:id | Detail peminjaman |
| POST | /loans | Tambah peminjaman |
| PUT | /loans/:id | Ubah peminjaman |
| DELETE | /loans/:id | Hapus peminjaman |
| GET | /loans?status=Terlambat | Filter status |

## Instalasi Lokal

1. Clone repository.
2. Jalankan `npm install`.
3. Buat file `.env` berisi kredensial Supabase.
4. Buat tabel `loans` melalui Supabase SQL Editor.
5. Jalankan `npm run dev`.
6. Buka `http://localhost:3000`.

## Contoh Request dan Response

<img width="1258" height="690" alt="image" src="https://github.com/user-attachments/assets/6a68dc6d-f017-4ad4-bed4-ba2760cc3863" />

## Deployment

- GitHub Repository: ISI_LINK_GITHUB
- Vercel Base URL: ISI_LINK_VERCEL
