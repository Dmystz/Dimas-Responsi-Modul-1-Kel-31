# REST API Perpustakaan

REST API untuk mengelola sistem perpustakaan yang mencakup katalog buku, data anggota, peminjaman, dan pengembalian buku. API dibangun menggunakan **Node.js** dan **Express.js**, dengan **Supabase PostgreSQL** sebagai database serta **Vercel** sebagai platform deployment.

## Fitur Utama

- **Manajemen Buku:** Menambahkan, melihat, mencari, mengubah, dan menghapus data buku.
- **Manajemen Anggota:** Mengelola data anggota perpustakaan.
- **Peminjaman Buku:** Mencatat transaksi peminjaman dan memvalidasi ketersediaan stok.
- **Pengembalian Buku:** Mencatat pengembalian dan memperbarui stok buku secara otomatis.
- **Status Peminjaman:** Mendukung status `Dipinjam`, `Dikembalikan`, dan `Terlambat`.
- **Filter Data:** Memfilter peminjaman berdasarkan status dan anggota.
- **Pencarian dan Pagination:** Mendukung pencarian buku serta pengambilan data per halaman.
- **Dashboard:** Menampilkan ringkasan data buku, anggota, dan peminjaman.

## Teknologi yang Digunakan

- Node.js
- Express.js
- Supabase PostgreSQL
- Supabase JavaScript Client
- Vercel
- Git dan GitHub

## Struktur Project

```text
library-api/
├── src/
│   ├── config/
│   │   └── supabaseClient.js
│   ├── controllers/
│   │   ├── bookController.js
│   │   ├── memberController.js
│   │   ├── loanController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── bookModel.js
│   │   ├── memberModel.js
│   │   ├── loanModel.js
│   │   └── dashboardModel.js
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── loanRoutes.js
│   │   └── dashboardRoutes.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

## Database

Database menggunakan Supabase PostgreSQL dengan tiga tabel utama.

### 1. Tabel `books`

| Kolom | Keterangan |
|---|---|
| `id` | Primary key buku |
| `title` | Judul buku |
| `author` | Nama penulis |
| `isbn` | Nomor ISBN unik |
| `category` | Kategori buku |
| `publisher` | Nama penerbit |
| `published_year` | Tahun terbit |
| `total_stock` | Stok buku yang tersedia |
| `created_at` | Waktu data dibuat |

### 2. Tabel `members`

| Kolom | Keterangan |
|---|---|
| `id` | Primary key anggota |
| `name` | Nama anggota |
| `email` | Email anggota yang unik |
| `phone` | Nomor telepon |
| `created_at` | Waktu data dibuat |

### 3. Tabel `loans`

| Kolom | Keterangan |
|---|---|
| `id` | Primary key peminjaman |
| `member_id` | Foreign key ke tabel `members` |
| `book_id` | Foreign key ke tabel `books` |
| `loan_date` | Tanggal peminjaman |
| `due_date` | Batas waktu pengembalian |
| `return_date` | Tanggal pengembalian |
| `status` | Status peminjaman |
| `created_at` | Waktu data dibuat |

Relasi database menghubungkan anggota dengan transaksi peminjaman serta buku dengan transaksi peminjaman. Function PostgreSQL `borrow_book` dan `return_book` digunakan untuk mengelola transaksi sekaligus memperbarui stok buku.

## Instalasi dan Konfigurasi

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/library-api.git
cd library-api
```

Ganti `USERNAME/library-api` dengan alamat repository GitHub yang digunakan.

### 2. Instal Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di direktori utama project.

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_SECRET_KEY
PORT=3000
```

Sesuaikan nilai environment variables dengan konfigurasi project Supabase. Gunakan key server yang sesuai dengan konfigurasi Supabase kamu.

**Penting:** Jangan mengunggah file `.env` atau secret key ke repository GitHub publik.

### 4. Siapkan Database Supabase

1. Buka dashboard Supabase.
2. Pilih project database yang digunakan.
3. Buka menu **SQL Editor**.
4. Jalankan SQL untuk membuat tabel `books`, `members`, dan `loans`.
5. Buat function `borrow_book` dan `return_book`.
6. Masukkan data awal buku dan anggota jika diperlukan.

### 5. Jalankan API

Mode development:

```bash
npm run dev
```

Mode biasa:

```bash
npm start
```

Jika server berjalan pada port 3000, API lokal dapat diakses melalui:

```text
http://localhost:3000
```

## Dokumentasi Endpoint

Base URL lokal:

```text
http://localhost:3000
```

### Informasi API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/` | Informasi API |

