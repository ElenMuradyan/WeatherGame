import { useState, useEffect } from "react";
import { capitals } from "../../utilis/constants";

const City = ({ index }) => {
const [ RandomCapitals, setRandomCapitals] = useState({});
    const implementCapitalList = () => {
            let capitalValues={}
            while(Object.keys(capitalValues).length<5){
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

    console.log(RandomCapitals)
    return(<p>{RandomCapitals[index]}</p>)
};

export default City;