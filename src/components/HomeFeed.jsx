
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import '../styles/HomeFeed.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

import UserComment from "./UserComment";

import fortniteLogo from "../assets/GameAssets/fortnite.png";
import teamfightLogo from "../assets/GameAssets/teamfight.png";
import leagueLogo from "../assets/GameAssets/leagueoflegends.png";

const HomeFeed = () => {
  const [loading, setLoading] = useState(true);
  const [showCommentsId, setShowCommentsId] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [comment, setComment] = useState("");
  const { user, token } = useAuth();
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedGameClass, setSelectedGameClass] = useState("gameFilterLogo")
  const [postData, setPostData] = useState({
    content: "",
    game: "",
  });
  const navigate = useNavigate()

  const handleCommentInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/comment`,
        {
          content: comment,
          userId: user._id,
          postId: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesResponse = await axios.get("http://localhost:8000/games");
        setGames(gamesResponse.data);

        const postsResponse = await axios.get("http://localhost:8000/post");
        setPosts(postsResponse.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/like",
        { postId }, // Include postId in the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      // Assuming the response contains the updated post data
      const updatedPost = response.data.post;

      // Update the posts state with the updated post data
      const updatedPosts = posts.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const changeSelectedGameClass = (game) => {
    if (game === selectedGame) {
      setSelectedGameClass("gameFilterLogo selectedGameFilterLogo");
    } else {
      setSelectedGameClass("gameFilterLogo");
    }
  };

  // const handleGameChange = (e, gameSelected) => {
  //   console.log(gameSelected);
  //   setSelectedGame(selectedGame);
  //   changeSelectedGameClass(gameSelected);
  //   setPostData({ ...postData, game: selectedGame });
  // };

  const handleGameChange = (game) => {
    setSelectedGame(game._id);
    setPostData({ ...postData, game: game._id });
  };

  const handlePostImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Prepare post data
    const newPostData = new FormData();
    newPostData.append("content", postData.content);
    newPostData.append("gameId", selectedGame);
    newPostData.append("userId", user._id);
    newPostData.append("picture", postImage); // No need to convert to base64

    try {
      const response = await axios.post(
        "http://localhost:8000/post",
        newPostData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );
      // Clear the form after successful submission
      setPostData({ content: "", game: "" });
      setPostImage(null);
      setIsOpen(true);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

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

  const handleToggleComments = (postId) => {
    setShowCommentsId(showCommentsId === postId ? null : postId);
  };

  const [selectedFilterGame, setSelectedFilterGame] = useState("");

  const handleFilterGameChange = (e) => {
    setSelectedFilterGame(e.target.value);
  };


  const handleAvatarClick = (userId) => {
    navigate(`profile/${userId}`);
  }

  return (
    <div className="homefeedContainer">
      <div className="postsWrap">
        <h1 className="homefeedTitle">HOMEFEED</h1>
        <form onSubmit={handlePostSubmit} className="eventPostWrapper">
          <div className="newPostFormTop">
            <img
              className="homepagePostAvatar"
              src={user.avatar}
              alt="ProfilePic"
            />{" "}
            <textarea
              className="newPostFormTextArea"
              rows="1"
              cols="100"
              maxLength="150"
              id="post"
              name="post"
              value={postData.content}
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
              placeholder="What are you thinking about?"
            />
            <label htmlFor="profile-picture" className="custom-file-upload">
              <span className="material-symbols-outlined uploadPicBtn">
                upload
              </span>
            </label>
            <input
              type="file"
              id="profile-picture"
              name="picture"
              accept="image/*"
              onChange={handlePostImageChange}
            />
          </div>
          <div className="newPostFormBottom">
          <div className="gameFilterDiv">
        <label htmlFor="game">Select Game:</label>
        {games.map((game) => (
          <img
            key={game._id}
            src={game.image}
            className={`gameFilterLogo ${game._id === selectedGame ? 'selectedGameFilterLogo' : ''}`}
            onClick={() => handleGameChange(game)}
          />
        ))}
      </div>
            <div className="postButtonsDiv">
              <div htmlFor="profile-picture"></div>
              <div>
                <button className="changeAvatarButton">Post</button>
              </div>
            </div>
          </div>
        </form>
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
                          disabled={!selectedGame || !comment}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        className="Modaltext"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        Your post has been posted!
      </Modal>
    </div>
  );
};

export default HomeFeed;
