"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderProps {
  displayName?: string | null;
}

export default function Header({ displayName }: HeaderProps) {
  return (
    <Box sx={{ width: "100%", maxWidth: 1200 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Тавтай морил{displayName ? `, ${displayName}` : ""}!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Хяналтын самбар.
      </Typography>
    </Box>
  );
}
