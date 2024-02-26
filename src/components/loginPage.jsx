//import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router';
import LandingHeader from './LandingHeader';


const LoginForm = () => {

    const navigate = useNavigate();

    const { handleSubmit } = useForm();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


  const onSubmit = data => {
    console.log(data);
    // Here you would typically send the data to your server
  };

  const handleDiscordLogin = () => {
    console.log('Discord login clicked');
    // Here you would typically send the data to your server
  };

  const handleLoginClick = (path) => {
    console.log(path);
    navigate('/login');
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

      </div>

      <div className='registerButtonsWrapper'>
        <button className="discordButton" onClick={handleDiscordLogin}>Login with Discord <img className='discordLogo' src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png" alt='discordLogo' /></button>
        <button className='registerButton' onClick={handleLoginClick}>SIGN IN</button>
      </div>
    </form>

    </div>
    </>
  );
};

export default LoginForm;