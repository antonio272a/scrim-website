import supabase from "../supabaseClient"

export const upsertLogo = async (table, logoImg, userId, teamName) => {
  try {
    const result = await supabase.storage
      .from(table)
      .upload(`${userId}/${teamName}.png`, logoImg, { upsert: true });
    console.log(result);
    } catch (e) {
    console.log(e);
  }
}

export const deleteLogo = async (userId, teamName) => {
  const path = `${userId}/${teamName}.png`;
  const data = await supabase.storage.from("team-logos").remove([path]);
  console.log(data);
  const { error } = data;
  return error;
};


export const changeLogoPath = async (ownerId, oldName, newName) => {
  await supabase.storage
    .from("team-logos")
    .move(`${ownerId}/${oldName}.png`, `${ownerId}/${newName}.png`);
}

export const getTeamLogo = async (ownerId, teamName) => {
  const result = await supabase.storage
    .from("team-logos")
    .download(`${ownerId}/${teamName}.png`);
  const { data } = result;
  if (!data) return;
  console.log(data);
  const { data: { publicURL } } = supabase.storage
    .from("team-logos")
    .getPublicUrl(`${ownerId}/${teamName}.png`);
  return publicURL;
}