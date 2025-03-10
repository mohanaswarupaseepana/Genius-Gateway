import Level1 from './components/Level1.jsx'
import Checkpoints from './components/Checkpoints.jsx'
import Login from './components/Login.jsx'
import Leaderboard_level1 from './components/Leaderboard_level1.jsx'
import MagicSquare from './components/MagicSquare.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Level2 from "./components/Level2.jsx"
import Queens from "./components/Queens.jsx"
import Welcome from "./components/Welcome.jsx"
import TowersOfHanoi from './components/TowersOfHanoi.jsx'
import Kenken from './components/Kenken.jsx'
// import Level3 from './components/Level3.jsx'
import Waterjug from './components/Waterjug.jsx'
import Coins from './components/Coins.jsx'
import BridgeTorch from './components/BridgeTorch.jsx'
import MissingGrid from './components/MissingGrid.jsx'
import GeniusCipherGameUI from './components/GeniusCipher.jsx'
import Sudoku from './components/Sudoku.jsx'
import Level1Waiting from './components/Level1Waiting.jsx'
import Level2Waiting from './components/Level2Waiting.jsx'
import Eliminated from './components/Eliminated.jsx'
import EventWaiting from './components/EventWaiting.jsx'
import Winner from './components/Winner.jsx'
import Completed from './components/Completed.jsx'
import Instructions from './components/Instructions.jsx'
const EVENT_START_TIME = new Date("2025-03-09T22:05:00");
const LEVEL_TIME_LIMITS = [15 * 60 * 1000, 30 * 60 * 1000, 15 * 60 * 1000];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/level1" element={<Level1 EVENT_START_TIME={EVENT_START_TIME} LEVEL_TIME_LIMITS={LEVEL_TIME_LIMITS}/>} />
        <Route path="/level2" element={<Level2 EVENT_START_TIME={EVENT_START_TIME} LEVEL_TIME_LIMITS={LEVEL_TIME_LIMITS}/>} />
        <Route path="/checkpoints" element={<Checkpoints />} />
        <Route path="/leaderboard" element={<Leaderboard_level1 />} />
        <Route path="/magicSquare" element={<MagicSquare />} />
        <Route path="/towersofhanoi" element={<TowersOfHanoi   />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/kenken" element={<Kenken />} />
        <Route path="/level3" element={<Queens EVENT_START_TIME={EVENT_START_TIME} LEVEL_TIME_LIMITS={LEVEL_TIME_LIMITS}/>}/>
        <Route path="/waterjug" element={<Waterjug/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/bridgetorch" element={<BridgeTorch/>}/>
        <Route path="/missinggrid" element={<MissingGrid/>}/>
        <Route path="/geniuscipher" element={<GeniusCipherGameUI/>}/>
        <Route path="/sudoku" element={<Sudoku/>}/> 
        <Route path="/level1waiting" element={<Level1Waiting EVENT_START_TIME={EVENT_START_TIME} LEVEL_TIME_LIMITS={LEVEL_TIME_LIMITS}/>}/>  
        <Route path="/level2waiting" element={<Level2Waiting EVENT_START_TIME={EVENT_START_TIME} LEVEL_TIME_LIMITS={LEVEL_TIME_LIMITS}/>}/>  
        <Route path="/eliminated" element={<Eliminated/>}/>  
        <Route path="/eventwaiting" element={<EventWaiting EVENT_START_TIME={EVENT_START_TIME} LEVEL_TIME_LIMITS={LEVEL_TIME_LIMITS}/>}/>
        <Route path="/winner" element={<Winner/>}/>
        <Route path="/completed" element={<Completed/>}/>
        <Route path="/instructions" element={<Instructions/>}/>




    </Routes>
    </Router>
  )
}
export default App;
