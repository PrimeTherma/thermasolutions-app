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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { HowToReg } from "@mui/icons-material";

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
  const [open, setOpen] = React.useState(false);

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
    event.preventDefault();
    console.log('in showInput');

    setShowInput(true);
    setOpen(true);
  }

  // Edits notes for current procedure
  const handleEditSubmit = (event) => {
    event.preventDefault();
    console.log('in handleEditSubmit');
    
    dispatch({type: "EDIT_NOTES", payload: {notes: noteInput, id: store.procedure[0]?.id}});

    setShowInput(false);
    setOpen(false);
    dispatch({ type: "FETCH_PROCEDURE" });
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
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
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
            color="secondary"
            onClick={getDiagnostics}
          >
            Diagnostics
            </Button>
            </Tooltip>
          {store.user.access_level !== 1 ? (
            <></>
          ) : (
            <>
              <span>
              <Tooltip title="All Procedures" >
                <Button 
                  sx={{m: 1}}
                  variant="contained" 
                  disabled={store.user.access_level !== 1} onClick={getAllHistory}
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
                onClick={exportData} disabled={store.user.access_level !== 1}
              >
                Export to Excel
              </Button>
              </Tooltip>
            </>
          )}
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
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
              <StyledTableCell>{store.procedure[0]?.to_char}</StyledTableCell>
              <StyledTableCell>{store.procedure[0]?.total_time}</StyledTableCell>
              <StyledTableCell>{store.procedure[0]?.total_htu}</StyledTableCell>
              <StyledTableCell>{store.procedure[0]?.notes}</StyledTableCell>
              <TableCell>{ !showInput ? (
                      <>
                        <Tooltip title="Take Notes" >
                          <Button variant="contained" onClick={(event) => handleShowInput(event)}>
                            <EditIcon />
                          </Button>
                        </Tooltip>
                      </>
                    ) : (
                      <Dialog 
                        open={open} onClose={(event) => handleEditSubmit(event)}
                      >
                        <DialogTitle> Add Notes</DialogTitle>
                        <DialogContent>
                            <TextField
                            color="secondary"
                            id="outlined-multiline-flexible"
                            multiline
                            minRows={4}
                            onChange={(event) => setNoteInput(event.target.value)}
                            placeholder='update notes'
                            fullWidth
                            value={noteInput} // important
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button  
                            variant="contained"
                            type='submit'
                            onClick={handleEditSubmit}>Submit
                            </Button>
                        </DialogActions>
                      </Dialog>   
                    )}</TableCell>
              <TableCell>
              <Tooltip title="Delete Procedure" >
                <Button variant="contained" color="warning" onClick={deleteRow} value={store.procedure[0]?.id}>
                  Delete
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
        {store.user.access_level !== 1 ? (
            <></>
          ) : (
            <>
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
            </>
          )}
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
                <StyledTableCell scope="row">{diagnostic.interval_time}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.interval_htu}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.avg_temp}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t1}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t2}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t3}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t4}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t5}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t6}</StyledTableCell>
                <StyledTableCell scope="row">{diagnostic.t7}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryPage;
