import React, { useState } from 'react';
import './Navbar.css';
import { navigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = (path) => {
    console.log(path);
    navigate('/Profile');
  };

  const handleSettingsClick = (path) => {
    console.log(path);
    navigate('/settings');
};

const handleLogOutClick = (path) => {
  console.log(path);
  navigate('/welcome');
};

  return (
    <nav className="navbar">
      <img href="/public/POG.png"  alt="Logo" className="navbar-logo" />
      <div className="navbar-icons">
        <img href="/public/image2.png" alt="Icon 1" className="navbar-icon" />
        <img href="/public/image.png" alt="Icon 2" className="navbar-icon" />
        <div className="navbar-dropdown">
        <img className="navbar-dropdown-arrow" src="/public/image3.png" onClick={toggleDropdown} alt="dropdown arrow" />                  
        {dropdownOpen && (
            <div className="navbar-dropdown-menu">
              <a href="/profile"onClick={handleProfileClick} >Profile</a>
              <a href="/settings"onClick={handleSettingsClick} >Settings</a>
              <a href="/signout">
              <img href="/public/image4.png" alt="Sign Out" onClick={handleLogOutClick} />Sign Out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;