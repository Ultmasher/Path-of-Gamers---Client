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
                <img className='userAvatarSettingsImg' src={user.avatar} alt='blankProfile' >
                </img>
                <h2>{user.username}</h2>
                <button className='followBtn pogBtn'>Follow +</button>
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