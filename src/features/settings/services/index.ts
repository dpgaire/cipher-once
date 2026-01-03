import { createClient } from "@/lib/supabase/client";
import type { Settings } from "../types";

const supabase = createClient();

export async function getSettings(userId: string): Promise<Partial<Settings> | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("default_settings")
        .eq("id", userId)
        .single();
    
    if (error) {
        console.error("Error fetching settings:", error);
        return null;
    }

    return data?.default_settings as Partial<Settings> | null;
}

export async function saveSettings(userId: string, settings: Settings): Promise<{ error: Error | null }> {
    const { error } = await supabase
        .from("profiles")
        .update({ default_settings: settings })
        .eq("id", userId);
    
    return { error: error ? new Error(error.message) : null };
}
