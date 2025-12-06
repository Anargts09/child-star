"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import ReportsContent from "@/components/reports/ReportsContent";

interface ReportsClientPageProps {
  displayName?: string | null;
}

export default function ReportsClientPage({
  displayName,
}: ReportsClientPageProps) {
  return (
    <Dashboard displayName={displayName}>
      <ReportsContent />
    </Dashboard>
  );
}
