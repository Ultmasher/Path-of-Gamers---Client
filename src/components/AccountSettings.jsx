import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';
import Modal from './Modal';

const AccountSettings = () => {
    // const [avatarUrl, setAvatarUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    // const [base64Image, setBase64Image] = useState('');
    const [user,setUser] = useState("")

    useEffect(() => {


      const fetchUser = async () => {
          
        try {
          const response = await axios.get(`http://localhost:8000/user/65dc65e3c92b7f3839eb1565`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setUser(response.data);
          console.log(response)
        } catch (err) {
            console.log(err)
         
        }
      };
      fetchUser();
    }, []); 
    
    //   const defaultAvatarUrl = 'https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png';

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        surname: "",
        birthdate: "",
        birthplace: "",
        bio: "",
        password: ""
    });

    const [avatarData, setAvatarData] = useState({
        avatar: "",
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

    return (
        <div className='accountSettingsContainer'>
          <div className='accountSettingsLeft'>
            <img
              className='userAvatarSettingsImg'
              src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png'
              alt='blankProfile'
            />
            <input type="file" id="profile-picture" name="profile-picture" accept="image/*" />
            <button className='changeAvatarButton' onClick={() => setIsOpen(true)}>
              Change Avatar
            </button>
            <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
              Your avatar picture has been changed!
            </Modal>
            <h2>PoG Username #117</h2>
          </div>
    
          <div className='accountSettingsRight'>
            <div className='accountSettingsContent'>
              <h1>Account Settings</h1>
              <div className='accountSettingsForm'>
                <div className='accountSettingsFormInputs'>
                  <div className='accountSettingsFormLeft'>
                    <label htmlFor='username'>Username:</label>
                    <input type='text' id='username' name='username' placeholder='PoG Username #117' onChange={handleChange} />
    
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' placeholder="email@gmail.com" onChange={handleChange} />
    
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' placeholder="Enter New Password" onChange={handleChange} />
                  </div>
    
                  <div className='accountSettingsFormRight'>
                    <label htmlFor='region'>Region:</label>
                    <select className='regionSelect' id='region' name='region' onChange={handleChange} value={formData.region}>
                      <option value='na'>EU: West</option>
                      <option value='eu'>EU: East</option>
                    </select>
    
                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' name='firstName' placeholder='John' onChange={handleChange} />
    
                    <label htmlFor='surname'>Last Name:</label>
                    <input type='text' id='surname' name='surname' placeholder='Doe' onChange={handleChange} />
                  </div>
                </div>
                <div className='accountSettingsFormButton'>
                  <button className='saveChangesButton' type='button' onClick={handleFormSubmit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            <div className='gameSettingsDiv'>
              <h2>Do you want to link a new game to your account?</h2>
              <p>Click the button below to access your Game Settings!</p>
              <div className='gameSettingsButtonDiv'>
                <button className='gameSettingsButton' onClick={navigateToGameSettings}>
                  Game Settings ▸
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }





export default AccountSettings;

