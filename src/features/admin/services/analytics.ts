import { createClient } from "@/lib/supabase/server";

export async function getPageViewStats() {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_page_view_stats');

    if (error) {
        console.error('Error fetching page view stats:', error);
        // Depending on how you want to handle errors, you could throw or return a specific error object
        throw new Error('Could not fetch page view stats.');
    }

    return data;
}