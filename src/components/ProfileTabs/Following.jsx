import React, { useState, useEffect } from 'react';
import "../../styles/follow.css"
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Following = () => {
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
            setFecthedUser(response.data.following)
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
            {fetchedUser.length === 0 ? <h1>No followings</h1> : 
            <div >
                {fetchedUser.map((following, index) => (
                    <div className='card' key={index}>
                        <img src={following.avatar} alt={`Profile of ${following.name}`} />
                        <p>{following.name}</p>
                    </div>     
                ))}
            
            </div>
            }
                            
                    
            
            </>
    )
}

export default Following;