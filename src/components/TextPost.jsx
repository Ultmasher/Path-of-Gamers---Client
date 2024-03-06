import React, { useState } from 'react';

const Post = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Add the comment to the comments array
    setComments([...comments, comment]);
    setComment('');
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleShare = () => {
    // Share the post...
  };

  return (
    <div>
      <h2>Post Title</h2>
      <p>Post content...</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <button onClick={handleShare}>Share</button>
      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="comment">Leave a comment:</label>
        <input type="text" id="comment" value={comment} onChange={handleCommentChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Post;