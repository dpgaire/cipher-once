import { createClient } from "@/lib/supabase/server";
import { GlobalStatsResponse } from "@/lib/types/analytics";

export async function getPageViewStats() {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_page_view_stats');

    if (error) {
        console.error('Error fetching page view stats:', error);
        throw new Error('Could not fetch page view stats.');
    }

    return data;
}

export async function getGlobalStats(): Promise<GlobalStatsResponse | null> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_global_stats').single();

    if (error) {
        console.error('Error fetching global stats:', error);
        throw new Error('Could not fetch global stats.');
    }

    return data as GlobalStatsResponse | null;
}