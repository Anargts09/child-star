"use client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Report } from "@/types/database";
import { useEffect, useState } from "react";
import { getAllReports } from "@/utils/reports";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export default function MainGrid() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        const res = await getAllReports();
        setData(res);
        setLoading(false);
        console.log(res);
      } catch (error) {
        console.error("error", error);
      }
    };
    loadReport();
  }, []);

  if (loading) {
    return <div>Уншиж байна. Хүр хүлээнэ үү...</div>;
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 1200 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Нийт мэдээлэл
            </Typography>
            <Typography variant="h3" component="div">
              {data?.length || 0}
            </Typography>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              mood_level
            </Typography>
            <Typography variant="h3" component="div">
              {"a"}
            </Typography>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Action Type
            </Typography>
            <Typography variant="h3" component="div">
              {"a"}
            </Typography>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              {}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent activity to display.
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
