"use client";

import AdminsContent from "@/components/admins/AdminsContent";
import Dashboard from "@/components/dashboard/Dashboard";

export const dynamic = "force-dynamic";
interface ArticlesClientPageProps {
  displayName?: string | null;
}

export default function AdminsClientPage({
  displayName,
}: ArticlesClientPageProps) {
  return (
    <Dashboard displayName={displayName}>
      <AdminsContent />
    </Dashboard>
  );
}
