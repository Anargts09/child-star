import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Report } from "@/types/database";
import { useEffect, useState } from "react";
import { getAllReports } from "@/utils/reports";
import { formatedDate } from "@/lib/formatedDate";

const ReportsContent = () => {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(0); // 0-based
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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
              <TableCell align="left">Огноо</TableCell>
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
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id ?? index}>
                    <TableCell align="left">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="left">
                      {formatedDate(row.created_at)}
                    </TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.age}</TableCell>
                    <TableCell align="left">{row.mood_level}</TableCell>
                    <TableCell align="left">{row.action_type}</TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Хуудас бүрт:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from} - ${to} | Нийт: ${count}`
          }
        />
      </TableContainer>
    </Box>
  );
};

export default ReportsContent;
