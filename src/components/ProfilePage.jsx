import React, { useState, useEffect } from 'react';
import '../styles/ProfilePage.css';
import ProfileTabMenu from './ProfileTabMenu';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { id } = useParams();
    
    const { user, token } = useAuth();
    const [user1, setUser1] = useState({});

    //const isFollowing = (followers) => followers.includes(currentUserID);

    useEffect(() => {
        const getSingleUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser1(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Request failed with status code', error.response.status);
                } else {
                    console.error('Error during request setup:', error.message);
                }
            }
        };

        if (id) {
            getSingleUser(); // Call the function to fetch user data only if id is not null
        }
    }, [id, token]);

    return (
        <div className='profilePageContainer'>

            {Object.keys(user1).length && Object.keys(user).length  ? (
              <>
                <div className='profilePageLeft'>
                    <img className='userAvatarSettingsImg' src={user1.avatar} alt='blankProfile' />
                    <h2>{user1.username}</h2>
                    <button className='followBtn pogBtn' >{user1.followers.some(follower => follower._id === user._id) ? 'Unfollow' : 'Follow' }</button>
                </div>
                <div className='profilePageRight'>
                  <div className='profilePageTopContent' >
                      <h1>User Profile</h1>
                      <h3><span className='lastSeenTitle'>Last seen:</span> 12 Hours Ago</h3>
                      <p className='bioText'>{id ? user1.bio : user.bio}</p>
                </div>
                <div className='profilePageTabMenu'>
                    <ProfileTabMenu user1={user1} id={id} />
                </div>
            </div>

            </>


            ) : null}

            
        </div>
    );
};

export default ProfilePage;
