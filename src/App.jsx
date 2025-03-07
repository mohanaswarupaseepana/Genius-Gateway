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
import Level3 from './components/Level3.jsx'
import Waterjug from './components/Waterjug.jsx'
import Coins from './components/Coins.jsx'
import BridgeTorch from './components/BridgeTorch.jsx'
import MissingGrid from './components/MissingGrid.jsx'
import GeniusCipherGameUI from './components/GeniusCipher.jsx'
import Sudoku from './components/Sudoku.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/checkpoints" element={<Checkpoints />} />
        <Route path="/leaderboard" element={<Leaderboard_level1 />} />
        <Route path="/magicSquare" element={<MagicSquare />} />
        <Route path="/towersofhanoi" element={<TowersOfHanoi   />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/kenken" element={<Kenken />} />
        <Route path="/level3" element={<Queens/>}/>
        <Route path="/waterjug" element={<Waterjug/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/bridgetorch" element={<BridgeTorch/>}/>
        <Route path="/missinggrid" element={<MissingGrid/>}/>
        <Route path="/geniuscipher" element={<GeniusCipherGameUI/>}/>
        <Route path="/sudoku" element={<Sudoku/>}/>  
    </Routes>
    </Router>
  )
}
export default App;
