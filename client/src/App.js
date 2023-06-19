import logo from './logo.svg'
import './App.css'

import Header from './component/Header.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx';
import Profile from './pages/Profile.jsx';
import Friends from './pages/Friends';
import CheckPage from './pages/CheckPage';
import { getUser, createUser } from './api/users';
// change startplan page into Modal 
// import StartPlan from './pages/StartPlan';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import EditPage from './pages/EditPage';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/check', '/edit'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);


  return (
    <Authenticator className='mt-12'>
    {({ signOut, user }) => {
      return (
      <div className="App">
        {!shouldHideNavbar && <Header user={user}/>}
        <div className='body'>
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/explore" element={<Explore user={user}/>} />
            <Route path="/friends" element={<Friends user={user}/>} />
            <Route path="/profile" element={<Profile user={user} signOut={signOut}/>} />
            <Route path="/check" element={<CheckPage user={user}/>} />
            <Route path="/edit" element={<EditPage user={user} />} />
            {/* <Route path="/start-plan" element={<StartPlan />} /> */}
          </Routes>
        </div>
      </div>
    )
    }}
    </Authenticator>
  );
}

export default App;
