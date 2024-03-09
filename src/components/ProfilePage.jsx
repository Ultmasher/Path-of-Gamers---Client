import React from 'react';
import '../styles/ProfilePage.css';
import ProfileTabMenu from './ProfileTabMenu';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {

    const { user } = useAuth();
    console.log(user)

    return (
        <div className='profilePageContainer'>
            <div className='profilePageLeft'>
                <div className='profilePageUserCard'>
                {user && user.avatar ? <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}
                <h2>{user.username}</h2>
                <button className='followBtn pogBtn'>Follow +</button>
                </div>
            </div>

            <div className='profilePageRight'>
                <div className='profilePageTopContent' >
                    <h1>User Profile</h1>
                    <h3><span className='lastSeenTitle'>Last seen:</span> 12 Hours Ago</h3>
                    <p className='bioText'>{user.bio}</p>
                </div>
                <div className='profilePageTabMenu'>
                    <ProfileTabMenu />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage