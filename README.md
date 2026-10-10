
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

## Contoh Request

POST /loans

```json
{
  "member_name": "Andi",
  "book_title": "Laskar Pelangi",
  "loan_date": "2026-10-10",
  "due_date": "2026-10-17",
  "status": "Dipinjam"
}
```

Contoh response:

```json
{
  "message": "Peminjaman berhasil ditambahkan",
  "data": {
    "id": 1,
    "member_name": "Andi",
    "book_title": "Laskar Pelangi",
    "loan_date": "2026-10-10",
    "due_date": "2026-10-17",
    "return_date": null,
    "status": "Dipinjam"
  }
}
```

## Deployment

- GitHub Repository: ISI_LINK_GITHUB
- Vercel Base URL: ISI_LINK_VERCEL
