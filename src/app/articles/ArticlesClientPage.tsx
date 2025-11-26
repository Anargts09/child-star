"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import ArticlesContent from "@/components/articles/ArticlesContent";

interface ArticlesClientPageProps {
  displayName?: string | null;
}

export default function ArticlesClientPage({
  displayName,
}: ArticlesClientPageProps) {
  return (
    <Dashboard displayName={displayName}>
      <ArticlesContent />
    </Dashboard>
  );
}
