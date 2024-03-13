//import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router';
import LandingHeader from './LandingHeader';
import { useAuth } from '../context/AuthContext';


const LoginForm = () => {


  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, loginDiscord } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleDiscordLogin = () => {
    // Here you would typically send the data to your server
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1214873733408358450&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fuser%2Fauth%2Fdiscord%2Fcallback&scope=identify+email";
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, setLoading, setError)

  }


  return (
    <>
      <LandingHeader />
      {error ? <p>Error: {error}</p> : (
        <div className='registerContainer'>
          <form onSubmit={handleSubmit}>
            <div className='formInputsWrapper'>
              <label>
                Email:
                <input type="email" value={formData.email} name="email" onChange={handleChange} required />
              </label>

              <label>
                Password:
                <input type="password" name='password' value={formData.password} onChange={handleChange} />
              </label>

            </div>
            <button disabled={loading} className='registerButton' type='submit'>Login</button>
            <div className='registerButtonsWrapper'>
              <button className="discordButton" onClick={handleDiscordLogin}>Login with Discord <img className='discordLogo' src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png" alt='discordLogo' /></button>

            </div>
          </form>

        </div>
      )}
    </>
  );
};

export default LoginForm;