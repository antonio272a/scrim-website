import supabase from "../supabaseClient"

export const getPlayerById = async (table, id) => {
    const { data, error } = await supabase.from(table).select().eq('id', id );
    if (error) return error;
    return data;
}

export const getPlayers = async (table) => {
    const { data, error } = await supabase.from(table).select();
    if(error) return error;
    return data;
}

export const createPlayer = async (table, body) => {
    const { data, error } = await supabase.from(table).insert([body]);
    if(error) return error;
    return data;
}

export const updatePlayer = async (table, id, body) => {
    const { data, error } = await supabase.from(table).update([body]).match({ id });
    if (error) return error;
    return data;
}

export const deletePlayer = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id })
    if (error) return error
    return data;
}

export const playerSubscribe = async (table, setVariable) => {
    try {
        supabase
            .from(table)
            .on('*', () => {
                        setVariable(true)
                    })
            .subscribe()
    } catch (error) {
        return error;
    }
}