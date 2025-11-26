"use client";

import * as React from "react";
import DashboardLayout from "./DashboardLayout";
import { Box } from "@mui/material";

interface DashboardProps {
  displayName?: string | null;
  children?: React.ReactNode;
}

export default function Dashboard({ displayName, children }: DashboardProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the same structure to avoid hydration mismatch
  return (
    <Box>
      <Box>
        {mounted ? (
          <DashboardLayout displayName={displayName}>
            {children}
          </DashboardLayout>
        ) : (
          <Box
            style={{
              display: "flex",
              width: "100%",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>Түр хүлээнэ үү</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
