import React from 'react';
import '../styles/AccountSettings.css';

const AccountSettings = () => {
  return (
    <>
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

                    <label htmlFor='username'>Username:</label>
                    <input type='text' id='username' name='username' placeholder='PoG Username #117' />

                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' placeholder="email@gmail.com"/>

                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' placeholder="Enter New Password"/>

                    <button className='saveChangesButton'>Save Changes</button>

            </div>       
        </div>
        <div className='gameSettingsButtonDiv'>
            <button className='gameSettingsButton'>Game Settings ▸</button>
        </div>
    </div>
    </>
  )
}

export default AccountSettings