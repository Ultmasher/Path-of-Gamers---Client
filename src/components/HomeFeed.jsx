import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import '../styles/HomeFeed.css';
import { useAuth } from '../context/AuthContext';

const HomeFeed = () => {
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
    newPostData.append('image', postImage); // No need to convert to base64

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

  return (
    <div>
      <form onSubmit={handlePostSubmit} className='eventInputsWrapper'>
        <label htmlFor="bio">Create a post:</label>
        <textarea
          rows="8"
          cols="100"
          maxLength="150"
          id='bio'
          name='bio'
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          placeholder='What are you thinking about?'
        />
        <label htmlFor="game">Choose Post Game:</label>
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
        <div htmlFor="profile-picture">
          <input
            type="file"
            id="profile-picture"
            name="profile-picture"
            accept="image/png, image/jpeg"
            onChange={handlePostImageChange}
          />
        </div>
        <div>
          <button className='changeAvatarButton'>Post</button>
        </div>
      </form>
      <Modal className='Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
        Your post has been posted!
      </Modal>
    </div>
  );
};

export default HomeFeed;
