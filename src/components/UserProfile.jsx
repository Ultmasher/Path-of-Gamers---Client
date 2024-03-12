import React, { useState } from 'react';
import '../styles/ProfilePage.css';
import ProfileTabMenu from './ProfileTabMenu';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({
    id: 2,
    username: 'Moustafa',
    avatar: 'https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png',
    followers: 10,
  });
  const [isFollowing, setIsFollowing] = useState(false);
  // const {userid} = useParams();

  // console.log(currentUser);
  const handleFollow = () => {
    const url = isFollowing ? '/unfollow' : '/follow';
    followUser(user.id);
  };

  const followUser = async (userId) => {  
    fetch(`http://localhost:8000/follow/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        followerId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollowing(!isFollowing);
        console.log(data);
      });
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
          <p>{user ? `Followers: ${user.followers}` : 'Loading...'}</p>
            <button onClick={handleFollow} className='followBtn pogBtn'>
              {isFollowing ? 'Followed' : 'Follow +'}
            </button>
        </div>
      </div>

      <div className='profilePageRight'>
        <div className='profilePageTopContent'>
          <h1>User Profile</h1>
          <h3>
            <span className='lastSeenTitle'>Last seen:</span> 12 Hours Ago
          </h3>
          {/* <p className='bioText'>{currentUser.bio}</p> */}
        </div>
        <div className='profilePageTabMenu'>
          <ProfileTabMenu />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
