import * as Loan from '../models/loanModel.js';

const validStatuses = [
    'Dipinjam',
    'Dikembalikan',
    'Terlambat'
];

const requiredFields = [
    'member_name',
    'book_title',
    'loan_date',
    'due_date'
];

const allowedFields = [
    ...requiredFields,
    'return_date',
    'status'
];

const isValidId = (id) =>
    /^\d+$/.test(id) && Number(id) > 0;

const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({
        message: 'Terjadi kesalahan pada server',
        error: error.message
    });
};

// GET /loans?status=Terlambat
export const getLoans = async (req, res) => {
    try {
        const { status } = req.query;

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Status tidak valid',
                allowed: validStatuses
            });
        }

        const data = await Loan.getAllLoans(status);

        return res.status(200).json({
            message: 'Data peminjaman berhasil diambil',
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

// GET /loans/:id
export const getLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka positif'
            });
        }

        const data = await Loan.getLoanById(id);

        if (!data) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            });
        }

        return res.status(200).json({ data });
    } catch (error) {
        return handleError(res, error);
    }
};

// POST /loans
export const addLoan = async (req, res) => {
    try {
        const body = req.body;

        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return res.status(400).json({
                message: 'Body harus berupa objek JSON'
            });
        }

        const missing = requiredFields.filter(
            (field) =>
                typeof body[field] !== 'string' ||
                !body[field].trim()
        );

        if (missing.length) {
            return res.status(400).json({
                message: 'Field wajib belum lengkap',
                missing
            });
        }

        if (
            body.status !== undefined &&
            !validStatuses.includes(body.status)
        ) {
            return res.status(400).json({
                message: 'Status tidak valid',
                allowed: validStatuses
            });
        }

        const loan = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                loan[field] = body[field];
            }
        }

        const data = await Loan.createLoan(loan);

        return res.status(201).json({
            message: 'Peminjaman berhasil ditambahkan',
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

// PUT /loans/:id
export const editLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        if (!isValidId(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka positif'
            });
        }

        if (
            !body ||
            typeof body !== 'object' ||
            Array.isArray(body)
        ) {
            return res.status(400).json({
                message: 'Body harus berupa objek JSON'
            });
        }

        const loan = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                loan[field] = body[field];
            }
        }

        if (Object.keys(loan).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada field yang diperbarui'
            });
        }

        for (const field of requiredFields) {
            if (
                field in loan &&
                (typeof loan[field] !== 'string' ||
                    !loan[field].trim())
            ) {
                return res.status(400).json({
                    message: `${field} tidak boleh kosong`
                });
            }
        }

        if (
            loan.status !== undefined &&
            !validStatuses.includes(loan.status)
        ) {
            return res.status(400).json({
                message: 'Status tidak valid',
                allowed: validStatuses
            });
        }

        const data = await Loan.updateLoan(id, loan);

        if (!data) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            });
        }

        return res.status(200).json({
            message: 'Peminjaman berhasil diperbarui',
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};

// DELETE /loans/:id
export const removeLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka positif'
            });
        }

        const data = await Loan.deleteLoan(id);

        if (!data) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            });
        }

        return res.status(200).json({
            message: 'Peminjaman berhasil dihapus',
            data
        });
    } catch (error) {
        return handleError(res, error);
    }
};