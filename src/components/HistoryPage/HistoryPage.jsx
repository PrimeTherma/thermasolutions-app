import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useReduxStore from "../../hooks/useReduxStore";
import "./HistoryPage.css";
// Sheet JS 
const XLSX = require("xlsx");

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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';

function HistoryPage() {
  const store = useReduxStore();
  const dispatch = useDispatch();
  const history = useHistory();

  // Gets procedure on page load
  // Moved "FETCH_DIAGNOSTICS to the useEffect so its easier to export data on button click"
  useEffect(() => {
    dispatch({ type: "FETCH_PROCEDURE" });
    dispatch({ type: "FETCH_DIAGNOSTICS" });
  }, []);

  // states
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  // Gets diagnostics
  const getDiagnostics = () => {
    console.log("in getDiagnostics");

    // Shows diagnostics table
    setShow(true);

  };

  // Directs to all procedures - admin function only
  const getAllHistory = () => {
    console.log('in getAllHistory');

    history.push('/admin')
  }

  // Shows text input for edit function
  const handleShowInput = (event) => {
    console.log('in showInput');

    setShowInput(true);
  }

  // Edits notes for current procedure
  const handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');
    
    dispatch({type: "EDIT_NOTES", payload: {notes: noteInput, id: event.target.value}});

    setShowInput(false);
  }
  // Export Diagnostic Data
  const exportData = () => {
    console.log('attempting to export to excel file');
    const workbook = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(store.diagnostics);
    XLSX.utils.book_append_sheet(workbook, ws, "Procedures");
    XLSX.writeFile(workbook, "ProcedureDiagnostics.xlsx");
  }

  const deleteRow = (event) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to undo this action!",
      // icon: 'warning',
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
              showCancelButton: true,  
  }).then((result) => {
      if (result.isConfirmed) {
          dispatch({type: "DELETE_PROCEDURE", payload: event.target.value});
      } 
  });
    
  }

  // Hides diagnostics table
  function hideDiagnostics() {
    console.log("in hideDiagnostics");

    // Hides diagnostics table
    setShow(false);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return !show ? (
    <div className="container">
      <div className="grid">
        <div className="historyButtons">
          <Tooltip title="View Diagnostics" >
          <Button 
            sx={{m: 1}}
            variant="contained" 
            color="error"
            onClick={getDiagnostics}
          >
            Diagnostics
            </Button>
            </Tooltip>
          <span>
          <Tooltip title="All Procedures" >
            <Button 
              sx={{m: 1}}
              variant="contained" 
              disabled={!store.user.access_level === 1} onClick={getAllHistory}
            >
              All Procedures
            </Button>
            </Tooltip>
          </span>
          <Tooltip title="Export As Spreadsheet" >
          <Button 
            sx={{m: 1}}
            variant="contained" 
            color="success"
            onClick={exportData} disabled={!store.user.access_level === 1}
          >
            Export to Excel
          </Button>
          </Tooltip>
        </div>
      </div>
      <div>
      <div className="header">
        <Typography align="center" variant="h4" color="lightgrey">CURRENT PROCEDURE</Typography>
      </div>
      <TableContainer
        sx={{
          width: "85%",
          overflow: "hidden",
          overflowY: "scroll",
          margin: "auto",
        }}
        component={Paper}
      >
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
              <TableRow>
              <TableCell>{store.procedure[0]?.to_char}</TableCell>
              <TableCell>{store.procedure[0]?.total_time}</TableCell>
              <TableCell>{store.procedure[0]?.total_htu}</TableCell>
              <TableCell>{ !showInput ? (
                      <>
                      <Tooltip title="Take Notes" >
                        <Button variant="contained" onClick={(event) => handleShowInput(event)}>{store.procedure[0]?.notes}
                          <EditIcon />
                        </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Input
                          sx={{ width: 80, padding: 1 }}
                          type="text"
                          onChange={(event) =>
                            setNoteInput(event.target.value)
                          }
                        />
                        <Button
                          variant="contained"
                          onClick={(event) => handleEditSubmit(event)}
                          value={store.procedure[0]?.id}
                        >
                          Submit
                        </Button>
                      </>
                    )}</TableCell>
              <TableCell>
              <Tooltip title="Delete Procedure" >
                <Button variant="contained" color="warning" onClick={deleteRow} value={store.procedure[0]?.id}>
                  <DeleteForeverIcon />
                </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  ) : (
    <div>
      <div className="diagnosticsButtons">
        <Button 
          sx={{m: 1}}
          variant="contained" 
          onClick={hideDiagnostics}
          >Go Back
        </Button>
        <Tooltip title="Export As Spreadsheet" >
        <Button 
          sx={{m: 1}}
          color="success"
          variant="contained" 
          onClick={exportData} disabled={!store.user.access_level === 1}
        >
          Export to Excel
        </Button>
        </Tooltip>
      </div>
      <div className="header">
        <Typography align="center" variant="h4" color="lightgrey">DIAGNOSTICS HISTORY</Typography>
      </div>
      <TableContainer
        sx={{
          height: 500,
          width: "85%",
          overflow: "hidden",
          overflowY: "scroll",
          margin: "auto",
        }}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Interval Time</StyledTableCell>
              <StyledTableCell>Interval HTUs</StyledTableCell>
              <StyledTableCell>Avg Time</StyledTableCell>
              <StyledTableCell>T1</StyledTableCell>
              <StyledTableCell>T2</StyledTableCell>
              <StyledTableCell>T3</StyledTableCell>
              <StyledTableCell>T4</StyledTableCell>
              <StyledTableCell>T5</StyledTableCell>
              <StyledTableCell>T6</StyledTableCell>
              <StyledTableCell>T7</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.diagnostics.map((diagnostic, i) => (
              <TableRow key={i}>
                <TableCell scope="row">{diagnostic.interval_time}</TableCell>
                <TableCell scope="row">{diagnostic.interval_htu}</TableCell>
                <TableCell scope="row">{diagnostic.avg_temp}</TableCell>
                <TableCell scope="row">{diagnostic.t1}</TableCell>
                <TableCell scope="row">{diagnostic.t2}</TableCell>
                <TableCell scope="row">{diagnostic.t3}</TableCell>
                <TableCell scope="row">{diagnostic.t4}</TableCell>
                <TableCell scope="row">{diagnostic.t5}</TableCell>
                <TableCell scope="row">{diagnostic.t6}</TableCell>
                <TableCell scope="row">{diagnostic.t7}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryPage;
