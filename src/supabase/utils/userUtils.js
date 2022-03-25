import supabase from "../supabaseClient";

export const getUserById = async (id) => {
  const { data } = await supabase.from('users').select().eq('id', id);
  return data[0].user_data;
}

export const getUserContacts = async (userId) => {
  const { data } = await supabase.from('users_contacts').select().eq('user_id', userId);
  return data[0];
}