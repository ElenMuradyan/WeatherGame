import { useState, useEffect } from "react";
import { capitals } from "../../core/utilis/constants";
import { API_KEY, API_URL } from "../../core/utilis/constants";
import Typography from "antd/es/typography/Typography";
import './index.css';
const { Title } = Typography;

const City = ({ getCityName, getCurrentTemperature, index }) => {
    const [ RandomCapitals, setRandomCapitals] = useState([]);
    const [ Temperatures, setTemperatures ] = useState([]);

    let temperatures=[];  
    let cities=[];

    const implementCapitalList = async () => {
        let capitalValues=new Set();
        while(capitalValues.size<6){
        const index=Math.floor(Math.random()*20);
        capitalValues.add(capitals[index]);
        };
    
        let capArr=Array.from(capitalValues);
        for(let i=0;i<capArr.length;i++){
            let temp;
            await fetchTemperature(capArr[i]).then(val=>{
            temp=val
        })
        cities.push(capArr[i]);
        temperatures.push(Math.round(temp));
        };
    };
    useEffect(() => {
        setRandomCapitals(cities);
        setTemperatures(temperatures);
    }, []);

    useEffect(()=>{
    getCurrentTemperature(Temperatures[index-1]);
    getCityName(RandomCapitals[index-1]);
    },[index])

    const fetchTemperature = async (city) => {
        try {
            const response = await fetch(`${API_URL}${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            return data.main.temp;
        } catch (error) {
            console.error(error);
        }
    };
    implementCapitalList();
    return(
        <>
        {index===0?<p>Start the game?</p>:<p>{RandomCapitals[index]}</p>}
        </>
    )
};

export default City;