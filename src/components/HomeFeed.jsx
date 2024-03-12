import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import '../styles/HomeFeed.css';
import { useAuth } from '../context/AuthContext';

const HomeFeed = () => {


  const [loading, setLoading] = useState(true);
  const [showCommentsId, setShowCommentsId] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [comment, setComment] = useState("");
  const { user, token } = useAuth();
  const [selectedGame, setSelectedGame] = useState('');
  const [postData, setPostData] = useState({
    content: '',
    game: '',
  });

  const handleCommentInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8000/user/comment`, {
        content: comment,
        userId: user._id,
        postId: postId

      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : null,
        },
      });
      setComment('');
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/games');
        setGames(response.data);
      } catch (error) {
        console.error('There was a problem fetching games:', error);
      }
    };
  
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/post');
        setPosts(response.data);
      } catch (error) {
        console.error('There was a problem fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false once this request is done
      }
    };
  
    fetchGames();
    fetchPosts();
  }, []);


  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/user/like',
        { postId }, // Include postId in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : null,
          },
        }
      );

      // Assuming the response contains the updated post data
      const updatedPost = response.data.post;

      // Update the posts state with the updated post data
      const updatedPosts = posts.map(post => {
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


  const handleGameChange = (e) => {
    setSelectedGame(e.target.value);
    setPostData({ ...postData, game: e.target.value });
  };

  const handlePostImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Prepare post data
    const newPostData = new FormData();
    newPostData.append('content', postData.content);
    newPostData.append('gameId', selectedGame);
    newPostData.append('userId', user._id);
    newPostData.append('picture', postImage); // No need to convert to base64


    try {
      const response = await axios.post('http://localhost:8000/post', newPostData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : null,
        },
      });
      // Clear the form after successful submission
      setPostData({ content: '', game: '' });
      setPostImage(null);
      setIsOpen(true);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  //formating for date
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString(undefined, options);
  };

  console.log(posts)

  const handleToggleComments = (postId) => {
    setShowCommentsId(showCommentsId === postId ? null : postId);
  };


  return (
    <div>
      <form onSubmit={handlePostSubmit} className='eventPostWrapper'>
        <label htmlFor="post">Create a post:</label>
        <textarea
          rows="1"
          cols="100"
          maxLength="150"
          id='post'
          name='post'
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          placeholder='What are you thinking about?'
        />
        <label htmlFor="game">Choose Game:</label>
        <select
          id="game"
          name="game"
          value={selectedGame}
          onChange={handleGameChange}
        >
          <option value="">Select a game</option>
          {games.map(game => (
            <option key={game._id} value={game._id}>{game.name}</option>
          ))}
        </select>
        <div htmlFor="profile-picture" >
          <label htmlFor="profile-picture" className="custom-file-upload">
            Upload Picture
          </label>
          <input
            type="file"
            id="profile-picture"
            name="picture"
            accept="image/*"
            onChange={handlePostImageChange}
          />
        </div>
        <div>
          <button className='changeAvatarButton'>Post</button>
        </div>
      </form>

      <div className='postsWrap'>
        {posts.length ? posts.map((post, index) => (
          <div className="singleCommentContainer" key={index}>
            <div className="commentAuthorAvatar">
              {post && post.user.avatar ? <img className='userAvatarSettingsImg' src={`data:image/jpeg;base64,${post.user.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}
            </div>
            <div className="commentBody">
              <div className="commentHeader">
                <h3 className="commentAuthor">PoG Username #{post.user.name}</h3>
                <h4 className="commentDate">{formattedDate(post.created)}</h4>
              </div>
              <div className="commentLower">
                {post && post.image ? <img className="commentMediaImg" src={post.image} alt='blankProfile' /> : null}

                <p
                  className={!post.commentImg ? "commentText soloTextComment" : "commentText textAndImgComment"}
                >
                  {post.content}
                </p>
                <div className="commentActions">
                  <div className="commentLikeButtonDiv">
                    <span className="material-symbols-outlined likeSymbol" onClick={() => handleLikePost(post._id)}>
                      favorite
                    </span>
                    {post.likes.length}
                  </div>
                  <div className="commentCommentButtonDiv" onClick={() => handleToggleComments(post._id)}>
                    <span className="material-symbols-outlined commentSymbol">
                      comment
                    </span>
                    {post.comments.length}
                  </div>
                </div>

                {showCommentsId === post._id && (
                  <div className="commentComments">
                    <div className="subcommentList">
                      {post.comments.map(comment => (
                        <div className="singleSubcomment" key={comment._id}>
                          <div className="subcommentBody">

                            <div className="subcommentHeader">
                              <div className="subcommentAuthorAvatar">
                                {comment && post.image ? <img className="commentMediaImg" src={`data:image/jpeg;base64,${comment.userId.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}
                              </div>
                              <div className="subcommentHeaderInfo">
                                <h3 className="subcommentAuthor">PoG Username #{comment.userId.name}</h3>

                                <h4 className="subcommentDate">{formattedDate(comment.created)}</h4>
                              </div>
                            </div>
                            <div className="subcommentTextDiv">
                              <p className="subcommentText">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


                    <div className="subcommentInputDiv">
                      {post && post.image ? <img className="subcommentSubmitAvatar" src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}
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
        )): null}
      </div>
      <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
        Your post has been posted!
      </Modal>
    </div>
  );
};

export default HomeFeed;