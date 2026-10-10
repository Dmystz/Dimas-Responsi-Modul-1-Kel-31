# REST API Perpustakaan

## 1. Deskripsi Umum dan Tujuan Proyek

REST API Perpustakaan merupakan aplikasi backend yang dikembangkan menggunakan Node.js, Express.js, dan Supabase sebagai database. Proyek ini bertujuan untuk mengelola data buku, anggota perpustakaan, serta transaksi peminjaman dan pengembalian buku melalui REST API.

API menyediakan fitur CRUD (*Create, Read, Update, Delete*) untuk data buku dan anggota, pencatatan peminjaman, pengembalian buku, pencarian data, serta filter peminjaman berdasarkan status. Sistem juga memperbarui stok buku secara otomatis ketika buku dipinjam atau dikembalikan.

### Teknologi yang Digunakan

- **Node.js:** Menjalankan aplikasi backend.
- **Express.js:** Mengelola routing dan HTTP request.
- **Supabase PostgreSQL:** Menyimpan dan mengelola data.
- **Vercel:** Melakukan deployment API.
- **GitHub:** Menyimpan source code proyek.

## 2. Struktur Data / Schema Database

Database menggunakan Supabase PostgreSQL dengan tiga tabel utama.

### Tabel `books`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | BIGINT | Primary key |
| `title` | VARCHAR | Judul buku |
| `author` | VARCHAR | Penulis buku |
| `isbn` | VARCHAR | ISBN unik buku |
| `category` | VARCHAR | Kategori buku |
| `publisher` | VARCHAR | Penerbit |
| `published_year` | INTEGER | Tahun terbit |
| `total_stock` | INTEGER | Stok buku tersedia |
| `created_at` | TIMESTAMPTZ | Waktu pembuatan data |

### Tabel `members`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | BIGINT | Primary key |
| `name` | VARCHAR | Nama anggota |
| `email` | VARCHAR | Email unik anggota |
| `phone` | VARCHAR | Nomor telepon |
| `created_at` | TIMESTAMPTZ | Waktu pembuatan data |

### Tabel `loans`

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `id` | BIGINT | Primary key |
| `member_id` | BIGINT | Foreign key ke `members.id` |
| `book_id` | BIGINT | Foreign key ke `books.id` |
| `loan_date` | DATE | Tanggal peminjaman |
| `due_date` | DATE | Tanggal jatuh tempo |
| `return_date` | DATE | Tanggal pengembalian |
| `status` | VARCHAR | Status peminjaman |
| `created_at` | TIMESTAMPTZ | Waktu pembuatan data |

Relasi database menghubungkan tabel `members` dan `books` dengan tabel `loans` melalui foreign key. Status peminjaman terdiri dari `Dipinjam`, `Dikembalikan`, dan `Terlambat`.

## 3. Contoh Request dan Response

### A. Mendapatkan Daftar Buku

<img width="1266" height="841" alt="image" src="https://github.com/user-attachments/assets/d987a063-4d3f-4c6e-9b76-d4c67c33593a" />

### B. Membuat Peminjaman Buku

<img width="1272" height="845" alt="Screenshot 2026-10-10 172825" src="https://github.com/user-attachments/assets/1805b480-9547-4f2d-860a-387729ec4b2b" />

### C. Memfilter Peminjaman Terlambat

<img width="1267" height="837" alt="image" src="https://github.com/user-attachments/assets/cb8a79a8-89b3-449a-9797-60f0ef59041f" />

### D. Mengembalikan Buku

<img width="1281" height="823" alt="image" src="https://github.com/user-attachments/assets/53a9c0d3-619f-4834-b53a-dd6943d9136f" />

## 4. Panduan Instalasi dan Menjalankan Secara Lokal

### Prasyarat

Pastikan Node.js dan npm sudah terpasang di komputer serta tersedia project Supabase.

### Langkah Instalasi

**1. Clone repository**

```bash
git clone https://github.com/USERNAME/library-api.git
cd library-api
```

Ganti URL tersebut dengan URL repository GitHub proyek yang sebenarnya.

**2. Instal dependensi**

```bash
npm install
```

**3. Konfigurasi environment variables**

Buat file `.env` pada direktori utama proyek.

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_SECRET_KEY
PORT=3000
```

Sesuaikan nilai tersebut dengan konfigurasi Supabase milik kamu. Jangan mengunggah file `.env` ke GitHub.

**4. Siapkan database**

Buka SQL Editor pada dashboard Supabase, kemudian jalankan SQL untuk membuat tabel `books`, `members`, dan `loans`, function peminjaman dan pengembalian, serta data awal jika diperlukan.

**5. Jalankan aplikasi**

Mode development:

```bash
npm run dev
```

Atau mode biasa:

```bash
npm start
```

Jika berhasil, API lokal dapat diakses melalui:

```text
http://localhost:3000
```

### Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/books` | Mendapatkan daftar buku |
| GET | `/books/:id` | Mendapatkan detail buku |
| POST | `/books` | Menambahkan buku |
| PUT | `/books/:id` | Mengubah data buku |
| DELETE | `/books/:id` | Menghapus buku |
| GET | `/members` | Mendapatkan daftar anggota |
| GET | `/members/:id` | Mendapatkan detail anggota |
| POST | `/members` | Menambahkan anggota |
| GET | `/members/:id/loans` | Melihat riwayat peminjaman |
| GET | `/loans` | Mendapatkan daftar peminjaman |
| GET | `/loans/:id` | Mendapatkan detail peminjaman |
| POST | `/loans` | Membuat peminjaman |
| PUT | `/loans/:id` | Mengubah tanggal jatuh tempo |
| PATCH | `/loans/:id/return` | Mengembalikan buku |
| DELETE | `/loans/:id` | Menghapus data peminjaman |
| GET | `/dashboard` | Mendapatkan statistik perpustakaan |

## 5. Link Deployment Vercel

https://dimas-responsi-modul-1-kel-31.vercel.app

Setelah deployment berhasil, API dapat diakses melalui URL Vercel yang diberikan. Contoh endpoint production:

```http
GET https://dimas-responsi-modul-1-kel-31.vercel.app/books
GET https://dimas-responsi-modul-1-kel-31.vercel.app/members
GET https://dimas-responsi-modul-1-kel-31.vercel.app/loans
GET https://dimas-responsi-modul-1-kel-31.vercel.app/loans?status=Terlambat
GET https://dimas-responsi-modul-1-kel-31.vercel.app/dashboard
```
