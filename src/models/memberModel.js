import { supabase } from '../config/supabaseClient.js';

const table = 'members';

export async function getMembers() {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('id');

    if (error) throw error;
    return data;
}

export async function getMemberById(id) {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function createMember(member) {
    const { data, error } = await supabase
        .from(table)
        .insert(member)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getMemberLoans(id) {
    const { data, error } = await supabase
        .from('loans')
        .select('*, books(title, author)')
        .eq('member_id', id)
        .order('id', { ascending: false });

    if (error) throw error;
    return data;
}