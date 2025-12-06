"use client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Report } from "@/types/database";
import { useEffect, useState } from "react";
import { getAllReports } from "@/utils/reports";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState<"day" | "week" | "month" | "all">("all");

  const filterByDate = (items: Report[]) => {
    const now = new Date();

    if (filter === "day") {
      return items.filter((item) => {
        const d = new Date(item.created_at);
        return (
          d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth() &&
          d.getDate() === now.getDate()
        );
      });
    }

    if (filter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return items.filter((item) => new Date(item.created_at) >= weekAgo);
    }

    if (filter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      return items.filter((item) => new Date(item.created_at) >= monthAgo);
    }

    return items;
  };

  useEffect(() => {
    const loadReport = async () => {
      try {
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
  const filteredData = filterByDate(data);

  const Boy = filteredData.filter((item) => item.gender === "Эрэгтэй").length;
  const Girl = filteredData.filter((item) => item.gender === "Эмэгтэй").length;

  const levelCounts = [1, 2, 3, 4, 5].map(
    (level) => filteredData.filter((item) => item.mood_level === level).length
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 1200 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, v) => v && setFilter(v)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="day">1 өдөр</ToggleButton>
          <ToggleButton value="week">7 хоног</ToggleButton>
          <ToggleButton value="month">1 сар</ToggleButton>
          <ToggleButton value="all">Бүгд</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="h6" gutterBottom>
          {filteredData?.length || 0} мэдээлэл
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Хүйсийн харьцаа
            </Typography>
            <PieChart
              height={200}
              width={200}
              attributeName="value"
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: Boy,
                      label: `Эрэгтэй ${(
                        (Boy / filteredData.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                    {
                      id: 1,
                      value: Girl,
                      label: `Эмэгтэй ${(
                        (Girl / filteredData.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                  ],
                },
              ]}
            />
          </Item>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Үйлдлийн хэлбэр
            </Typography>
            <Typography variant="h3" component="div">
              <PieChart
                height={200}
                width={200}
                attributeName="value"
                showToolbar={true}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: filteredData.filter(
                          (item) => item.action_type === "Цахим"
                        ).length,
                        label: `Цахим ${(
                          (data.filter((item) => item.action_type === "Цахим")
                            .length /
                            filteredData.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                      {
                        id: 1,
                        value: filteredData.filter(
                          (item) => item.action_type === "Үгээр"
                        ).length,
                        label: `Үгээр ${(
                          (filteredData.filter(
                            (item) => item.action_type === "Үгээр"
                          ).length /
                            filteredData.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                      {
                        id: 2,
                        value: filteredData.filter(
                          (item) => item.action_type === "Сэтгэл зүйн"
                        ).length,
                        label: `Сэтгэл зүйн ${(
                          (filteredData.filter(
                            (item) => item.action_type === "Сэтгэл зүйн"
                          ).length /
                            filteredData.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                      {
                        id: 3,
                        value: filteredData.filter(
                          (item) => item.action_type === "Бие махбод"
                        ).length,
                        label: `Бие махбод ${(
                          (filteredData.filter(
                            (item) => item.action_type === "Бие махбод"
                          ).length /
                            filteredData.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                    ],
                  },
                ]}
              />
            </Typography>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Байршил
            </Typography>
            <PieChart
              attributeName="value"
              showToolbar={true}
              height={200}
              width={200}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: filteredData.filter(
                        (item) => item.location === "school"
                      ).length,
                      label: `Сургууль ${(
                        (filteredData.filter(
                          (item) => item.location === "school"
                        ).length /
                          filteredData.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                    {
                      id: 1,
                      value: filteredData.filter(
                        (item) => item.location === "public"
                      ).length,
                      label: `Олон нийтийн газар ${(
                        (filteredData.filter(
                          (item) => item.location === "public"
                        ).length /
                          filteredData.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                    {
                      id: 2,
                      value: filteredData.filter(
                        (item) => item.location === "Гэр бүл"
                      ).length,
                      label: `Гэрт ${(
                        (filteredData.filter(
                          (item) => item.location === "Гэр бүл"
                        ).length /
                          filteredData.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                  ],
                },
              ]}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Item>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Сэтгэл зүйн түвшин
            </Typography>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: ["1", "2", "3", "4", "5"],
                },
              ]}
              series={[
                {
                  data: levelCounts,
                },
              ]}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
