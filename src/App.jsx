import Level1 from './components/Level1.jsx'
import Checkpoints from './components/Checkpoints.jsx'
import Login from './components/Login.jsx'
import Leaderboard_level1 from './components/Leaderboard_level1.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/checkpoints" element={<Checkpoints />} />
        <Route path="/leaderboard" element={<Leaderboard_level1 />} />
      </Routes>
    </Router>
  )
}
export default App;
