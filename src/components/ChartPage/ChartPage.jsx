
import "./ChartPage.css";
import { useHistory } from "react-router-dom";
import Chart from "../Chart/Chart"
import Stopwatch from "../Stopwatch/Stopwatch";
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ChartPage() {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentProcedure = useSelector((store) => store.setProcedure);
  const deviceDiagnostics = useSelector((store) => store.deviceDiagnostics);
  const [currentHTUs, setCurrentHTUs] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(35);
  // console.log('Miners way', currentProcedure[0]?.max);

  const timeoutRef = useRef(null);

  useEffect(() => {
      if (timeoutRef.current !== null) {
          
      }
      let interval = 2;
      let speed = 0.1;
      for(let i=1; i<interval; i++) {
          timeoutRef.current = setTimeout(()=> {
          timeoutRef.current = null;
          fetchCurrentHTUs()
          }, i*speed);
      }
  },[]);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const fetchCurrentHTUs = async (array) => {
    let sum = 0;
      for (let i=0; i<deviceDiagnostics.length; i++) {
          await sleep (250)
          setCurrentHTUs(sum += Number(deviceDiagnostics[i].interval_htu))
          // setCurrentHTUs(Number(currentHTUs += deviceDiagnostics[i].interval_htu))
          // console.log('Waiting for HTUs', currentHTUs);
          setCurrentTemp(Number(deviceDiagnostics[i].avg_temp))
      }
      // return currentHTUs
  }

  return (
    <div className="container">
      <div className="grid">
        <h3>Total HTUs: {currentHTUs.toFixed(2)}</h3>
        <h3>Current Temp: {currentTemp.toFixed(2)}</h3>
        <Chart />
        <Stopwatch />
      </div>
    </div>
  );
}

export default ChartPage;