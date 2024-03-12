import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../styles/MainHeader.css";
import DropdownSettings from "./DropdownSettings";
import HamburgerMenu from "./HamburgerMenu";
import pogBigLogo from "../assets/PogBigLogo.png";

const MainHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [showMenuClass, setShowMenuClass] = useState(
    "hamburgerMenuWrapperClosed"
  );

  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState("hamburgerMenuClosed");

  const [notifications, setNotifications] = useState(false);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const dropdownArrowRef = useRef(null);

  const hamburgerRef = useRef(null);

  const handleDropdownClick = (e) => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      dropdownArrowRef.current &&
      !dropdownArrowRef.current.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  };

  const handleNotificationClick = () => {
    setNotifications(!notifications);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const handleHamburgerClick = () => {
    if (!showHamburgerMenu) {
      setHamburgerClass("hamburgerMenuOpen");
      setShowMenuClass("hamburgerMenuWrapperOpen");
      setShowHamburgerMenu(true);
    } else {
      setHamburgerClass("hamburgerMenuClosed");
      setShowMenuClass("hamburgerMenuWrapperClosed");
      setShowHamburgerMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mainHeaderWrapper">
      <div className="mainHeaderContainer">
        <img
          onClick={navigateToHome}
          className="mainHeaderImg"
          src={pogBigLogo}
          alt="POG Logo"
        />

        <div className="mainHeaderRight">
          {notifications ? (
            <span
              onClick={handleNotificationClick}
              className="material-symbols-outlined notificationIcon notificationUnread"
            >
              notifications_unread
            </span>
          ) : (
            <span
              onClick={handleNotificationClick}
              className="material-symbols-outlined notificationIcon"
            >
              notifications
            </span>
          )}

          <span
            className="accountSettingsIcon"
            onClick={handleDropdownClick}
            ref={dropdownArrowRef}
          >
            <img
              className="mainHeaderProfileImg"
              src="https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png"
              alt="ProfilePic"
            />
            <p className={`dropdownArrow ${showDropdown ? "open" : ""}`}>⏵</p>
          </span>

          <span
            className="accountSettingsHamburger material-symbols-outlined"
            onClick={handleHamburgerClick}
          >
            menu
          </span>
        </div>
        <HamburgerMenu
          handleHamburgerClick={handleHamburgerClick}
          showMenuClass={showMenuClass}
          setShowHamburgerMenu={setShowHamburgerMenu}
          hamburgerClass={hamburgerClass}
        />
        {showDropdown && (
          <DropdownSettings
            dropdownRef={dropdownRef}
            setShowDropdown={setShowDropdown}
          />
        )}
      </div>
    </div>
  );
};

export default MainHeader;
