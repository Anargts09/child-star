import { Report } from "@/types/database";
import { createClient } from "@/utils/supabase/client";

/**
 * Get all admins (for admin users only)
 */
export async function getAllReports(): Promise<Report[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admins:", error);
    return [];
  }

  return data || [];
}
