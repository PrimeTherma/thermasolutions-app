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
import Input from "@mui/material/Input";

function HistoryPage() {
  const store = useReduxStore();
  const dispatch = useDispatch();

  // states
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  // Gets diagnostics
  const getDiagnostics = () => {
    console.log("in getDiagnostics");

    // Shows diagnostics table
    setShow(true);

    dispatch({ type: "FETCH_DIAGNOSTICS" });
  };

  const handleShowInput = (event) => {
    console.log('in showInput');

    setShowInput(true);
  }

  const handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');

  }

  const handleDelete = (event) => {
    console.log("in handleDelete, this is event.target.value", event.target.value);

    dispatch({type: "DELETE_DIAGNOSTIC", payload: event.target.value})
  }

  const deleteAll = () => {
    console.log("in deleteAll");

    dispatch({type: "DELETE_ALL"});
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Total HTUs</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell><Button>Export ⤴</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{ !showInput ? (
                      <>
                        <Button onClick={(event) => handleShowInput(event)}>✏️</Button>
                      </>
                    ) : (
                      <>
                        <Input
                          sx={{ width: 40, padding: 1 }}
                          type="text"
                          onChange={(event) =>
                            noteInput(event.target.value)
                          }
                        />
                        <Button
                          onClick={(event) => handleEditSubmit(event)}
                        >
                          Set
                        </Button>
                      </>
                    )}</TableCell>
              <TableCell><Button>🗑</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
              <TableCell><Button onClick={deleteAll}>DELETE ALL</Button></TableCell>
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
