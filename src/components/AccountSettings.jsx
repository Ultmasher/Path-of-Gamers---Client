import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';

const AccountSettings = () => {

    const navigate = useNavigate()

    const navigateToGameSettings = () => {
        navigate('/account/game-settings')
    };

  return (
    <div className='accountSettingsContainer'>
    <div className='accountSettingsLeft'>
        <img className='userAvatarSettingsImg' src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' alt='blankProfile' >
        </img>
        <button className='changeAvatarButton'>Change Avatar</button>
        <h2>PoG Username #117</h2>
    </div>

    <div className='accountSettingsRight'>
        <div className='accountSettingsContent' >
            <h1>Account Settings</h1>
            <div className='accountSettingsForm'>

                <div className='accountSettingsFormInputs'>

                <div className='accountSettingsFormLeft'>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' id='username' name='username' placeholder='PoG Username #117' />

                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' placeholder="email@gmail.com"/>

                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' placeholder="Enter New Password"/>
                </div>

                <div className='accountSettingsFormRight'>
                    <label htmlFor='region'>Region:</label>
                    <select className='regionSelect' id='region' name='region'>
                        <option value='na'>EU: West</option>
                        <option value='eu'>EU: East</option>
                    </select>

                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' name='firstName' placeholder='John' />

                    <label htmlFor='lastName'>Last Name:</label>
                    <input type='text' id='lastName' name='lastName' placeholder='Doe' />
                </div>

                </div>
                <div className='accountSettingsFormButton'>
                    <button className='saveChangesButton' >Save Changes</button>
                </div>

            </div>       
        </div>
        <div className='gameSettingsDiv'>
            <h2>Do you want to link a new game to your account?</h2>
            <p>Click the button below to access your Game Settings!</p>
            <div className='gameSettingsButtonDiv'>
            <button className='gameSettingsButton' onClick={navigateToGameSettings}>Game Settings ▸</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AccountSettings