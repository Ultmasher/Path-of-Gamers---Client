//import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router";
import LandingHeader from "./LandingHeader";
import pogLogo from "../assets/PogBigLogo.png";
import { useAuth } from "../context/AuthContext";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDiscordLogin = () => {
    console.log("Discord login clicked");
    // Here you would typically send the data to your server
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData, setError);
  };

  return (
    <>
      {loading && (
        <>
          <div className="registerContainer">
            <img src={pogLogo} className="landingHeaderLogo" />
            <PacmanLoader
              color='#CE761E'
              loading={loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      )}
      {!loading && !error && (
        <div className="registerContainer">
          <img src={pogLogo} className="landingHeaderLogo" />
          <form onSubmit={handleSubmit}>
            <div className="formInputsWrapper">
              <label>
                Email:
                <input
                  type="email"
                  value={formData.email}
                  name="email"
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
                />
              </label>
            </div>
            <button disabled={loading} className="registerButton" type="submit">
              Login
            </button>
            <div className="registerButtonsWrapper">
              <button className="discordButton" onClick={handleDiscordLogin}>
                Login with Discord{" "}
                <img
                  className="discordLogo"
                  src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png"
                  alt="discordLogo"
                />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
