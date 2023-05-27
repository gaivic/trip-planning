import logo from './logo.svg'
import './App.css'

import Navbar from './component/Navbar.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Home />} />
          <Route path="/friends" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
