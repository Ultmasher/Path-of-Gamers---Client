import React, { useState, useEffect } from 'react';
import "../../styles/follow.css"
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Followers = () => {
    const { id } = useParams();
    const { user, token } = useAuth();
    const [fetchedUser,setFecthedUser] = useState([])

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${user._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            setFecthedUser(response.data.followers)
            console.log(fetchedUser)
        } catch (error) {
                console.log(error)
            }
    }
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


    useEffect(() => {
            if(id) {
                getSingleUser();
            } else {
                fetchUserInfo();
            }
        }, [token]);


    

    

    
    return (
            <>
            {fetchedUser.length === 0 ? <h1>No followers</h1> : 
            <div className='follow-container'>
                {fetchedUser.map((follower, index) => (
                    <div className='card' key={index}>
                        <img src={follower.avatar} alt={`Profile of ${follower.name}`} />
                        <p> {follower.name}</p>
                    </div>     
                ))}
            
            </div>
            }
                            
                    
            
            </>
    )
}

export default Followers;

{/* {fetchedUser.length === 0 
                ? <h1>No followers</h1> 
                : fetchedUser.map((follower, index) => (
                        <div key={index}>
                            <p>Name: {follower.name}</p>
                            <p>User ID: {follower.userId}</p>
                            <img src={follower.profileImage} alt={`Profile of ${follower.name}`} />
                        </div>     
                    ))
            } */}