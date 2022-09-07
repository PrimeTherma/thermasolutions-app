import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useReduxStore from "../../hooks/useReduxStore";
// Sheet JS 
const XLSX = require("xlsx");

// MUI Styling
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

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
    console.log('in deleteRow');

    dispatch({type: "DELETE_PROCEDURE", payload: event.target.value})
  }

  // Hides diagnostics table
  function hideDiagnostics() {
    console.log("in hideDiagnostics");

    // Hides diagnostics table
    setShow(false);
  }

  return !show ? (
    <div className="container">
      <div className="grid">
        <Button onClick={getDiagnostics}>Diagnostics</Button>
        <span><Button disabled={!store.user.access_level === 1} onClick={getAllHistory}>All Procedures</Button></span>
        <Button onClick={exportData} disabled={!store.user.access_level === 1}>Export Diagnostics ⤴</Button>
      </div>
      <div>
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
              <TableCell>Date/Time</TableCell>
              <TableCell>Total Time</TableCell>
              <TableCell>Total HTUs</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
              <TableCell>{store.procedure[0]?.date}</TableCell>
              <TableCell>{store.procedure[0]?.total_time}</TableCell>
              <TableCell>{store.procedure[0]?.total_htu}</TableCell>
              <TableCell>{ !showInput ? (
                      <>
                        <Button onClick={(event) => handleShowInput(event)}>{store.procedure[0]?.notes} ✏️</Button>
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
                          onClick={(event) => handleEditSubmit(event)}
                          value={store.procedure[0]?.id}
                        >
                          Set
                        </Button>
                      </>
                    )}</TableCell>
              <TableCell><Button onClick={deleteRow} value={store.procedure[0]?.id}>🗑</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  ) : (
    <>
      <Button onClick={hideDiagnostics}>Hide</Button>
      <Button onClick={exportData} disabled={!store.user.access_level === 1}>Export Diagnostics ⤴</Button>
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
              <TableCell>Interval Time</TableCell>
              <TableCell>Interval HTUs</TableCell>
              <TableCell>Avg Time</TableCell>
              <TableCell>T1</TableCell>
              <TableCell>T2</TableCell>
              <TableCell>T3</TableCell>
              <TableCell>T4</TableCell>
              <TableCell>T5</TableCell>
              <TableCell>T6</TableCell>
              <TableCell>T7</TableCell>
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
    </>
  );
}

export default HistoryPage;
