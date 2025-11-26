import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminsClientPage from "./AdminsClientPage";
import { getCurrentAdmin } from "@/utils/admin";

export default async function AdminsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = await getCurrentAdmin();
  return <AdminsClientPage displayName={admin?.display_name || null} />;
}
