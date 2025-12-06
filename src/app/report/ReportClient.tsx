"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import ReportsContent from "@/components/reports/ReportsContent";
import { Report } from "@/types/database";
import { getAllReports } from "@/utils/reports";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

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
