import React from 'react'
import '../../styles/AboutTab.css'
import { useAuth } from '../../context/AuthContext';
const AboutTab = ({ user1, id }) => {

  const { user } = useAuth();

  return (
    <div>
      <p>Name :{id ? user1.name : user.name}</p>
      <p>Lastname : {id ? user1.surname : user.surname}</p>
      <p>Birthplace : {id ? user1.birthplace : user.birthplace}</p>
      <p>Birthdate : {id ? user1.birthdate : user.birthdate}</p>
    </div>
  )
}

export default AboutTab