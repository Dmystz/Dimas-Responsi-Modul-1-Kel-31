import * as Book from '../models/bookModel.js';

const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({
        message: 'Terjadi kesalahan server',
        error: error.message
    });
};

const validId = (id) => /^\d+$/.test(id) && Number(id) > 0;

const allowed = [
    'title', 'author', 'isbn', 'category',
    'publisher', 'published_year', 'total_stock'
];

export async function listBooks(req, res) {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

        const result = await Book.getBooks({
            search: req.query.search,
            category: req.query.category,
            page,
            limit
        });

        res.json({
            message: 'Katalog buku berhasil diambil',
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages: Math.ceil(result.total / limit)
            },
            data: result.data
        });
    } catch (error) {
        handleError(res, error);
    }
}

export async function getBook(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const data = await Book.getBookById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.json({ data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function addBook(req, res) {
    try {
        const body = req.body || {};

        for (const field of ['title', 'author', 'category']) {
            if (typeof body[field] !== 'string' || !body[field].trim()) {
                return res.status(400).json({
                    message: `${field} wajib diisi`
                });
            }
        }

        const book = {};
        for (const field of allowed) {
            if (body[field] !== undefined) book[field] = body[field];
        }

        const data = await Book.createBook(book);
        res.status(201).json({ message: 'Buku berhasil ditambahkan', data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function editBook(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const book = {};
        for (const field of allowed) {
            if (req.body?.[field] !== undefined) {
                book[field] = req.body[field];
            }
        }

        if (!Object.keys(book).length) {
            return res.status(400).json({ message: 'Tidak ada data untuk diubah' });
        }

        const data = await Book.updateBook(req.params.id, book);

        if (!data) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        res.json({ message: 'Buku berhasil diperbarui', data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function removeBook(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const data = await Book.deleteBook(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: 'Buku tidak ditemukan atau masih memiliki riwayat peminjaman'
            });
        }

        res.json({ message: 'Buku berhasil dihapus', data });
    } catch (error) {
        handleError(res, error);
    }
}