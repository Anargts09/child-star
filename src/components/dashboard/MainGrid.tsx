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

  const Boy = data.filter((item) => item.gender === "Эрэгтэй").length;
  const Girl = data.filter((item) => item.gender === "Эмэгтэй").length;

  const levelCounts = [1, 2, 3, 4, 5].map(
    (level) => data.filter((item) => item.mood_level === level).length
  );

  if (loading) {
    return <div>Уншиж байна. Хүр хүлээнэ үү...</div>;
  }
  return (
    <Box sx={{ width: "100%", maxWidth: 1200 }}>
      <Typography variant="h6" gutterBottom>
        Нийт мэдээлэл {data?.length || 0}
      </Typography>
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
                      label: `Эрэгтэй ${((Boy / data.length) * 100).toFixed(
                        1
                      )}%`,
                    },
                    {
                      id: 1,
                      value: Girl,
                      label: `Эмэгтэй ${((Girl / data.length) * 100).toFixed(
                        1
                      )}%`,
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
                        value: data.filter(
                          (item) => item.action_type === "Цахим"
                        ).length,
                        label: `Цахим ${(
                          (data.filter((item) => item.action_type === "Цахим")
                            .length /
                            data.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                      {
                        id: 1,
                        value: data.filter(
                          (item) => item.action_type === "Үгээр"
                        ).length,
                        label: `Үгээр ${(
                          (data.filter((item) => item.action_type === "Үгээр")
                            .length /
                            data.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                      {
                        id: 2,
                        value: data.filter(
                          (item) => item.action_type === "Сэтгэл зүйн"
                        ).length,
                        label: `Сэтгэл зүйн ${(
                          (data.filter(
                            (item) => item.action_type === "Сэтгэл зүйн"
                          ).length /
                            data.length) *
                          100
                        ).toFixed(1)}%`,
                      },
                      {
                        id: 3,
                        value: data.filter(
                          (item) => item.action_type === "Бие махбод"
                        ).length,
                        label: `Бие махбод ${(
                          (data.filter(
                            (item) => item.action_type === "Бие махбод"
                          ).length /
                            data.length) *
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
                      value: data.filter((item) => item.location === "school")
                        .length,
                      label: `Сургууль ${(
                        (data.filter((item) => item.location === "school")
                          .length /
                          data.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                    {
                      id: 1,
                      value: data.filter((item) => item.location === "public")
                        .length,
                      label: `Олон нийтийн газар ${(
                        (data.filter((item) => item.location === "public")
                          .length /
                          data.length) *
                        100
                      ).toFixed(1)}%`,
                    },
                    {
                      id: 2,
                      value: data.filter((item) => item.location === "Гэр бүл")
                        .length,
                      label: `Гэрт ${(
                        (data.filter((item) => item.location === "Гэр бүл")
                          .length /
                          data.length) *
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
