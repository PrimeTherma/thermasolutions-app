// import React, { useState } from "react";
// import React, { Component } from "react";
import "./ChartPage.css";
import { useHistory } from "react-router-dom";
import Stopwatch from "../Stopwatch/Stopwatch";
import Chart from "../Chart/Chart"

function ChartPage() {
  return (
    <div className="container">
      <div className="grid">
        <h3>Total HTUs: </h3>
        <Chart />
        {/* <div id = "box"/> */}
        <Stopwatch />
      </div>
    </div>
  );
}

export default ChartPage;