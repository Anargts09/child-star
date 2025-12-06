import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Report } from "@/types/database";
import { useEffect, useState } from "react";
import { getAllReports } from "@/utils/reports";

const ReportsContent = () => {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getAllReports();
        setData(res);
        setLoading(false);
      } catch (error) {
        console.error("error", error);

        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

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
    <Box sx={{ width: "100%", maxWidth: 1200, p: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="left">Хүйс</TableCell>
              <TableCell align="left">Нас</TableCell>
              <TableCell align="left">Мэдрэмжийн түвшин</TableCell>
              <TableCell align="left">Үйлдэлийн хэлбэр</TableCell>
              <TableCell align="left">Байршил</TableCell>
              <TableCell align="left">Хэн болох</TableCell>
              <TableCell align="left">Утас</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{row?.gender}</TableCell>
                  <TableCell align="left">{row?.age}</TableCell>
                  <TableCell align="left">{row?.mood_level}</TableCell>
                  <TableCell align="left">{row?.action_type}</TableCell>
                  <TableCell align="left">{row?.location}</TableCell>
                  <TableCell align="left">{row?.role}</TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportsContent;
