import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';
import Modal from './Modal';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const AccountSettings = () => {
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [base64Image, setBase64Image] = useState('');
  const { user, token } = useAuth();

  const navigate = useNavigate()
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const [avatarData, setAvatarData] = useState({
    avatar: "",
  });
  const navigateToGameSettings = () => {
    navigate('/account/game-settings')
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/user/${user._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : null,
        },
      });
      console.log('User data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  const avatarSubmit = async () => {
    if (!avatarData.avatar) {
      console.error("No avatar file selected");
      return;
    }

    const newAvatarData = new FormData();
    newAvatarData.append('avatar', avatarData.avatar);

    try {
      const response = await axios.put(`http://localhost:8000/user/avatar/${user._id}`, newAvatarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
      console.log("Avatar submitted:", response.data);
    } catch (error) {
      console.error("Error submitting Avatar:", error);
    }
  };

  return (
    <div className='accountSettingsContainer'>
      <div className='accountSettingsLeft'>
        {user && user.avatar ? <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}
        {/* <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.data.avatar}`} alt='blankProfile' >} */}
        {/* <img className='userAvatarSettingsImg' src={previewSrc ? previewSrc : 'https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png'} alt='blankProfile' > */}

        <form onSubmit={avatarSubmit}>
          <label htmlFor="profile-picture" className="custom-file-upload">
            Upload Picture
          </label>
          <input type="file" id="profile-picture" name="profile-picture" className="profile hidden-input" value={formData.avatar} accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            setAvatarData({
              ...avatarData,
              avatar: file,
            });
          }} />
          <button className='changeAvatarButton' onClick={() => setIsOpen(true)}>Change Avatar</button>
        </form>
        <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
          Your avatar picture has been changed!
        </Modal>
        <h2> #{user.username}</h2>
      </div>
      <div>
      </div>
      <div className='accountSettingsRight'>
        <form onSubmit={handleFormSubmit}>
          <div className='accountSettingsContent'>
            <h1>Account Settings</h1>
            <div className='accountSettingsForm'>
              <div className='accountSettingsFormInputs'>
                <div className='accountSettingsFormLeft'>
                  <label htmlFor='username'>Username:</label>
                  <input type='text' id='username' name='username' defaultValue={user.username} onChange={handleChange} placeholder='PoG Username #117' />

                  <label htmlFor='birthplace'>Birthplace:</label>
                  <input type='text' id='birthplace' name='birthplace' defaultValue={user.birthplace} onChange={handleChange} placeholder='Johanseburg' />


                  <label htmlFor="bio"> Bio:</label>
                  <textarea rows="5" cols="50" maxLength="150" id='bio' name='bio' defaultValue={user.bio} onChange={handleChange} placeholder='Write something about yourself' />
                </div>

                <div className='accountSettingsFormRight'>
                  <label htmlFor='birthdate'>Birth Date:</label>
                  <input type='text' id='birthdate' name='birthdate' defaultValue={user.birthdate} onChange={handleChange} placeholder='11.11.1111' />

                  <label htmlFor='name'>First Name:</label>

                  <input type='text' defaultValue={user.name} id='name' name='name' onChange={handleChange} placeholder='John' />

                  <label htmlFor='surname'>Last Name:</label>

                  <input type='text' defaultValue={user.surname} id='surname' name='surname' onChange={handleChange} placeholder='Doe' />
                </div>
              </div>
              <div className='accountSettingsFormButton'>
                <button className='saveChangesButton' type='button' onClick={handleFormSubmit}>Save Changes</button>
              </div>
            </div>
          </div>
        </form>
        <div className='gameSettingsDiv'>
          <h2>Do you want to link a new game to your account?</h2>
          <p>Click the button below to access your Game Settings!</p>
          <div className='gameSettingsButtonDiv'>
            <button className='gameSettingsButton' onClick={navigateToGameSettings}>Game Settings ▸</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountSettings;