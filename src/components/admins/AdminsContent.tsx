"use client";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

export default function AdminsContent() {
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, p: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Байгууллага</TableCell>
              <TableCell align="right">Хэрэглэгчийн нэр</TableCell>
              <TableCell align="right">Холбогдох утас</TableCell>
              <TableCell align="right">Имэйл</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {data &&
              data.map((row) => (
                <TableRow
                  key={12}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">a</TableCell>
                  <TableCell align="right">a</TableCell>
                  <TableCell align="right">a</TableCell>
                  <TableCell align="right">a</TableCell>
                </TableRow>
              ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Box>
  );
}
