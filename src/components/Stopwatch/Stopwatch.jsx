import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

function Stopwatch() {

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(true);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10)
    } else{
        clearInterval(interval);
      }

    return () => clearInterval(interval)}, [start]);

return(
  <div className="stopwatchDisplay">
    <Typography variant="h6" >
      Procedure Time:
        <span>     </span>
        <span>{("0" + Math.floor(time / 3600000)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        <Tooltip title="Stop">
        <Button 
          sx={{ml: 6}}
          variant="outlined" 
          size="large"
          color="error"
          onClick={() => setStart(false)}
          >
            Stop Timer
        </Button>
        </Tooltip>
    </Typography>

      {/* <button onClick={() => setStart(true)}>Start</button> */}

      {/* <button onClick={() => {setTime(0); setStart(false)}}>Reset</button> */}

  </div>
)
}

export default Stopwatch;
