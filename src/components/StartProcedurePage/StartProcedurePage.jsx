import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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
        await sleep (20000) // if changing post interval, change all await intervals to be the same
    }
  };

  const theme = createTheme({
    palette: {
      secondary: {
        light: '#0066ff',
        main: '#99012c',
        // dark: will be calculated from palette.secondary.main,
        contrastText: 'white',
      }
    }  
});


  return (
  <ThemeProvider theme={theme}>
    <div className="container">
      <div className="grid">
        <Typography align="center" variant="h4" color="lightgrey">NEW PROCEDURE</Typography>

        <center>
        <Tooltip title="Start Procedure" >
          <Button 
            sx ={{mt: 20, mb: 5}}
            variant="contained"
            size="large"
            color="secondary"
            className="btn" 
            onClick={startProcedure}>
            Start Procedure
          </Button>
          </Tooltip>
          <center>
            <Typography sx ={{m: 1}} align="center" variant="h7" color="grey">* Pressing Button Will Start Timer and Chart Current Procedure *</Typography>
          </center>
        </center>
      </div>
    </div>
  </ThemeProvider>
  );
}

export default StartProcedurePage;
