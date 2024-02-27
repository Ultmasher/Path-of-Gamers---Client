import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../styles/MainHeader.css";
import DropdownSettings from "./DropdownSettings";

const MainHeader = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const dropdownArrowRef = useRef(null);

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

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="mainHeaderContainer">
        <img
            onClick={navigateToHome}
            className="mainHeaderImg"
            src="https://cdn.discordapp.com/attachments/1208068435725262938/1208070511322603551/POGLogo.png?ex=65eb2cd6&is=65d8b7d6&hm=fc26c274366064190fcbc3ffb82ef1538b3a7bfe73e4f71e3609aa83f7d96a3e&"
            alt="POG Logo"
        />

        <div className="mainHeaderRight">

            {notifications ? (
                <span onClick={handleNotificationClick} className="material-symbols-outlined notificationIcon notificationUnread">
                notifications_unread
                </span>
            ) : (
                <span onClick={handleNotificationClick} className="material-symbols-outlined notificationIcon">
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
        </div>

        {showDropdown && <DropdownSettings dropdownRef={dropdownRef} setShowDropdown={setShowDropdown}/>}
        </div>
    );
    };

export default MainHeader;
