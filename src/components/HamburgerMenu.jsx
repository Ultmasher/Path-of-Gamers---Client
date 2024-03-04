import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/HamburgerMenu.css';

const HamburgerMenu = ({hamburgerRef, setShowHamburgerMenu, hamburgerClass, showMenuClass, handleHamburgerClick}) => {

  const navigate = useNavigate();

  const handleNavClick = (e) => {
      handleHamburgerClick();
      let target = e.target.innerText;
      if (target === 'SETTINGS') {
          navigate('/account');
          setShowDropdown(false);
      } else if (target === 'PROFILE') {
          navigate('/profile');
          setShowDropdown(false);
      } else if (target === 'HOMEPAGE') {
          navigate('/');
          setShowDropdown(false);
      }
  }

  const handleOuterMenuClick = (e) => {
    let target = e.target.className;
    if (target === 'hamburgerVerticalMenuWrapper hamburgerMenuWrapperOpen') {
      handleHamburgerClick();
    }
  };

  return (
    <div className={`hamburgerVerticalMenuWrapper ${showMenuClass}`} onClick={handleOuterMenuClick}>

        <div className={`hamburgerVerticalMenu ${hamburgerClass}`}>
          <span className="material-symbols-outlined hamburgerCloseBtn" onClick={handleHamburgerClick}>
          close
          </span>
          <ul className='hamburgerMenuItems'>
                <li onClick={handleNavClick}>HOMEPAGE</li>
                <li onClick={handleNavClick}>SETTINGS</li>
                <li onClick={handleNavClick}>PROFILE</li>
                <li className='logoutHamburgerLink'>SIGN OUT <span className="material-symbols-outlined logoutSymbol">logout</span></li>
            </ul>
        </div>
    </div>
  )
}

export default HamburgerMenu