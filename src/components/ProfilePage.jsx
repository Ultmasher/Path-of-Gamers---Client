import React from 'react';
import '../styles/ProfilePage.css';
import ProfileTabMenu from './ProfileTabMenu';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {

    const { user } = useAuth();
    console.log(user)

    const { currentUser } = useAuth();
    const [setUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/user/${currentUser.id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
  
      fetchUser();
    }, [currentUser.id]);

    const followUser = async (userId) => {
        try {
            await axios.post(`http://localhost:8000/follow/${userId}`, { followerId: currentUser.id });
            // Update UI accordingly
          } catch (error) {
            console.error('Error following user:', error);
          }
        };

        const unfollowUser = async (userId) => {
            try {
                await axios.post(`http://localhost:8000/unfollow/${userId}`, { followerId: currentUser.id });
                // Update UI accordingly
              } catch (error) {
                console.error('Error unfollowing user:', error);
              }
            }

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