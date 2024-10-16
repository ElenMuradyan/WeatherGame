import { useEffect, useState } from "react";
import { Flex, Input, Button, notification } from 'antd';
import { apiKey } from "../../utilis/constants";
import City from "../City";

const Temperature = () => {
    const [ temp, setTemp ] = useState(0);
    const [ cityName, setCityName ] = useState('')
    const [ state, setStateName] = useState(true);
    const [ index, setIndex ] = useState(0);
    const [ temperature, setTemperature ] = useState(0);
    const [ boxes, setBoxes ] = useState([]);
 
    const handleComparison = async () => {
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    setTemperature(data.main.temp);
    const difference = Math.abs(temp - temperature);
    console.log(temp)
    console.log(temperature)
    console.log(difference)
    setStateName(difference<=4);
    setIndex(prevIndex => prevIndex + 1);
    setBoxes(prevBoxes => [...prevBoxes,state]);
}catch(error){
        notification.error({
            message:'Please be more carefull',
            description: error.message || 'Please be more careful',
        })
    }
    };
    
    const setCityNameFunction = name => {
    setCityName(name);
    };

    const handleChange = e => {
        const value = e.target.value.trim();
        setTemp(value ? Number(value) : 0);
    };

    return (<div>
        <Flex vertical>
            <City getName={setCityNameFunction} index={index}></City>
            <div>
            <Input 
            size="large" 
            type='number' 
            placeholder="Please enter the temperature of this city..." 
            onChange={handleChange} value={temp}/><Button
            onClick={handleComparison}>Submit</Button> 
            <div className="boxes">
                {boxes.map((box, idx)=>{
                 return <div key={idx} style={{backgroundColor:`${box?'green':'red'}`}}>
    <p>{cityName}</p>
    <p>Current Temperatue is {Math.round(temperature)}</p>
    <p>You Entered {Math.round(temp)}</p>
                 </div>
                })}
            </div>
            </div>  
        </Flex>
    </div>)
}

export default Temperature;