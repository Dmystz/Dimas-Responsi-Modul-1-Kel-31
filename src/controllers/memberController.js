import * as Member from '../models/memberModel.js';

const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({
        message: 'Terjadi kesalahan server',
        error: error.message
    });
};

const validId = (id) => /^\d+$/.test(id) && Number(id) > 0;

export async function listMembers(req, res) {
    try {
        const data = await Member.getMembers();
        res.json({ data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function getMember(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const data = await Member.getMemberById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: 'Anggota tidak ditemukan' });
        }

        res.json({ data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function addMember(req, res) {
    try {
        const { name, email, phone } = req.body || {};

        if (
            typeof name !== 'string' || !name.trim() ||
            typeof email !== 'string' || !email.trim()
        ) {
            return res.status(400).json({
                message: 'Nama dan email wajib diisi'
            });
        }

        const data = await Member.createMember({
            name: name.trim(),
            email: email.trim(),
            phone: phone || null
        });

        res.status(201).json({ message: 'Anggota berhasil ditambahkan', data });
    } catch (error) {
        handleError(res, error);
    }
}

export async function memberLoans(req, res) {
    try {
        if (!validId(req.params.id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }

        const member = await Member.getMemberById(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Anggota tidak ditemukan' });
        }

        const data = await Member.getMemberLoans(req.params.id);
        res.json({ member, data });
    } catch (error) {
        handleError(res, error);
    }
}