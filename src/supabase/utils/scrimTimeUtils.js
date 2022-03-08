import supabase from "../supabaseClient"

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const deleteScrimFromTeam = async (table, teamId) => {
  await supabase.from(table).delete().match({team_id: Number(teamId)});
}

export const getScrimFromTeam = async (table, teamId) => {
  const { data } = await supabase.from(table).select().eq("team_id", teamId);
  if (!data || !data.length) return;
  return data[0];
}

export const upsertScrim = async (table, body) => {
  return await supabase.from(table).upsert([body], {onConflict: 'team_id'});
}

export const getAllTeamsWithScrim = async (table) => {
  const { data } = await supabase
    .from(table)
    .select(`id, name, owner_id, ${table}_scrims!inner(${days})`).order('id');
  return data
}