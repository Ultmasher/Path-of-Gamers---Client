import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DiscordCallback = () => {
  const navigate = useNavigate();
  const { setToken, setUser} = useAuth();


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
   
    const code = urlParams.get('code');

    if (code) {
        console.log(code, 'code')
      exchangeCodeForToken(code);
    } else {
      // Handle the absence of a code in the URL, possibly redirect to an error page or login page
      navigate('/login');
    }
  }, [navigate]);

  const exchangeCodeForToken = async (code) => {
    try {
     
      const response = await axios.get(`http://localhost:8000/user/auth/discord/callback?code=${code}`);
      const { token, user } = response.data;
            localStorage.setItem("jwt", token)
            setToken(token);
            setUser(user);
            navigate('/');
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      // Handle error, possibly showing an error message or redirecting
      navigate('/login');
    }
  };

  return (
    <div>Loading...</div> // Show a loading message or spinner while processing
  );
};

export default DiscordCallback;