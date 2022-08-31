// import React, { useState } from "react";
// import React, { Component } from "react";
import "./ChartPage.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import Stopwatch from "../Stopwatch/Stopwatch";
// import Stopwatch from "./Stopwatch";

function ChartPage() {
  return (
    <div className="container">
      <div className="grid">
        <h3>Total HTUs: </h3>
        <div id = "box"/>
        <Stopwatch />
      </div>
    </div>
  );
}

export default ChartPage;