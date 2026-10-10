import { supabase } from '../config/supabaseClient.js';

const TABLE = 'loans';

export const getAllLoans = async (status) => {
    let query = supabase
        .from(TABLE)
        .select('*')
        .order('id', { ascending: true });

    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

export const getLoanById = async (id) => {
    const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;
    return data;
};

export const createLoan = async (loan) => {
    const { data, error } = await supabase
        .from(TABLE)
        .insert([loan])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateLoan = async (id, loan) => {
    const { data, error } = await supabase
        .from(TABLE)
        .update(loan)
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
};

export const deleteLoan = async (id) => {
    const { data, error } = await supabase
        .from(TABLE)
        .delete()
        .eq('id', id)
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
};