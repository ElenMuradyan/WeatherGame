import { useState, useEffect } from "react";
import { capitals } from "../../utilis/constants";
import { API_KEY, API_URL } from "../../utilis/constants";

const City = ({ index, getName, getCurrentTemperature }) => {
    const [ temperature, setTemperature ] = useState(0);
const [ RandomCapitals, setRandomCapitals] = useState({});
    const implementCapitalList = () => {
            let capitalValues={}
            while(Object.keys(capitalValues).length<6){
            let index=Math.floor(Math.random()*20);
            if(!capitalValues[index]){
            capitalValues[index]=capitals[index];
            }
        }
        return Object.values(capitalValues);
        };
    
    useEffect(() => {
        setRandomCapitals(implementCapitalList());
    }, []);

    useEffect(()=>{
        const fetchTemperature = async () => {
        try{
            const response = await fetch(`${API_URL}${RandomCapitals[index]}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            setTemperature(data.main.temp);
        }catch(error) {
            console.log(error);
        }};
    fetchTemperature();
    getCurrentTemperature(temperature);
    getName(RandomCapitals[index-1]);
    },[index])
    return(<p>{RandomCapitals[index]}</p>)
};

export default City;