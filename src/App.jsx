import Level1 from './components/Level1.jsx'
import Checkpoints from './components/Checkpoints.jsx'
import Login from './components/Login.jsx'
import Leaderboard_level1 from './components/Leaderboard_level1.jsx'
import MagicSquare from './components/MagicSquare.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Level2 from "./components/Level2.jsx"
import Queens from "./components/Queens.jsx"
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
       
        <Route path="/sample" element={<Queens/>}/>
      </Routes>
    </Router>
  )
}
export default App;
