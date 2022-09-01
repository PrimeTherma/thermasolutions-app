
import "./ChartPage.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import Chart from "../Chart/Chart"
import Stopwatch from "../Stopwatch/Stopwatch";

function ChartPage() {

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