import React, { useState } from 'react';
import '../styles/ProfilePage.css';
import ProfileTabMenu from './ProfileTabMenu';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  console.log(currentUser);

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
  };

  return (
    <div className='profilePageContainer'>
      <div className='profilePageLeft'>
        <div className='profilePageUserCard'>
          {user && user.avatar ? (
            <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' />
          ) : (
            <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />
          )}
          <h2>{user.username}</h2>
          <p>{user ? `Followers: ${user.followers.length}` : 'Loading...'}</p>
          {isFollowing ? (
            <button onClick={() => unfollowUser(user.id)} className='unfollowBtn pogBtn'>
              Unfollow
            </button>
          ) : (
            <button onClick={() => followUser(user.id)} className='followBtn pogBtn'>
              {isFollowing ? 'Followed' : 'Follow +'}
            </button>
          )}
        </div>
      </div>

      <div className='profilePageRight'>
        <div className='profilePageTopContent'>
          <h1>User Profile</h1>
          <h3>
            <span className='lastSeenTitle'>Last seen:</span> 12 Hours Ago
          </h3>
          <p className='bioText'>{currentUser.bio}</p>
        </div>
        <div className='profilePageTabMenu'>
          <ProfileTabMenu />
        </div>
        <div className='profilePageUserCard'>
          {user && user.avatar ? (
            <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' />
          ) : (
            <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />
          )}
          <h2>{user.username}</h2>
          <p>{user ? `Followers: ${user.followers.length}` : 'Loading...'}</p>
          {user && user.followers.includes(currentUser.id) ? (
            <button onClick={() => unfollowUser(user.id)} className='unfollowBtn pogBtn'>
              Unfollow
            </button>
          ) : (
            <button onClick={() => followUser(user.id)} className='followBtn pogBtn'>
              Follow +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
