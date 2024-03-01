//import React from 'react';
import '../styles/RegisterPage.css';
import LandingHeader from './LandingHeader';
import { useState } from 'react';
import API from '../../API';

function RegisterPage() {
  const { registerUser } = API();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      console.log("Form data submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <>
      <LandingHeader />

      <div className='registerContainer'>
        <form onSubmit={handleFormSubmit}>
          <div className='formInputsWrapper'>
            <label>
              Username:
              <input type="username" name='username' value={formData.username} onChange={handleChange} required />
            </label>

            <label>
              Password:
              <input type="password" name='password' value={formData.password} onChange={handleChange} required />
            </label>

            <label>
              Email Address:
              <input type="email" name='email' value={formData.email} onChange={handleChange} required />
            </label>
          </div>

          <div className='registerButtonsWrapper'>
            <button className="discordButton">Register with Discord <img className='discordLogo' src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png" alt='discordLogo' /></button>
            <button className='registerButton' type='button' onClick={handleFormSubmit}>REGISTER</button>
          </div>
        </form>
      </div>
    </>
  );
}


export default RegisterPage;