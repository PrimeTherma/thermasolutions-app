import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";
import { useHistory } from "react-router-dom";
import "./AdminPage.css";

// MUI Styling
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';


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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));

  return (
    <div>
      <div className="adminButton">
        <Button 
          sx={{m: 1}}
          variant="contained" 
          onClick={handleGoBackBtn}
          >
          Go Back
        </Button>
      </div>
      <div className="header">
        <Typography align="center" variant="h4" color="lightgrey">DIAGNOSTICS HISTORY</Typography>
      </div>
      <TableContainer sx={{ height: 500, width: "85%", margin: "auto" }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Total Time</StyledTableCell>
              <StyledTableCell>Total HTUs</StyledTableCell>
              <StyledTableCell>Notes</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.allProcedures.map((allProcedure, i) => (
              <TableRow key={i}>
                <StyledTableCell>{allProcedure?.to_char}</StyledTableCell>
                <StyledTableCell>{allProcedure?.total_time}</StyledTableCell>
                <StyledTableCell>{allProcedure?.total_htu}</StyledTableCell>
                <StyledTableCell>{allProcedure?.notes}</StyledTableCell>
                <TableCell>
                  <Tooltip title="Delete">
                  <Button variant="contained" color="warning" onClick={deleteRow} value={store.procedure[0]?.id}>
                  <DeleteForeverIcon />
                  </Button>
                  </Tooltip>
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
