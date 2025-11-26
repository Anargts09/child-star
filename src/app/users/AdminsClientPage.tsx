"use client";

import AdminsContent from "@/components/admins/AdminsContent";
import Dashboard from "@/components/dashboard/Dashboard";
import { Admin } from "@/types/database";
import { getAllAdmins } from "@/utils/admin";
import { useEffect, useState } from "react";

interface ArticlesClientPageProps {
  displayName?: string | null;
}

export default function AdminsClientPage({
  displayName,
}: ArticlesClientPageProps) {
  const [data, setData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("working");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllAdmins();
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error("error", error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dashboard displayName={displayName}>
      <AdminsContent />
    </Dashboard>
  );
}
