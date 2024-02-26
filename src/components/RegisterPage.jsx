//import React from 'react';
import '../styles/RegisterPage.css';
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
      <div className='registerContainer'>
        <img className='landingImg' src='https://cdn.discordapp.com/attachments/1208068435725262938/1208070511322603551/POGLogo.png?ex=65eb2cd6&is=65d8b7d6&hm=fc26c274366064190fcbc3ffb82ef1538b3a7bfe73e4f71e3609aa83f7d96a3e&' alt='POG Logo' />
      <form onSubmit={handleSubmit}>
      <div className='RegisterInput'>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        </div>

        <div className='landingButtonsWrapper'>
        <button className="discordButton" onClick={handleDiscordRegister}>Register with Discord</button>
        <button className='registerButton' onClick={handleRegisterClick}>CREATE ACCOUNT</button>
        </div>
      </form>
      </div>
    );
  }
  
export default RegisterPage;