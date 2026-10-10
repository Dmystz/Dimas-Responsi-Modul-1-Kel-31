import * as Loan from '../models/loanModel.js';

const statuses = ['Dipinjam', 'Dikembalikan', 'Terlambat'];

const handleError = (res, error) => {
    console.error(error);

    const message = error.message || 'Terjadi kesalahan server';

    if (
        /tidak ditemukan|stok buku habis|sudah dikembalikan|tanggal jatuh tempo/i
            .test(message)
    ) {
        return res.status(400).json({ message });
    }

    return res.status(500).json({
        message: 'Terjadi kesalahan server',
        error: message
    });
};

const validId = (id) => /^\d+$/.test(id) && Number(id) > 0;

export async function listLoans(req, res) {
    try {
        const { status, member_id } = req.query;

        if (status && !statuses.includes(status)) {
            return res.status(400).json({
                message: 'Status tidak valid',
                allowed: statuses
            });
        }

        if (member_id && !validId(member_id)) {
            return res.status(400).json({ message: 'member_id tidak valid' });
        }

        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

        const result = await Loan.getLoans({
            status,
            member_id,
            page,
            limit
        });

        res.json({
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

export async function getLoan(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const data = await Loan.getLoanById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
        }

        res.json({ data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function addLoan(req, res) {
    try {
        const { member_id, book_id, due_date } = req.body || {};

        if (
            !Number.isInteger(Number(member_id)) || Number(member_id) <= 0 ||
            !Number.isInteger(Number(book_id)) || Number(book_id) <= 0 ||
            typeof due_date !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(due_date)
        ) {
            return res.status(400).json({
                message: 'member_id, book_id, dan due_date (YYYY-MM-DD) wajib valid'
            });
        }

        const data = await Loan.createLoan({
            member_id: Number(member_id),
            book_id: Number(book_id),
            due_date
        });

        res.status(201).json({
            message: 'Peminjaman berhasil dibuat',
            data
        });
    } catch (error) {
        handleError(res, error);
    }
}

export async function editLoan(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const { due_date } = req.body || {};

        if (
            typeof due_date !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(due_date)
        ) {
            return res.status(400).json({
                message: 'due_date wajib menggunakan format YYYY-MM-DD'
            });
        }

        const data = await Loan.updateLoan(req.params.id, { due_date });

        if (!data) {
            return res.status(404).json({
                message: 'Peminjaman aktif tidak ditemukan'
            });
        }

        res.json({ message: 'Peminjaman berhasil diperbarui', data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function returnBook(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const data = await Loan.returnLoan(req.params.id);

        res.json({ message: 'Buku berhasil dikembalikan', data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function removeLoan(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const data = await Loan.deleteLoan(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: 'Transaksi tidak ditemukan atau belum dikembalikan'
            });
        }

        res.json({ message: 'Transaksi berhasil dihapus', data });
    } catch (error) {
        handleError(res, error);
    }
}