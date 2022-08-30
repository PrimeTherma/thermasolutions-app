import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


function StartProcedurePage() {
  const dispatch = useDispatch();


  const startProcedure = (event) => {
    event.preventDefault();
    dispatch({
      // no payload since we only need user.id and can get that directly from the passport. 
      type: 'ADD_NEW_PROCEDURE'
    })
  }

  return (
    <div className="container">
      <div className="grid">
        <button onClick={startProcedure}>Start Procedure</button>
      </div>
    </div>
  );
}

export default StartProcedurePage;
