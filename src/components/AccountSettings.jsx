import React , { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';
import Modal from './Modal';

const AccountSettings = () => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const navigateToGameSettings = () => {
        navigate('/account/game-settings')
    };

    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

  return (
    <div className='accountSettingsContainer'>
    <div className='accountSettingsLeft'>
        <img className='userAvatarSettingsImg' src={file} alt='blankProfile' >
        </img>
        <input type="file" onChange={handleChange} id="profile-picture" name="profile-picture" accept="image/*" />
        <button className='changeAvatarButton'onClick={() => setIsOpen(true)}>Change Avatar</button>
        <Modal className= 'Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
        Your avatar picture has been changed!
        </Modal>

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
                        <option value='na'>North America</option>
                        <option value='eu'>Europe</option>
                        <option value='asia'>Asia</option>
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