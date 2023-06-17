import logo from './logo.svg'
import './App.css'

import Header from './component/Header.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import Friends from './pages/Friends';
import CheckPage from './pages/CheckPage';
// change startplan page into Modal 
// import StartPlan from './pages/StartPlan';
import { useLocation } from 'react-router-dom';

import { Route, Routes } from 'react-router-dom'

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/check'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="App">
      {!shouldHideNavbar && <Header/>}
      <div className='body'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/check" element={<CheckPage />} />
          {/* <Route path="/start-plan" element={<StartPlan />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
