import {useState, useEffect, useRef} from 'react';

import {LineChart, CartesianGrid, YAxis, XAxis, Tooltip, Legend, Line, Label, ReferenceArea} from 'recharts'


function Chart() {
    const [response, setResponse] = useState([]);
    const [time, setTime] = useState('');
    const [array, setArray] = useState([{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:42},{Temp:39},{Temp:39},{Temp:39},{Temp:39},{Temp:39}]);
    const timeoutRef = useRef(null);
    function validate() {
        setArray((prevState)=>[...prevState,{Temp:(Math.random()>= 0.5)? 42 : 39}].slice(1))
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
                margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                
                <YAxis 
                label={{ value: 'AVG Temp', angle: -90, position: 'insideLeft' }} 
                type="number" domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temp" stroke="#E23E1B" />
                <XAxis dataKey="name">
                    <Label value="Time" offset={0} position="insideBottom" />
                </XAxis>
                <ReferenceArea y1={40.8} y2={42} label="Cancer Kill Zone" />
    
            </LineChart>
    
        </div>
    );
}

export default Chart;