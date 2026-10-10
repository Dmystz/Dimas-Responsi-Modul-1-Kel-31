import express from 'express';
import loanRoutes from './routes/loanRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Library Loans REST API',
        endpoints: {
            loans: '/loans',
            filter: '/loans?status=Terlambat'
        }
    });
});

app.use('/loans', loanRoutes);

export default app;

// Menjalankan server lokal
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}