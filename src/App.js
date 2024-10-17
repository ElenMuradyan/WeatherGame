import Game from "./components/Game";
import Typography from "antd/es/typography/Typography";
import '../src/styles/Global.css';
const { Title } = Typography

const App = () => {
  return (
    <div className="Game_container">  
       <Title style={{color:'white',opacity:0.6}}>WEATHER FORECAST GAME</Title>
       <Game/>
    </div>
  )
};
export default App;