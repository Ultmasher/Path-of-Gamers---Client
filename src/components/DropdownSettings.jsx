import React from 'react';
import '../styles/DropdownSettings.css';
import { useNavigate } from 'react-router';

const DropdownSettings = ({dropdownRef, setShowDropdown}) => {

    const navigate = useNavigate();

    const handleNavClick = (e) => {
        let target = e.target.innerText;
        if (target === 'SETTINGS') {
            navigate('/account');
            setShowDropdown(false);
        } else if (target === 'PROFILE') {
            navigate('/profile');
            setShowDropdown(false);
        }
    }

    return (
        <div className='dropdownSettings' ref={dropdownRef}>
            <ul>
                <li onClick={handleNavClick}>SETTINGS</li>
                <li onClick={handleNavClick}>PROFILE</li>
                <li className='logoutDropdownLink'>SIGN OUT <span className="material-symbols-outlined logoutSymbol">logout</span></li>
            </ul>

        </div>
    )
}

export default DropdownSettings;