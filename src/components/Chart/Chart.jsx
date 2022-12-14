import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {LineChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Line, Label, ReferenceArea, Cell} from 'recharts'


function Chart() {
    const dispatch = useDispatch();
    const history = useHistory();

    const deviceDiagnostics = useSelector((store) => store.deviceDiagnostics);
    const [lastDiagnostics, setLastDiagnostics] = useState([]);
    const [response, setResponse] = useState([]);
    const [time, setTime] = useState('');
    const [array, setArray] = useState([{Temp:35, Time: '00:00:00'}]);
    

    const timeoutRef = useRef(null);

    useEffect(() => {
        if (timeoutRef.current !== null) {
            
        }
        let interval = 2;
        let speed = 0.1;
        for(let i=1; i<interval; i++) {
            timeoutRef.current = setTimeout(()=> {
            timeoutRef.current = null;
            validate()
            }, i*speed);
        }
    },[]);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const validate = async (Object) => {
        for (let i=0; i<deviceDiagnostics.length; i++) {
            await sleep (20000) // matches post interval 20000 ms = 20 secs; if changed, change all intervals
            setArray((prevState)=>[...prevState,{Temp: Number(deviceDiagnostics[i].avg_temp), Time: String(deviceDiagnostics[i].interval_time)}])
        }
    }

    
    return (
        <div>
            <h1>{time}</h1>
            <LineChart width={930} height={450} data={array}
                margin={{ top: 5, right: 30, left: 15, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                
                <YAxis 
                    label={{ value: 'AVG Temp', angle: -90, position: 'left'}} 
                    type="number" domain={['dataMin - 2', 'dataMax + 2']}
                    interval="preserveStartEnd"
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temp" stroke="#99012c" strokeWidth={3} />
                <XAxis dataKey="Time" >
                    {/* <Label value="Time" offset={15} position="bottom" /> */}
                </XAxis>
                <ReferenceArea y1={40.8} y2={42} label="Cancer Kill Zone" />
    
            </LineChart>

            {/* <button onClick={(getLastDiagnostics)}>POST</button> */}
    
        </div>
    );
}

export default Chart;