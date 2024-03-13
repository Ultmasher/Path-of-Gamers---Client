import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import ProfileTabMenu from "./ProfileTabMenu";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  console.log(id);
  const { user, token } = useAuth();
  const [user1, setUser1] = useState({});

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/user/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser1(response.data);
      } catch (error) {
        if (error.response) {
          console.error(
            "Request failed with status code",
            error.response.status
          );
        } else {
          console.error("Error during request setup:", error.message);
        }
      }
    };

    if (id) {
      getSingleUser(); // Call the function to fetch user data only if id is not null
    }
  }, [id, token]);
  // const handleFollow = async () => {
  //     try {
  //         // Assuming your endpoint for toggling follow/unfollow is '/user/follow/{id}'
  //         // And 'id' is the ID of the user to be followed/unfollowed
  //         // 'user._id' is the ID of the current logged-in user performing the action
  //         const response = await axios.post(`http://localhost:8000/user/follow/${user1._id}`, {}, {
  //             headers: {
  //                 'Authorization': `Bearer ${token}`
  //             }
  //         });

  //         // After toggling the follow state, refresh the user1's information to reflect changes
  //         const updatedUserResponse = await axios.get(`http://localhost:8000/user/user/${id}`, {
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${token}`
  //             }
  //         });
  //         setUser1(updatedUserResponse.data);
  //         console.log(response.data.message); // Log the success message
  //     } catch (error) {
  //         if (error.response) {
  //             console.error('Request failed with status code', error.response.status);
  //         } else {
  //             console.error('Error during request:', error.message);
  //         }
  //     }
  // };

  console.log(user1);

  return (
    <div className="profilePageContainer">
      {id ? (
        <div className="profilePageLeft">
          <div className="profilePageUserCard">
            <img
              className="userAvatarSettingsImg"
              src={user1.avatar}
              alt="blankProfile"
            />
            <h2>{user1.username}</h2>
            <button className="followBtn pogBtn">Follow +</button>
          </div>
        </div>
      ) : (
        <div className="profilePageLeft">
          <div className="profilePageUserCard">
            <img
              className="userAvatarSettingsImg"
              src={user.avatar}
              alt="blankProfile"
            />
            <h2>{user.username}</h2>
            <button className="followBtn pogBtn">Follow +</button>
          </div>
        </div>
      )}
      <div className="profilePageRight">
        <div className="profilePageTopContent">
          <h1>User Profile</h1>
          <h3>
            <span className="lastSeenTitle">Last seen:</span> 12 Hours Ago
          </h3>
          <p className="bioText">{id ? user1.bio : user.bio}</p>
        </div>
        <div className="profilePageTabMenu">
          <ProfileTabMenu user1={user1} id={id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
