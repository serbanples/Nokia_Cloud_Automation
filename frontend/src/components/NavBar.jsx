import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaSearch } from 'react-icons/fa';  // Import icons
import AuthService from '../api/authService';
import logo from "../../public/logo_navbar.jpg"

const Navbar = () => {

    const location = useLocation();

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    return (
        <div className="fixed w-full font-poppins font-semibold bg-white text-nokiaBlue flex justify-between items-center p-4">
            <div>
                <Link to="/">
                    <img src= { logo } alt="Placeholder" className="w-32" />
                </Link>
            </div>
            {location.pathname === '/' && ( 
                <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 flex items-center ps-3">
                        <FaSearch/>
                    </div>
                    <input type="text" 
                            id="search-navbar" 
                            className="p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                            placeholder="Search name"/>
                    {/* Make search functional */}
                </div> 
            )}
            <div className="flex items-center">
                <Link to="/profile" className="flex items-center mr-4">
                    <FaUser className="h-6 w-6" /> {/* User icon */}
                    <span className="ml-2">Profile</span>
                </Link>
                {/* <Link to="/settings" className="flex items-center mr-4">
                    <FaCog className="h-6 w-6" /> Settings icon
                    <span className="ml-2">Settings</span>
                </Link> */}
                <Link to="/help" className="flex items-center">
                    <FaQuestionCircle className="h-6 w-6" /> {/* Help icon */}
                    <span className="ml-2">Help</span>
                </Link>
                <button className="flex items-center mx-3 px-2 border rounded-md border-nokiaBlue" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Navbar;