import React from 'react'
import '../../styles/AboutTab.css'
import { useAuth } from '../../context/AuthContext';
const AboutTab = () => {

  const { user } = useAuth();
  return (
    <div>
      <p>Name : {user.name}</p>
      <p>Lastname : {user.surname}</p>
      <p>Birthplace : {user.birthplace}</p>
      <p>Birthdate : {user.birthdate}</p>
    </div>
  )
}

export default AboutTab