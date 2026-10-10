import 'dotenv/config';
import express from 'express';

import bookRoutes from './routes/bookRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'LibraryHub API',
        version: '1.0.0',
        endpoints: {
            books: '/books',
            members: '/members',
            loans: '/loans',
            dashboard: '/dashboard',
            overdue: '/loans?status=Terlambat'
        }
    });
});

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/loans', loanRoutes);
app.use('/dashboard', dashboardRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint tidak ditemukan',
        path: req.originalUrl
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: 'Terjadi kesalahan pada server'
    });
});

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`LibraryHub API berjalan di http://localhost:${port}`);
    });
}

export default app;