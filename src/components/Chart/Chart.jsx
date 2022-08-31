import {useState, useEffect, useRef} from 'react';

import {LineChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Line} from 'recharts'


function Chart() {
    const [response, setResponse] = useState([]);
    const [time, setTime] = useState('');
    const [array, setArray] = useState([{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:45},{Temp:34},{Temp:34},{Temp:34},{Temp:34},{Temp:34}]);
    const timeoutRef = useRef(null);
    function validate() {
        setArray((prevState)=>[...prevState,{Temp:(Math.random()>= 0.5)? 45 : 34}].slice(1))
    }

    useEffect(() => {
        if (timeoutRef.current !== null) {
            
        }
        let interval = 6000;
        let speed = 100;
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
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                
                <YAxis label="AVG Temp" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temp" stroke="#8884d8" />
                <XAxis label="Time" />

            </LineChart>
    
        </div>
    );
}

export default Chart;