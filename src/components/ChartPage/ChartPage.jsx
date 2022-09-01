
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
  console.log('Miners way', currentProcedure[0]?.max);


  return (
    <div className="container">
      <div className="grid">
        <h3>Total HTUs: </h3>
        <Chart />
        <Stopwatch />
      </div>
    </div>
  );
}

export default ChartPage;