import supabase from "../supabaseClient"

export const deleteScrimFromTeam = async (table, teamId) => {
  await supabase.from(table).delete().match({team_id: Number(teamId)});
}

export const getScrimFromTeam = async (table, teamId) => {
  const { data } = await supabase.from(table).select().eq("team_id", teamId);
  if (!data || !data.length) return;
  return data[0];
}