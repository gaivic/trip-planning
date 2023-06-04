import React, { useContext } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
// import { UserContext } from '../userContext'

import Requests from "./Requests";

import './Header.css'

const Header = () => {
    // const { user } = useContext(UserContext);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [closeFlagRef, setCloseFlagRef] = useState(false);

    useEffect(() => {
        console.log(openDropdown);
    }, [openDropdown])

    useEffect(() => {
        console.log(`flag is set to ${closeFlagRef}`);
    }, [closeFlagRef])

    const handleClick = () => {
        if (!closeFlagRef) {
            setOpenDropdown(prev => !prev);
        }
      };

    return (
        <div>
            <header className='flex justify-between px-4 py-3 border-b items-center'>
                <Link to={'/'}>
                    <span className='py-1 text-3xl font-bold text-button'>NewTrip</span>
                </Link>
                <div className='options flex gap-4 align-middle items-center'>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/Explore">Explore</CustomLink>
                    <CustomLink to="/Friends">Friends</CustomLink>
                </div>
                <div className='flex gap-2 px-4 py-2 border border-gray-300 rounded-full '>
                    <button className={`rounded-full hover:bg-gray-400 relative ${openDropdown ? "bg-gray-400" : ""}`} 
                    onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    </button>
                    {openDropdown && <Dropdown openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} setCloseFlagRef={setCloseFlagRef}/>}
                    <Link to={'/profile'} className='overflow-hidden text-white bg-gray-500 border border-gray-500 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-6 h-6 top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    {/* {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )} */}
                </div>
            </header>
        </div>
    )
}

export default Header;

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end:true});

    return (
        <div className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
            {children}
        </Link>
        </div>
    )
}

const Dropdown = ({ openDropdown, setOpenDropdown, setCloseFlagRef }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdown(false);
            setCloseFlagRef(true);
            setTimeout(() => {
                setCloseFlagRef(false);
                console.log("changed to false");
            }, 10);
        }
        };

        document.addEventListener('mouseup', handleClickOutside);
        return () => {
        document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [setOpenDropdown]);
    

    return (
      <div className="absolute w-80 h-96 top-14 right-16" ref={dropdownRef}>
        {<Requests/>}
      </div>
    )
}
