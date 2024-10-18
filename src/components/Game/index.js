import { useEffect, useState } from "react";
import { Input, Button, notification, Typography } from 'antd';
import City from "../City";
import Cat from "../Cat";
import './index.css';

const { Title } = Typography;

const Game = () => {
    const [ CurrentTemperature, setCurrentTemperature ] = useState(0);
    const [ EnteredTemperature, SetEnteredTemperature ] = useState();
    const [ Index, setIndex ] = useState(0);
    const [ CityName, setCityName] = useState('');
    const [ boxes, setBoxes ] = useState([]);
    const [ coins, setCoins ] = useState(0);
    
    const HandleComparision = () => {
        if(EnteredTemperature!==''){
            setIndex(Index+1);
        }else{
            notification.error({
                message:'Please enter the temperature'
            })
        }
    }
    const handleStart = () => {
        setIndex(Index+1);
    };

    const handleAddBox = () => {
        const differance = Math.abs(EnteredTemperature-CurrentTemperature);
        const state=(differance<=4);
        setCoins(coins => state ? coins+1 : coins);
        const box={
        boxCurrenTemp:CurrentTemperature,
        boxEnteredTemperature:EnteredTemperature,
        boxCityName:CityName,
        state:state,
    };
    setBoxes([...boxes,box]);
    SetEnteredTemperature('')
    };

    const handleChange = e => {
        SetEnteredTemperature(e.target.value);
    };

    const handleCityName = value => {
        setCityName(value);
    };

    const handleCurrentTemperature = value => {
        setCurrentTemperature(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            HandleComparision();
        };
    };

    useEffect(()=>{
        handleAddBox();
    },[CityName]);

    return (
        <div className='Game'>
            {Index===0?<Cat></Cat>:null}
            <City getCityName={handleCityName} getCurrentTemperature={handleCurrentTemperature} index={Index}></City>
            {Index===0?
            <>
            <Button onClick={handleStart} type="primary">Start The Game</Button>
            </>:
            <>
            {Index<6?<><Input 
                    size="large" 
                    type='number' 
                    placeholder="Please enter the temperature of this city..." 
                    onChange={handleChange} 
                    value={EnteredTemperature}
                    onKeyDown={handleKeyDown}
                    />
                    <Button type='primary' size="large" onClick={HandleComparision}>Submit</Button>
                    </>
                :<><p style={{textAlign:'center'}}>{coins>=4?'You won the game,congrats:)':'You lost the game,be more careful the next time:)'}</p>
                <Button type="primary" size='large' onClick={()=>window.location.reload()}>Start again</Button>
                </>
            }
            
            <div className="boxes_container">
            {boxes.slice(3).map((box, idx)=>{
            return <div key={idx} style={{background:`${box.state?'linear-gradient(135deg, #6f7bff, #00ffc8)':'linear-gradient(135deg, #ff0000, #ea00ff)'}`}}>
                <Title level={5}>{box.boxCityName}</Title>
                <span>Current Temperatue is {Math.round(box.boxCurrenTemp)}</span>
                <span>You Entered {Math.round(box.boxEnteredTemperature)}</span>
            </div>
            })}
            </div>
            {Index>0?<Cat style={{width:100}}></Cat>:null}
            <p style={{fontSize:12}}>Created by MURADYAN</p>
            </>
            }
            </div>)
};
export default Game;