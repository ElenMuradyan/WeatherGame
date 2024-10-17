import { useEffect, useState } from "react";
import { Flex, Input, Button, notification, Typography } from 'antd';
import City from "../City";
import './index.css';

const { Title } = Typography;

const Game = () => {
    const [ CurrentTemperature, setCurrentTemperature ] = useState(0);
    const [ EnteredTemperature, SetEnteredTemperature ] = useState(0);
    const [ Index, setIndex ] = useState(0);
    const [ CityName, setCityName] = useState('');
    const [ boxes, setBoxes ] = useState([]);
    
    const HandleComparision = () => {
    setIndex(Index+1);
    }

    const handleAddBox = () => {
        const differance = Math.abs(EnteredTemperature-CurrentTemperature);
        const state=(differance<=4);
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

    const handleCityName = value => {
        setCityName(value)    
    };

    const handleCurrentTemperature = value => {
setCurrentTemperature(value)
    }
    
    useEffect(()=>{
        handleAddBox();
    },[CityName]);

    return (
        <div className='Game'>
            <City getCityName={handleCityName} getCurrentTemperature={handleCurrentTemperature} index={Index}></City>
            <Input 
                size="large" 
                type='number' 
                placeholder="Please enter the temperature of this city..." 
                onChange={handleChange} 
                value={EnteredTemperature}
            />
            <Button onClick={HandleComparision} disabled={Index===5}>Submit</Button>
            <div className="boxes_container">
            {boxes.slice(2).map((box, idx)=>{
            return <div key={idx} style={{backgroundColor:`${box.state?'green':'red'}`}}>
                <Title level={5}>{box.boxCityName}</Title>
                <span>Current Temperatue is {Math.round(box.boxCurrenTemp)}</span>
                <span>You Entered {Math.round(box.boxEnteredTemperature)}</span>
            </div>
            })}
            </div>
            </div>)
};
export default Game;