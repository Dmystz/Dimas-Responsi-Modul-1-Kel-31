import { supabase } from '../config/supabaseClient.js';

const table = 'loans';

export async function getLoans({ status, member_id, page, limit }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from(table)
        .select('*, members(name, email), books(title, author)', {
            count: 'exact'
        })
        .order('id', { ascending: false })
        .range(from, to);

    if (member_id) query = query.eq('member_id', member_id);

    if (status) {
        if (status === 'Terlambat') {
            // Status terlambat mencakup status tersimpan maupun
            // transaksi aktif yang sudah melewati due_date.
            const today = new Date().toISOString().slice(0, 10);
            query = query.or(
                `status.eq.Terlambat,and(status.eq.Dipinjam,due_date.lt.${today})`
            );
        } else {
            query = query.eq('status', status);
        }
    }

    const { data, error, count } = await query;
    if (error) throw error;

    const normalized = (data || []).map((loan) => {
        if (
            loan.status === 'Dipinjam' &&
            loan.due_date < new Date().toISOString().slice(0, 10)
        ) {
            return { ...loan, status: 'Terlambat' };
        }
        return loan;
    });

    return { data: normalized, total: count };
}

export async function getLoanById(id) {
    const { data, error } = await supabase
        .from(table)
        .select('*, members(name, email), books(title, author)')
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function createLoan(loan) {
    // Gunakan fungsi database untuk memeriksa stok dan membuat
    // transaksi secara atomik.
    const { data, error } = await supabase.rpc('borrow_book', {
        p_member_id: loan.member_id,
        p_book_id: loan.book_id,
        p_due_date: loan.due_date
    });

    if (error) throw error;

    return getLoanById(data);
}

export async function updateLoan(id, loan) {
    const { data, error } = await supabase
        .from(table)
        .update(loan)
        .eq('id', id)
        .eq('status', 'Dipinjam')
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function returnLoan(id) {
    const { data, error } = await supabase.rpc('return_book', {
        p_loan_id: Number(id)
    });

    if (error) throw error;

    return getLoanById(data);
}

export async function deleteLoan(id) {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
        .eq('status', 'Dikembalikan')
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
}