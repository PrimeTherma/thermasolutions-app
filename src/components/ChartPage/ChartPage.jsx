
import "./ChartPage.css";
import { useHistory } from "react-router-dom";
import Chart from "../Chart/Chart"
import Stopwatch from "../Stopwatch/Stopwatch";
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ChartPage() {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentProcedure = useSelector((store) => store.setProcedure);
  const deviceDiagnostics = useSelector((store) => store.deviceDiagnostics);
  const [currentHTUs, setCurrentHTUs] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(35);
  const [totalHTUs, setTotalHTUs] = useState(0);
  const [totalTime, setTotalTime] = useState('');
  const [fullPro, setFullPro] = useState({
    id: currentProcedure[0]?.max,
    total_time: totalTime,
    total_htu: totalHTUs,
  });
  
  console.log('Miners way', currentProcedure[0]?.max);

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


  const postTotalHTU = () => {
    console.log('Start Post');
    console.log('miner broke it',currentProcedure[0]?.max);
    console.log('Total HTUs', totalHTUs);
    console.log('Total Time', totalTime);
    // console.log('Full Pro', fullPro);

    let totalPro = {        
      id: currentProcedure[0]?.max,
      total_time: totalTime,
      total_htu: totalHTUs,}
      console.log('totalPro:', totalPro);
        dispatch({type: 'POST_HTU', payload: totalPro })
        dispatch({type: 'POST_TIME', payload: totalPro })
        // dispatch({type: 'POST_TIME', payload: totalTime})

      history.push('/history')
  };


  useEffect(() => {
    fetchTotals()
  },[])

  const fetchTotals = (array) => {
    let sum = 0;
      for (let i=0; i<deviceDiagnostics.length; i++) {
          setTotalHTUs(sum += Number(deviceDiagnostics[i].interval_htu))
      }
      setTotalTime(deviceDiagnostics[deviceDiagnostics.length-1].interval_time)
      setFullPro({
        id: currentProcedure[0]?.max,
        total_time: totalTime,
        total_htu: totalHTUs,
      });
  }

  return (
    <div className="container">
      <div className="grid">
        <center className="current">
          <Card sx={{ width: 250, m:1 }}>
            <CardContent>
              <Typography variant="h6" >
                Total HTUs: {currentHTUs.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: 250, m:1 }}>
            <CardContent>
              <Typography variant="h6" >
                Current Temp: {currentTemp.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </center>
        <center>
          <Card sx={{ width: 1050, m:1 }}>
            <CardContent>
              <Chart />
            </CardContent>
          </Card>
        </center> 
        <center className="stopwatch">
          <Card sx={{ width: 500, m:1 }}>
            <CardContent>
              <Stopwatch />
            </CardContent>
          </Card>
          
          <Button 
            sx={{ m:1 }}
            variant="contained"
            color="error"
            className="btn"
            onClick={postTotalHTU}>
              Finish Procedure
            </Button>
          </center>
      </div>
    </div>
  );
}

export default ChartPage;