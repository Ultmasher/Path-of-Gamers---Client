//import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router';


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
    <div className='LoginContainer'>
                <img className='landingImg' src='https://cdn.discordapp.com/attachments/1208068435725262938/1208070511322603551/POGLogo.png?ex=65eb2cd6&is=65d8b7d6&hm=fc26c274366064190fcbc3ffb82ef1538b3a7bfe73e4f71e3609aa83f7d96a3e&' alt='POG Logo' />
        <form onSubmit={handleSubmit(onSubmit)}>
          
        <div className='LoginInput'>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </label>
   

            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
        </div>

            <div className='loginButtonsWrapper'>
            <button className="discordButton" onClick={handleDiscordLogin}>Login with Discord</button>
            <button className='LoginButton' onClick={handleLoginClick}>Sign In</button>
            </div>

        </form>
    </div>
);
};

export default LoginForm;