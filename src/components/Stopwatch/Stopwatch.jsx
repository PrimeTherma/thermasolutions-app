import React, { useState, useEffect } from "react";

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
  <div>
    <h1>Procedure Time</h1>
    <h1>
      <span>{("0" + Math.floor(time / 3600000)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      {/* <span>{("0" + (time / 10) % 1000).slice(-2)};</span> This is Milliseconds*/} 
    </h1>
    <div>
      {/* <button onClick={() => setStart(true)}>Start</button> */}
      <button onClick={() => setStart(false)}>Stop</button>
      <button onClick={() => {setTime(0); setStart(false)}}>Reset</button>
    </div>
  </div>
)
}

export default Stopwatch;
