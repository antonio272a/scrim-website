import supabase from "../supabaseClient";

export const getUserById = async (id) => {
  const data = await supabase.from('users').select()
  // const data = await supabase.auth.api.listUsers();
  console.log(data);
}