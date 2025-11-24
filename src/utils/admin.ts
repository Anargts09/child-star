import { createClient } from "@/utils/supabase/server";
import { Admin, AdminUpdate } from "@/types/database";

/**
 * Get admin information for the current user
 */
export async function getCurrentAdmin(): Promise<Admin | null> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { data, error } = await supabase
		.from("admins")
		.select("*")
		.eq("id", user.id)
		.single();

	if (error) {
		console.error("Error fetching admin:", error);
		return null;
	}

	return data;
}

/**
 * Get admin information by ID
 */
export async function getAdminById(id: string): Promise<Admin | null> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("admins")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching admin:", error);
		return null;
	}

	return data;
}

/**
 * Get admin information by username
 */
export async function getAdminByUsername(
	username: string
): Promise<Admin | null> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("admins")
		.select("*")
		.eq("username", username)
		.single();

	if (error) {
		console.error("Error fetching admin:", error);
		return null;
	}

	return data;
}

/**
 * Update admin information
 */
export async function updateAdmin(
	id: string,
	updates: AdminUpdate
): Promise<Admin | null> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user || user.id !== id) {
		throw new Error("Unauthorized");
	}

	const { data, error } = await supabase
		.from("admins")
		// @ts-expect-error - Supabase type inference issue with update method
		.update(updates as unknown as AdminUpdate)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error("Error updating admin:", error);
		throw error;
	}

	return data;
}

/**
 * Get all admins (for admin users only)
 */
export async function getAllAdmins(): Promise<Admin[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("admins")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching admins:", error);
		return [];
	}

	return data || [];
}
