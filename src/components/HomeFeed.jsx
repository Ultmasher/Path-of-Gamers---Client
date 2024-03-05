import React, { useState } from 'react';
import Modal from './Modal';

const HomeFeed = () => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePostImageChange = (event) => {
    setPostImage(event.target.files[0]);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the post text and image to the server
    console.log('Post text:', postText);
    console.log('Post image:', postImage);
    setPostText('');
    setPostImage(null);
  };


  return (
    <div>
      
      <form  className='eventInputsWrapper' onSubmit={handlePostSubmit}>
      <label className='' htmlFor="bio"> Create a post:</label>
      <textarea className='textarea' rows="8" cols="100" maxLength="150" id='bio' name='bio'  placeholder='What are you thinking about?' />
      <div htmlFor="profile-picture" style={{backgroundImage: `url('')`}}>
        <input
        className='changeAvatarButton'
          src=''
          type="file"
          id="profile-picture"
          name="profile-picture"
          accept="image/png, image/jpeg"
          onChange={handlePostImageChange}
        />
      </div>
        <div className=''>
        <button className='changeAvatarButton'onClick={() => setIsOpen(true)}>Post</button>

      </div>
      </form>

      <Modal className= 'Modaltext' open={isOpen} onClose={() => setIsOpen(false)}>
        Your post has been posted!
      </Modal>
    </div>
  );
};

export default HomeFeed;