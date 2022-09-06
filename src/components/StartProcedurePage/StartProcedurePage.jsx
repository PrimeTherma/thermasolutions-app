import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';



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
        <button onClick={startProcedure}>Start Procedure</button>
      </div>
    </div>
  );
}

export default StartProcedurePage;
