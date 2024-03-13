import React, { useState, useEffect } from "react";
import AboutTab from "./ProfileTabs/AboutTab";
import PoGTab from "./ProfileTabs/PoGTab";
import UserComment from "./UserComment";
import UserEventPost from "./UserEventPost";
import "../styles/ProfileTabMenu.css";
import Followers from "./ProfileTabs/Follower";
import Following from "./ProfileTabs/Following";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const ProfileTabMenu = ({ user1, id }) => {
  const [loading, setLoading] = useState(true);
  const [toggleState, setToggleState] = useState(1);
  const [selectedFilterGame, setSelectedFilterGame] = useState("");
  const [selectedGameClass, setSelectedGameClass] = useState("gameFilterLogo")
  const [posts, setPosts] = useState([]);
  const [showCommentsId, setShowCommentsId] = useState(null);
  const handleFilterGameChange = (e) => {
    setSelectedFilterGame(e.target.value);
  };

  const [games, setGames] = useState([]);
  const { user, token } = useAuth();
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesResponse = await axios.get("http://localhost:8000/games");
        setGames(gamesResponse.data);

        const postsResponse = await axios.get(`http://localhost:8000/post/${user._id}/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : null,
          }
        });
        setPosts(postsResponse.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);


  return (
    <div className="tabContainer">
      <div className="blockTabs">
        <div
          className={toggleState === 1 ? 'profileTab activeProfileTab' : 'profileTab'}
          onClick={() => toggleTab(1)}
        >
          Posts
        </div>
        <div
          className={toggleState === 2 ? 'profileTab activeProfileTab' : 'profileTab'}
          onClick={() => toggleTab(2)}>
          PoG
        </div>
        <div
          className={toggleState === 3 ? 'profileTab activeProfileTab' : 'profileTab'}
          onClick={() => toggleTab(3)}>
          ABOUT
        </div>
        <div
          className={toggleState === 4 ? 'profileTab activeProfileTab' : 'profileTab'}
          onClick={() => toggleTab(4)}>
          FOLLOWERS
        </div>
        <div
          className={toggleState === 5 ? 'profileTab activeProfileTab' : 'profileTab'}
          onClick={() => toggleTab(5)}>
          FOLLOWINGS
        </div>

      </div>


      <div className={toggleState === 1 ? 'tabContent activeTabContent' : 'tabContent'}>
          <div className="filterPostsDropdownDiv">
            <label htmlFor="filterByGame">Filter Posts By Game:</label>
            <select
              id="filterByGame"
              name="filterByGame"
              value={selectedFilterGame}
              onChange={handleFilterGameChange}
            >
              {games.map(game => (
                <option key={game._id} value={game._id}>{game.name}</option>
              ))}
            </select>
          </div>
          {posts.map((post, index) => {
            // Filter posts based on selected game
            if (selectedFilterGame && post.game && post.game._id !== selectedFilterGame) {
              return null;
            }
            return (

              <div className="singleCommentContainer" key={index}>
                <div className="singleCommentContainer" key={index}>
                  <div className="commentAuthorAvatar">

                    {post && post.user.avatar && (
                      <img className='commentAvatar' src={post.user.avatar} alt='userAvatar' onClick={() => handleAvatarClick(post.user._id)} />
                    )}

                  </div>
                  <div className="commentBody">
                    <div className="commentHeader">
                      <h3 className="commentAuthor">PoG Username #{post.user.username}</h3>
                      <h4 className="commentDate">{formattedDate(post.created)}</h4>
                    </div>
                    <div className="commentLower">
                      {post && post.image ? (
                        <img
                          className="commentMediaImg"
                          src={post.image}
                          alt="blankProfile"
                        />
                      ) : null}
                      <p
                        className={
                          !post.commentImg
                            ? "commentText soloTextComment"
                            : "commentText textAndImgComment"
                        }
                      >
                        {post.content}
                      </p>
                      <div className="commentActions">
                        <div className="commentLikeButtonDiv">
                          <span
                            className={`material-symbols-outlined likeSymbol ${post.likes.includes(user._id) ? "liked" : ""
                              }`}
                            onClick={() => handleLikePost(post._id)}
                          >
                            favorite
                          </span>
                          {post.likes.length}
                        </div>
                        <div
                          className="commentCommentButtonDiv"
                          onClick={() => handleToggleComments(post._id)}
                        >
                          <span className="material-symbols-outlined commentSymbol">
                            comment
                          </span>
                          {post.comments.length}
                        </div>
                      </div>
                      {showCommentsId === post._id && (
                        <div className="commentComments">
                          <div className="subcommentList">
                            {post.comments.map((comment) => (
                              <div className="singleSubcomment" key={comment._id}>
                                <div className="subcommentBody">
                                  <div className="subcommentHeader">
                                    <div className="subcommentAuthorAvatar">
                                      {post ? (
                                        <img
                                          className="subcommentAvatar"
                                          src={comment.userId.avatar}
                                          alt="userAvatar"
                                        />
                                      ) : (
                                        <img src="https://asets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png" />
                                      )}
                                    </div>
                                    <div className="subcommentHeaderInfo">
                                      <h3 className="subcommentAuthor">
                                        PoG Username #{comment.userId.name}
                                      </h3>
                                      <h4 className="subcommentDate">
                                        {formattedDate(comment.created)}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="subcommentTextDiv">
                                    <p className="subcommentText">
                                      {comment.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="subcommentInputDiv">
                            {post ? (
                              <img
                                className="subcommentSubmitAvatar"
                                src={user.avatar}
                                alt="blankProfile"
                              />
                            ) : (
                              <img src="https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png" />
                            )}
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              className="subcommentInput"
                              value={comment}
                              onChange={handleCommentInputChange}
                            />
                            <button
                              className="subcommentSubmitButton"
                              onClick={() => handleSubmitComment(post._id)}
                              disabled={!comment.trim()}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={toggleState === 2 ? 'tabContent activeTabContent' : 'tabContent'}>
          <PoGTab />
        </div>

        <div className={toggleState === 3 ? 'tabContent activeTabContent' : 'tabContent'}>
          <AboutTab user1={user1} id={id} />
        </div>

        <div className={toggleState === 4 ? 'tabContent activeTabContent' : 'tabContent'}>
          <Followers />
        </div>

        <div className={toggleState === 5 ? 'tabContent activeTabContent' : 'tabContent'}>
          <Following />
        </div>
      </div>
    
  );
};

export default ProfileTabMenu;
