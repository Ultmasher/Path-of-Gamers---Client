//import React from 'react';
import "../styles/RegisterPage.css";
import LandingHeader from "./LandingHeader";
import { useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router";
import pogLogo from '../assets/PogBigLogo.png'


function RegisterPage() {
  const { registerUser } = API();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleDiscordLogin = () => {
    console.log("Discord login clicked");

    // Here you would typically send the data to your server
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1214873733408358450&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fuser%2Fauth%2Fdiscord%2Fcallback&scope=identify+email";
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>

      <div className="registerContainer">
        <img src={pogLogo} className="landingHeaderLogo" />
        <form onSubmit={handleFormSubmit}>
          <div className="formInputsWrapper">
            <label>
              Username:
              <input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="registerButtonsWrapper">
            
            <button
              className="registerButton"
              type="button"
              onClick={handleFormSubmit}
            >
              REGISTER
            </button>

        <div className="registerButtonsWrapper">
              <button className="discordButton" onClick={handleDiscordLogin}>
                Register with Discord{" "}
                <img
                  className="discordLogo"
                  src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png"
                  alt="discordLogo"
                />
              </button>
            </div>
        </form>

      </div>
    </>
  );
}

export default RegisterPage;
