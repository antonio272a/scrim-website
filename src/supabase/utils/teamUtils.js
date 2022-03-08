import supabase from "../supabaseClient";

export const insertTeam = async (table, body, handleDuplicateError) => {
  try {
    const { error, data } = await supabase.from(table).upsert([body]);
    if (error) {
      if (error.code === "23505") {
        handleDuplicateError(error);
        return;
      }
    }
    return data[0].id;
  } catch (e) {
    console.log(e);
  }
};

export const updateTeam = async (id, table, body, handleDuplicateError) => {
  try {
    const { error, data } = await supabase.from(table).update([body]).match({ id });
    if (error) {
      if (error.code === "23505") {
        handleDuplicateError(error);
        return;
      }
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllTeams = async (table) => {
  try {
    const { data } = await supabase.from(table).select(); 
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTeamById = async (id, table) => {
  try {
    const { data } = await supabase
      .from(table)
      .select()
      .eq("id", id);
    if (!data) return;
    
    return data[0];
  } catch (e) {
    console.log(e);
  }
}

export const deleteTeam = async (table, teamId) => {
  await supabase.from(table).delete().match({id: teamId});
}

export const getAllRecruitingTeams = async (table) => {
  const { data } = await supabase.from(table).select().eq('is_recruiting', true);
  return data;
}

export const getUserTeams = async (table, userId) => {
  const { data } = await supabase.from(table).select().eq('owner_id', userId);
  return data;
}