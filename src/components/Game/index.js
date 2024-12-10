import { useCallback, useEffect, useState } from "react";
import { Input, Button, notification, Typography } from 'antd';
import City from "../City";
import Cat from "../Cat";
import './index.css';
import { maxDiference } from "../../core/utilis/constants";

const { Title } = Typography;

const Game = () => {
    const [ currentTemperature, setCurrentTemperature ] = useState(0);
    const [ enteredTemperature, SetEnteredTemperature ] = useState();
    const [ index, setIndex ] = useState(0);
    const [ cityName, setCityName] = useState('');
    const [ boxes, setBoxes ] = useState([]);
    const [ coins, setCoins ] = useState(0);
    
    const HandleComparision = () => {
        if(enteredTemperature !== ''){
            setIndex(index+1);
        }else{
            notification.error({
                message:'Please enter the temperature'
            })
        }
    }
    const handleStart = () => {
        setIndex(index+1);
    };

    const handleAddBox = useCallback(() => {
        const difference = Math.abs(enteredTemperature-currentTemperature);
        const state=(difference <= maxDiference);
        setCoins(coins => state ? coins + 1 : coins);
        const box={
        boxCurrenTemp: currentTemperature,
        boxEnteredTemperature: enteredTemperature,
        boxCityName: cityName,
        state: state,
    };
    setBoxes([...boxes,box]);
    SetEnteredTemperature('')
    }, [boxes, cityName, currentTemperature, enteredTemperature]);

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
    },[cityName]);

    return (
        <div className='Game'>
            {index===0 ? <Cat></Cat>:null}
            <City getCityName={handleCityName} getCurrentTemperature={handleCurrentTemperature} index={index}></City>
            {index=== 0 ?
            <>
            <Button onClick={handleStart} type="primary">Start The Game</Button>
            </>:
            <>
            {index<6?<><Input 
                    size="large" 
                    type='number' 
                    placeholder="Please enter the temperature of this city..." 
                    onChange={handleChange} 
                    value={enteredTemperature}
                    onKeyDown={handleKeyDown}
                    />
                    <Button type='primary' size="large" onClick={HandleComparision}>Submit</Button>
                    </>
                :<><p style={{textAlign:'center'}}>{coins >= maxDiference ? 'You won the game,congrats:)':'You lost the game,be more careful the next time:)'}</p>
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
            {index>0?<Cat style={{width:100}}></Cat>:null}
            <p style={{fontSize:12}}>Created by MURADYAN</p>
            </>
            }
            </div>)
};
export default Game;