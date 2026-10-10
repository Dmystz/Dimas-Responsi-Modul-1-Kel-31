import { getDashboard } from '../models/dashboardModel.js';

export async function dashboard(req, res) {
    try {
        const data = await getDashboard();
        res.json({
            message: 'Statistik perpustakaan berhasil diambil',
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal mengambil statistik perpustakaan'
        });
    }
}