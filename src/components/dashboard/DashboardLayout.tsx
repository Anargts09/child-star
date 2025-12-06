"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./AppNavbar";
import MainGrid from "./MainGrid";
import SideMenu from "./SideMenu";
import Toolbar from "@mui/material/Toolbar";

interface DashboardLayoutProps {
  displayName?: string | null;
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div suppressHydrationWarning>
      <Box sx={{ display: "flex" }}>
        <SideMenu mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
        <AppNavbar onMenuClick={handleDrawerToggle} />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Toolbar />
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {children || (
              <Box sx={{ width: "100%", maxWidth: 1200, p: 3 }}>
                <MainGrid />
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
