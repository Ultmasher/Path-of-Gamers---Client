import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';
import Modal from './Modal';
import API from '../../API';

const AccountSettings = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const { modifyUser } = API();
  const { modifyAvatar } = API();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    birthdate: "",
    birthplace: "",
    bio: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigateToGameSettings = () => {
    navigate('/account/game-settings')
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyUser(formData);
      console.log("Form data submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className='accountSettingsContainer'>
      <div className='accountSettingsLeft'>
        <img className='userAvatarSettingsImg' src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' alt='blankProfile' >
        </img>
        <input type="file" id="profile-picture" name="profile-picture" accept="image/*" />
        <button className='changeAvatarButton' onClick={() => setIsOpen(true)}>Change Avatar</button>
        <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
          Your avatar picture has been changed!
        </Modal>

        <h2>PoG Username #117</h2>
      </div>
      <div className='accountSettingsRight'>
        <form onSubmit={handleFormSubmit}>
          <div className='accountSettingsContent'>
            <h1>Account Settings</h1>
            <div className='accountSettingsForm'>
              <div className='accountSettingsFormInputs'>
                <div className='accountSettingsFormLeft'>
                  <label htmlFor='username'>Username:</label>
                  <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} placeholder='PoG Username #117' />

                  <label htmlFor='birthplace'>Birthplace:</label>
                  <input type='text' id='birthplace' name='birthplace' value={formData.birthplace} onChange={handleChange} placeholder="Somewhere" />

                  <label htmlFor='password'>Password:</label>
                  <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder="Enter New Password" />

                  <label htmlFor="bio"> Bio:</label>
                  <textarea rows="5" cols="50" maxLength="150" id='bio' name='bio' value={formData.bio} onChange={handleChange} placeholder='Write something about yourself' />
                </div>

                <div className='accountSettingsFormRight'>
                  <label htmlFor='birthdate'>Birth Date:</label>
                  <input type='text' id='birthdate' name='birthdate' value={formData.birthdate} onChange={handleChange} placeholder='11.11.1111' />

                  <label htmlFor='name'>First Name:</label>
                  <input type='text' value={formData.name} id='name' name='name' onChange={handleChange} placeholder='John' />

                  <label htmlFor='surname'>Last Name:</label>
                  <input type='text' value={formData.surname} id='surname' name='surname' onChange={handleChange} placeholder='Doe' />
                </div>
              </div>
              <div className='accountSettingsFormButton'>
                <button className='saveChangesButton' type='button' onClick={handleFormSubmit}>Save Changes</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='gameSettingsDiv'>
        <h2>Do you want to link a new game to your account?</h2>
        <p>Click the button below to access your Game Settings!</p>
        <div className='gameSettingsButtonDiv'>
          <button className='gameSettingsButton' onClick={navigateToGameSettings}>Game Settings ▸</button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings;