//import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/LandingPage.css';

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
            <img className='landingImg' src='https://cdn.discordapp.com/attachments/1208068435725262938/1208070511322603551/POGLogo.png?ex=65eb2cd6&is=65d8b7d6&hm=fc26c274366064190fcbc3ffb82ef1538b3a7bfe73e4f71e3609aa83f7d96a3e&' alt='POG Logo' />
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