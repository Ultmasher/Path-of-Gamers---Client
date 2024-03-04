import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';
import Modal from './Modal';
import axios from 'axios';


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
        navigate('/account/game-settings');
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newAvatarData = new FormData();
        newAvatarData.append('avatar', formData.avatar);
        if (avatar) {
            try {
              await avatarSubmit(avatar);
              console.log('Avatar updated successfully');
            } catch (error) {
              console.error('Error updating avatar:', error);
            }
          }
        };

    const avatarSubmit = async (e) => {
        e.preventDefault();
        if (!avatarData.avatar) {
            console.error("No avatar file selected");
            return;
        }
    
        const newAvatarData = new FormData();
        newAvatarData.append('avatar', avatarData.avatar);
    
        try {
            const response = await axios.put('http://localhost:8000/user/avatar/65dc65e3c92b7f3839eb1565', newAvatarData, {
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

    console.log("THE USER! ",user)
    // const handleFileChange = (event) => {
    //     if (event.target.files.length > 0) {
    //       const file = event.target.files[0];
    //       const reader = new FileReader();
    
    //       reader.onloadend = () => {
    //         setBase64Image(reader.result);
    //       };1q   
    
            return (
                <div className='accountSettingsContainer'>
                <div className='accountSettingsLeft'>
                    {user && user?.avatar ? <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png'/> }
                    {/* <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.data.avatar}`} alt='blankProfile' >} */}
                    {/* <img className='userAvatarSettingsImg' src={previewSrc ? previewSrc : 'https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png'} alt='blankProfile' > */}
                    
                    <form onSubmit={avatarSubmit}>
                        <input type="file" id="profile-picture" name="profile-picture" value={formData.avatar}  accept="image/*" onChange={(e) => {
                            const file = e.target.files[0];
                            setAvatarData({
                                ...avatarData,
                                avatar: file,
                            });
                            //setPreviewSrc(URL.createObjectURL(file));
                            //setIsPhotoUploaded(true);
                        }} />
                        <button className='changeAvatarButton' onClick={() => setIsOpen(true) }>Change Avatar</button>
                    </form>
                    <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
                        Your avatar picture has been changed!
                    </Modal>
                    <h2>PoG Username #117</h2>
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

