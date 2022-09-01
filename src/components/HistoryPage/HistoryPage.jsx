import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useReduxStore from "../../hooks/useReduxStore";

// MUI Styling
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function HistoryPage() {
  const store = useReduxStore();
  const dispatch = useDispatch();

  // state for return - ternary
  const [show, setShow] = useState(false);

  // Gets diagnostics
  const getDiagnostics = () => {
    console.log("in getDiagnostics");

    // Shows diagnostics table
    setShow(true);

    dispatch({ type: "FETCH_DIAGNOSTICS" });
  };

  const handleDelete = (event) => {
    console.log("in handleDelete, this is event.target.value", event.target.value);

    dispatch({type: "DELETE_DIAGNOSTIC", payload: event.target.value})
  }

  const hideDiagnostics = () => {
    console.log("in hideDiagnostics");

    // Hides diagnostics table
    setShow(false);
  };

  return !show ? (
    <div className="container">
      <div className="grid">
        <Button onClick={getDiagnostics}>Diagnostics</Button>
      </div>
    </div>
  ) : (
    <>
      <Button onClick={hideDiagnostics}>Hide</Button>
      <TableContainer
        sx={{
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
                <TableCell scope="row">{diagnostic.interval_time.hours} hrs. {diagnostic.interval_time.minutes} min.</TableCell>
                <TableCell scope="row">{diagnostic.interval_htu}</TableCell>
                <TableCell scope="row">{diagnostic.avg_temp}</TableCell>
                <TableCell scope="row">{diagnostic.t1}</TableCell>
                <TableCell scope="row">{diagnostic.t2}</TableCell>
                <TableCell scope="row">{diagnostic.t3}</TableCell>
                <TableCell scope="row">{diagnostic.t4}</TableCell>
                <TableCell scope="row">{diagnostic.t5}</TableCell>
                <TableCell scope="row">{diagnostic.t6}</TableCell>
                <TableCell scope="row">{diagnostic.t7}</TableCell>  
                <TableCell scope="row">
                  <Button onClick={(event) => handleDelete(event)} value={diagnostic.procedure_id}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default HistoryPage;
