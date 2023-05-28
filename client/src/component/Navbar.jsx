import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import Requests from "./Requests";

import './Navbar.css';

export default function Navbar () {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [newRequest, setNewRequest] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);


  useEffect(() => {
    console.log(openDropdown);
  }, [openDropdown])

  return (
    <>
    {  (
    <nav className="nav">
      <Link to="/" className="site-title">
        NewTrip
      </Link>
      <ul className="options">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/Explore">Explore</CustomLink>
        <CustomLink to="/Friends">Friends</CustomLink>
      </ul>
      <ul className="others">
        <button className="bell" onClick={() =>setOpenDropdown(prev => !prev)}>
          <FontAwesomeIcon className={newRequest ? "have-request":""} icon={faBell} size="lg"/>
          {openDropdown && <Dropdown />}
        </button>
        <Link to="/profile" className="profile">
          <img src="images/default.png" className="round-image"/>
          <a>Adesanya</a>
        </Link>
      </ul>
    </nav>
    )}
    </>
  );
};

function CustomLink({to, children, ...props}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end:true});

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

const Dropdown = () => {
  console.log("drop");
  return (
    <div className="dropdown">
      {<Requests/>}
    </div>
  )
}