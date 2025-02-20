import Level1 from './components/Level1.jsx'
import Checkpoints from './components/Checkpoints.jsx'
import Login from './components/login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/checkpoints" element={<Checkpoints />} />
      </Routes>
      <Login />
      {/* <Level1/> */}
      {/* <Checkpoints/> */}
    </Router>
  )
}
export default App;
