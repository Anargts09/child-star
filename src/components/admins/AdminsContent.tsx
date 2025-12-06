"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress } from "@mui/material";
import { Admin } from "@/types/database";
import { useEffect, useState } from "react";
import { getAllAdmins } from "@/utils/admin";

export default function AdminsContent() {
  const [data, setData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
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
              <TableCell align="left">Хэрэглэгчийн нэр</TableCell>
              <TableCell align="left">Холбогдох утас</TableCell>
              <TableCell align="left">Имэйл</TableCell>
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
                  <TableCell align="left">{row?.username}</TableCell>
                  <TableCell align="left">{row?.phonenumber}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
