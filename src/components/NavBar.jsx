//import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
              <a href="/settings">Settings</a>
              <a href="/profile">Profile</a>
              <a href="/signout">
              <img href="/public/image4.png" alt="Sign Out" />Sign Out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;