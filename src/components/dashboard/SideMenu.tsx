"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

interface SideMenuProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function SideMenu({ mobileOpen, onMobileClose }: SideMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  React.useEffect(() => {
    setIsMobile(matches);
  }, [matches]);

  const menuItems = [
    { text: "Хяналтын самбар", icon: <DashboardIcon />, path: "/" },
    { text: "Мэдэгдэл", icon: <PeopleIcon />, path: "/report" },
    { text: "Мэдээ, зөвлөгөө", icon: <ArticleIcon />, path: "/articles" },
    { text: "Хэрэглэгчид", icon: <PeopleIcon />, path: "/admins" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      onMobileClose();
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={onMobileClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}
