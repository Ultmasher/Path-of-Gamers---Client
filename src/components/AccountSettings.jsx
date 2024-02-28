import { useNavigate } from 'react-router';
import '../styles/AccountSettings.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AccountSettings = () => {
    
    const [file, setFile] = useState();
    const [avatarImage, setAvatarImage] = useState('');

    useEffect(() => {
        const fetchAvatarImage = async () => {
          try {
            const response = await axios.get('https://localhost:8000/upload');
            setAvatarImage(response.data.data.memes);
            console.log(response)
          } catch (error) {
            console.error('Error fetching meme images:', error);
          }
        }

        fetchAvatarImage();
      }, []);

    const navigate = useNavigate()

    const navigateToGameSettings = () => {
        navigate('/account/game-settings')
    };

    return (
        <div className='accountSettingsContainer'>
            <div className='accountSettingsLeft'>
                <img className='userAvatarSettingsImg' src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' alt='blankProfile' />
                <input type="file" onChange={function(e) { setFile(e.target.files[0]) }} />
                <button className='changeAvatarButton' onClick={upload}>Change Avatar</button>
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

                        <button className='saveChangesButton' >Save Changes</button>

                    </div>       
                </div>
                <div className='gameSettingsButtonDiv'>
                    <button className='gameSettingsButton' onClick={navigateToGameSettings}>Game Settings ▸</button>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings;
