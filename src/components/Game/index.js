import { useEffect, useState } from "react";
import { Flex, Input, Button, notification } from 'antd';
import City from "../City";

const Game = () => {
    const [ CurrentTemperature, setCurrentTemperature ] = useState(0);
    const [ EnteredTemperature, SetEnteredTemperature ] = useState(0);
    const [ Comparision, setComparision] = useState(null);
    const [ Index, setIndex ] = useState(0);
    const [ CityName, setCityName] = useState('');
    const [ boxes, setBoxes ] = useState([]);
    
    const HandleComparision = () => {
    const differance = Math.abs(EnteredTemperature-CurrentTemperature);
    setComparision(differance<=4);
    setIndex(Index+1);
    }
    
    const handleAddBox = () => {
        const differance = Math.abs(EnteredTemperature-CurrentTemperature);
        const state=(differance<=5);
        const box={
        boxCurrenTemp:CurrentTemperature,
        boxEnteredTemperature:EnteredTemperature,
        boxCityName:CityName,
        state:state,
    };
    setBoxes([...boxes,box]);
    };

    const handleChange = e => {
        SetEnteredTemperature(e.target.value);
    };
    
    const getCityNameFunction = name => {
        setCityName(name);
    };

    const getCurrentTemperature = temperature => {
        setCurrentTemperature(temperature)
    };
    useEffect(()=>{
        handleAddBox();
    },[CityName])
    return (
<div className='Game'>
    <City index={Index} getName={getCityNameFunction} getCurrentTemperature={getCurrentTemperature}></City>
    <Input 
        size="large" 
        type='number' 
        placeholder="Please enter the temperature of this city..." 
        onChange={handleChange} 
        value={EnteredTemperature}
    />
    <Button onClick={HandleComparision}>Submit</Button>
    <div className="boxes">
                {boxes.slice(2).map((box, idx)=>{
                 return <div key={idx} style={{backgroundColor:`${box.state?'green':'red'}`}}>
    <p>{box.boxCityName}</p>
    <p>Current Temperatue is {Math.round(box.boxCurrenTemp)}</p>
    <p>You Entered {Math.round(box.boxEnteredTemperature)}</p>
                 </div>
                })}
            </div>
            </div>)
};
export default Game;