### Books

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/books` | Mendapatkan daftar buku |
| GET | `/books/:id` | Mendapatkan detail buku |
| POST | `/books` | Menambahkan buku |
| PUT | `/books/:id` | Mengubah data buku |
| DELETE | `/books/:id` | Menghapus buku |

Parameter query yang tersedia untuk daftar buku:

- `search`: mencari buku berdasarkan judul.
- `category`: memfilter kategori.
- `page`: nomor halaman.
- `limit`: jumlah data per halaman.

Contoh:

```http
GET /books?search=Atomic&page=1&limit=10
```

Contoh request untuk menambahkan buku:

```json
{
  "title": "Pemrograman Web",
  "author": "Budi Santoso",
  "isbn": "9781234567890",
  "category": "Teknologi",
  "publisher": "Penerbit Informatika",
  "published_year": 2025,
  "total_stock": 5
}
```

### Members

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/members` | Mendapatkan daftar anggota |
| GET | `/members/:id` | Mendapatkan detail anggota |
| POST | `/members` | Menambahkan anggota |
| GET | `/members/:id/loans` | Melihat riwayat peminjaman anggota |

Contoh request untuk menambahkan anggota:

```json
{
  "name": "Dimas Pratama",
  "email": "dimas@example.com",
  "phone": "081234567890"
}
```

### Loans

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/loans` | Mendapatkan daftar peminjaman |
| GET | `/loans/:id` | Mendapatkan detail peminjaman |
| POST | `/loans` | Membuat peminjaman |
| PUT | `/loans/:id` | Mengubah tanggal jatuh tempo |
| PATCH | `/loans/:id/return` | Mengembalikan buku |
| DELETE | `/loans/:id` | Menghapus data peminjaman sesuai aturan |

Contoh request peminjaman:

```json
{
  "member_id": 1,
  "book_id": 1,
  "due_date": "2026-10-20"
}
```

Contoh mengembalikan buku:

```http
PATCH /loans/1/return
```

Contoh filter berdasarkan status:

```http
GET /loans?status=Terlambat
```

Filter tersebut menampilkan peminjaman yang sudah melewati tanggal jatuh tempo dan belum dikembalikan, meskipun status yang tersimpan di database masih `Dipinjam`.

Filter berdasarkan anggota:

```http
GET /loans?member_id=1
```

Pagination peminjaman:

```http
GET /loans?page=1&limit=10
```

### Dashboard

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/dashboard` | Mendapatkan ringkasan statistik perpustakaan |

## Contoh Pengujian API

API dapat diuji menggunakan Postman, Insomnia, atau REST Client.

Contoh pengujian daftar buku:

```http
GET http://localhost:3000/books
```

Contoh pengujian daftar anggota:

```http
GET http://localhost:3000/members
```

Contoh pengujian peminjaman terlambat:

```http
GET http://localhost:3000/loans?status=Terlambat
```

Contoh pengujian dashboard:

```http
GET http://localhost:3000/dashboard
```

Untuk request `POST` dan `PUT` yang menggunakan JSON, sertakan header berikut:

```http
Content-Type: application/json
```

## Deployment ke Vercel

1. Pastikan project sudah tersimpan di repository GitHub.
2. Buka [Vercel](https://vercel.com/) dan impor repository project.
3. Tambahkan environment variables `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` melalui pengaturan project Vercel.
4. Pastikan file `vercel.json` sudah tersedia dan sesuai dengan konfigurasi project.
5. Lakukan deployment.
6. Uji endpoint API menggunakan URL deployment yang diberikan Vercel.

Contoh URL setelah deployment:

```text
https://nama-project.vercel.app
```

Contoh endpoint production:

```http
GET https://nama-project.vercel.app/books
GET https://nama-project.vercel.app/members
GET https://nama-project.vercel.app/loans?status=Terlambat
GET https://nama-project.vercel.app/dashboard
```

Ganti `nama-project.vercel.app` dengan URL deployment yang sebenarnya.

## Catatan Keamanan

- Jangan menyimpan secret key di repository publik.
- Gunakan environment variables untuk konfigurasi database.
- Validasi input sebelum melakukan operasi database.
- Batasi akses database dan endpoint sesuai kebutuhan aplikasi.
- Jika API akan digunakan secara publik, tambahkan autentikasi dan otorisasi sebelum digunakan untuk data nyata.

## Lisensi

Project ini dibuat untuk keperluan pembelajaran dan responsi pengembangan REST API.
