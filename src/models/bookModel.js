import { supabase } from '../config/supabaseClient.js';

const table = 'books';

export async function getBooks({ search, category, page, limit }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from(table)
        .select('*', { count: 'exact' })
        .order('id', { ascending: true })
        .range(from, to);

    if (search) query = query.ilike('title', `%${search}%`);
    if (category) query = query.eq('category', category);

    const { data, error, count } = await query;
    if (error) throw error;

    return { data, total: count };
}

export async function getBookById(id) {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function createBook(book) {
    const { data, error } = await supabase
        .from(table)
        .insert(book)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateBook(id, book) {
    const { data, error } = await supabase
        .from(table)
        .update(book)
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function deleteBook(id) {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
}