import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import '../styles/HomeFeed.css';
import { useAuth } from '../context/AuthContext';

const HomeFeed = () => {
  const [showComments, setShowComments] = useState(false);

  // WILL TAKE THESE VALUES BELOW AS PROPS
  const [commentAuthorAvatar, setCommentAuthorAvatar] = useState(
    "https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png"
  );
  const [commentId, setCommentId] = useState(1);
  const [commentText, setCommentText] = useState(
    "Thrilling matchups and strategic plays at the League of Legends event! The intense competition showcased top-tier skills and kept us on the edge of our seats. Can't wait for the next showdown in the Summoner's Rift! #LeagueOfLegends #EsportsExcitement"
  );
  const [commentAuthor, setCommentAuthor] = useState(117);
  const [commentDate, setCommentDate] = useState("2023-03-01 12:02:53");
  const [commentImg, setCommentImg] = useState(
    "https://nexus.leagueoflegends.com/wp-content/uploads/2019/11/ase1920clear_xzacpjebut2xunpks7x1.jpg"
  );
  const [commentComments, setCommentComments] = useState(3);
  const [listOfComments, setListOfComments] = useState([
    {
      commentId: 2,
      commentText:
        "I was there too! It was an amazing event and I can't wait for the next one. The energy in the stadium was electrifying!",
      commentAuthor: 118,
      commentDate: "2023-03-01 12:02:53",
    },
    {
      commentId: 3,
      commentText:
        "Let's GOOOOOOOOOO! #PoG #LeagueOfLegends #EsportsExcitement",
      commentAuthor: 119,
      commentDate: "2023-03-01 12:02:53",
    },
    {
      commentId: 4,
      commentText:
        "I'm so glad I got to see this live! The crowd was amazing and the games were intense! #LeagueOfLegends #EsportsExcitement #PoG",
      commentAuthor: 120,
      commentDate: "2023-03-01 12:02:53",
    },
  ]);
  const [commentLikes, setCommentLikes] = useState(12);
  const likePost = () => {
    setCommentLikes(commentLikes - 1);
  };

  const showHideComments = () => {
    console.log(showComments)
    setShowComments(!showComments);
  };

  const [loading, setLoading] = useState(true);
  const [postImage, setPostImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const { user, token } = useAuth();
  const [selectedGame, setSelectedGame] = useState('');
  const [postData, setPostData] = useState({
    content: '',
    game: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/games')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    axios.get('http://localhost:8000/post')
      .then(response => {
        setPosts(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

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
      console.log("Post submitted:", response.data);
      // Clear the form after successful submission
      setPostData({ content: '', game: '' });
      setPostImage(null);
      setIsOpen(true);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString(undefined, options);
  };

  console.log(posts)
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
        {posts.map((post, index) => (
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
                {post && post.image ? <img className="commentMediaImg" src={`data:image/jpeg;base64,${post.image}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}

                <p
                  className={!post.commentImg ? "commentText soloTextComment" : "commentText textAndImgComment"}
                >
                  {post.content}
                </p>
                <div className="commentActions">
                  <div className="commentLikeButtonDiv">
                    <span className="material-symbols-outlined likeSymbol" onClick={likePost}>
                      favorite
                    </span>
                    {post.likes.length}
                  </div>
                  <div className="commentCommentButtonDiv" onClick={showHideComments}>
                    <span className="material-symbols-outlined commentSymbol">
                      comment
                    </span>
                    {post.comments.length}
                  </div>
                </div>

                {showComments && (
                  <div className="commentComments">
                    <div className="subcommentList">
                      {post.comments.map(subcomment => (
                        <div className="singleSubcomment" key={subcomment.commentId}>
                          <div className="subcommentBody">
                            <div className="subcommentHeader">
                              <div className="subcommentAuthorAvatar">
                                <img src={subcomment.commentAuthorAvatar} alt="userAvatar" className="subcommentAvatar" />
                              </div>
                              <div className="subcommentHeaderInfo">
                                <h3 className="subcommentAuthor">PoG Username #{subcomment.commentAuthor}</h3>
                                <h4 className="subcommentDate">{subcomment.commentDate}</h4>
                              </div>
                            </div>
                            <div className="subcommentTextDiv">
                              <p className="subcommentText">{subcomment.commentText}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


                    <div className="subcommentInputDiv">
                      {post && post.image ? <img className="subcommentSubmitAvatar" src={`data:image/jpeg;base64,${user.avatar}`} alt='blankProfile' /> : <img src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' />}
                      <input type="text" placeholder="Write a comment..." className="subcommentInput" />
                      <button className="subcommentSubmitButton">Submit</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
        Your post has been posted!
      </Modal>
    </div>
  );
};

export default HomeFeed;
