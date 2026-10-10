import { supabase } from '../config/supabaseClient.js';

export async function getDashboard() {
    const today = new Date().toISOString().slice(0, 10);

    const [books, members, loans] = await Promise.all([
        supabase.from('books').select('id, total_stock'),
        supabase.from('members').select('id', { count: 'exact', head: true }),
        supabase.from('loans').select('id, status, due_date, return_date')
    ]);

    if (books.error) throw books.error;
    if (members.error) throw members.error;
    if (loans.error) throw loans.error;

    const allBooks = books.data || [];
    const allLoans = loans.data || [];

    return {
        total_titles: allBooks.length,
        available_copies: allBooks.reduce(
            (sum, book) => sum + book.total_stock, 0
        ),
        total_members: members.count || 0,
        active_loans: allLoans.filter(
            (loan) => loan.status === 'Dipinjam' ||
                loan.status === 'Terlambat'
        ).length,
        overdue_loans: allLoans.filter(
            (loan) => loan.status === 'Terlambat' ||
                (loan.status === 'Dipinjam' && loan.due_date < today)
        ).length,
        returned_loans: allLoans.filter(
            (loan) => loan.status === 'Dikembalikan'
        ).length
    };
}