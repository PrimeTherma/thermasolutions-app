import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {LineChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Line, Label, ReferenceArea} from 'recharts'


function Chart() {
    const dispatch = useDispatch();
    const history = useHistory();

    const deviceDiagnostics = useSelector((store) => store.deviceDiagnostics);
    const [lastDiagnostics, setLastDiagnostics] = useState([]);
    const [response, setResponse] = useState([]);
    const [time, setTime] = useState('');
    const [array, setArray] = useState([{Temp:39, Time:'0 s'},{Temp:39, Time:'1 s'},{Temp:39, Time:'2 s'},{Temp:39, Time:'3 s'},{Temp:39, Time:'4 s'},{Temp:39, Time:'5 s'},{Temp:39, Time:'6 s'},{Temp:42, Time:'6 s'},{Temp:42, Time:'7 s'},{Temp:42, Time:'8 s'},{Temp:42, Time:'9 s'},{Temp:42, Time:'10 s'}]);

    const timeoutRef = useRef(null);
    function validate() {
        setArray((prevState)=>[...prevState,{Temp:(Math.random()>= 0.5)? 42 : 39, Time:'11 s'}].slice(1))
    }


    useEffect(() => {
        if (timeoutRef.current !== null) {
            
        }
        let interval = 6000;
        let speed = 3000;
        for(let i=1; i<interval; i++) {
            timeoutRef.current = setTimeout(()=> {
            timeoutRef.current = null;
            validate()
            }, i*speed);
        }
    },[]);

    
    return (
        <div>
            <h1>{time}</h1>
            <LineChart width={730} height={250} data={array}
                margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                
                <YAxis 
                    label={{ value: 'AVG Temp', angle: -90, position: 'insideLeft' }} 
                    type="number" domain={['dataMin - 2', 'dataMax + 2']}
                    interval="preserveStartEnd"
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temp" stroke="#E23E1B" position="bottom"/>
                <XAxis dataKey="Time">
                    {/* <Label value="Time" offset={0} position="bottom" /> */}
                </XAxis>
                <ReferenceArea y1={40.8} y2={42} label="Cancer Kill Zone" />
    
            </LineChart>

            {/* <button onClick={(getLastDiagnostics)}>POST</button> */}
    
        </div>
    );
}

export default Chart;