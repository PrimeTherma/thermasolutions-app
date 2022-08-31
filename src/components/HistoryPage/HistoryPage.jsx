import React, { useState } from "react";
import { useDispatch } from "react-redux";

function HistoryPage() {

  const dispatch = useDispatch();

  // state for return - ternary
  const [show, setShow] = useState(false);

  // Gets diagnostics
  const getDiagnostics = () =>  {
    console.log('in getDiagnostics');

    // Shows diagnostics table
    setShow(true);

    dispatch({type: "FETCH_DIAGNOSTICS"});
  }

  const hideDiagnostics = () => {
    console.log('in hideDiagnostics');

    // Hides diagnostics table
    setShow(false);
  }

  return !show ? (
    <div className="container">
      <div className="grid">
        <button onClick={getDiagnostics}>Diagnostics</button>
      </div>
    </div>
  ) : (
    <>
      <button onClick={hideDiagnostics}>Hide</button>
    </>
  );
}

export default HistoryPage;