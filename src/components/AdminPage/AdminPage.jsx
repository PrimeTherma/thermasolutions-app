import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";
import { useHistory } from "react-router-dom";

// MUI Styling
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function AdminPage() {
  const store = useReduxStore();
  const dispatch = useDispatch();
  const history = useHistory();

  // Gets procedure on page load
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_HISTORY" });
  }, []);

  const handleGoBackBtn = () => {
    console.log('in handleGoBackBtn');

    history.push('/history')    
  }

  const deleteRow = (event) => {
    console.log('in deleteRow');

    dispatch({type: "DELETE_PROCEDURE", payload: event.target.value})
  }

  return (
    <div>
      <Button onClick={handleGoBackBtn}>Go Back</Button>
      <TableContainer sx={{ height: 500, width: "85%", margin: "auto" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Total Time</TableCell>
              <TableCell>Total HTUs</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.allProcedures.map((allProcedure, i) => (
              <TableRow key={i}>
                <TableCell>{allProcedure?.date}</TableCell>
                <TableCell>{allProcedure?.total_time}</TableCell>
                <TableCell>{allProcedure?.total_htu}</TableCell>
                <TableCell>{allProcedure?.notes}</TableCell>
                <TableCell>
                  <Button onClick={deleteRow} value={store.procedure[0]?.id}>🗑</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminPage;
