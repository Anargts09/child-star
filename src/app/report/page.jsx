import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getCurrentAdmin } from "@/utils/admin";
import ReportsClientPage from "./ReportClient";

export default async function ReportPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = await getCurrentAdmin();

  return <ReportsClientPage displayName={admin?.display_name || null} />;
}
