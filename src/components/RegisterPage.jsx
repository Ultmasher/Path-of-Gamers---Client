//import React from 'react';
import '../styles/RegisterPage.css';
import LandingHeader from './LandingHeader';
import { useNavigate } from 'react-router';
import { useState } from 'react';

  function RegisterPage () {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };

    const handleRegisterClick = (path) => {
            // Handle Discord registration logic here
    };
  
    const handleDiscordRegister = () => {
      // Handle Discord registration logic here
    };
  
    return (
      <>
      <LandingHeader />
      <div className='registerContainer'>
      <form onSubmit={handleSubmit}>
        <div className='formInputsWrapper'>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </label>

          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>

          <label>
            Email Address:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
        </div>

        <div className='registerButtonsWrapper'>
          <button className="discordButton" onClick={handleDiscordRegister}>Register with Discord <img className='discordLogo' src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png" alt='discordLogo' /></button>
          <button className='registerButton' onClick={handleRegisterClick}>REGISTER</button>
        </div>
      </form>
      </div>
      </>
    );
  }
  
export default RegisterPage;