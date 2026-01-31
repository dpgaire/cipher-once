import { createClient } from "@/lib/supabase/server";
import { GlobalStatsResponse } from "@/lib/types/analytics";

export type DeviceAnalytics = {
    devices: { device: string; count: number }[];
    browsers: { browser: string; count: number }[];
    operating_systems: { os: string; count: number }[];
}

export type EngagementStatsResponse = {
    page_views: { date: string; count: number }[];
    secret_creations: { date: string; count: number }[];
    new_users: { date: string; count: number }[];
}

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

export async function getDeviceAnalytics(): Promise<DeviceAnalytics> {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_device_analytics');

    if (error) {
        console.error('Error fetching device analytics:', error);
        throw new Error('Could not fetch device analytics.');
    }

    if (data.error) {
        throw new Error(data.error);
    }
    
    return data;
}

export async function getEngagementOverTimeStats(daysToTrack: number = 30): Promise<EngagementStatsResponse> {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_engagement_over_time_stats', { days_to_track: daysToTrack });

    if (error) {
        console.error('Error fetching engagement stats:', error);
        throw new Error('Could not fetch engagement stats.');
    }

    if (data.error) { // Check for permission error from RPC
        throw new Error(data.error);
    }

    return data;
}