import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';

function StartProcedurePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const deviceDiagnostics = useSelector((store) => store.deviceDiagnostics);

  const startProcedure = (event) => {
    event.preventDefault();
    dispatch({
      // no payload since we only need user.id and can get that directly from the passport. 
      type: 'ADD_NEW_PROCEDURE'
    })

    getLastDiagnostics();

    history.push('/chart');

  }

  // refactored POST to procedure page
  useEffect(()=>{
    dispatch({type: 'FETCH_DEVICE_DIAGNOSTICS' });
    
  },[]);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  // POSTs every 20 secs from button click of 'Start Procedure'
  const getLastDiagnostics = async () => {
    console.log('Start Post');
    for (let i=0; i<deviceDiagnostics.length; i++) {
        dispatch({type: 'POST_DIAGNOSTICS', payload: deviceDiagnostics[i]})
        await sleep (250) // if changing post interval, change all await intervals to be the same
    }
  };


  return (
    <div className="container">
      <div className="grid">
        <center>
          <Button 
            variant="contained"
            color="error"
            className="btn" 
            onClick={startProcedure}>
            Start Procedure
          </Button>
        </center>
      </div>
    </div>
  );
}

export default StartProcedurePage;
