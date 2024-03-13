//import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/LandingPage.css';
import pogLogo from '../assets/PogBigLogo.png'

const LandingPage = () => {

  const navigate = useNavigate();

  const handleSignInClick = (path) => {
    console.log(path);
    navigate('/login');
  };

  const handleRegisterClick = (path) => {
    console.log(path);
    navigate('/register');
  };

  const handleNewEventClick = (path) => {
    console.log(path);
    navigate('/newevent');
};

  return (
    <>
        <div className='landingContainer'>
            <img className='landingImg' src={pogLogo} alt='POG Logo' />
            <div className='landingButtonsWrapper'>
                <button className='landingButton' onClick={handleSignInClick}>SIGN IN</button>
                <button className='landingButton' onClick={handleRegisterClick}>CREATE ACCOUNT</button>
                {/* <button className='landingButton' onClick={handleNewEventClick}>New Event</button> */}

            </div>
        </div>
    </>
  )
}

export default LandingPage