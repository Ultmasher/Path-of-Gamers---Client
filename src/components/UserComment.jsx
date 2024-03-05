import React from 'react'
import '../styles/UserComment.css'

const UserComment = () => {

    // WILL TAKE THESE VALUES BELOW AS PROPS
    const commentAuthorAvatar = "https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png";
    const commentId = 1;
    const commentText = "This is a comment!";
    const commentAuthor = 117;
    const commentDate = "2023-03-01 12:02:53";



  return (
    <div className='singleCommentContainer'>

        <div className='commentAuthorAvatar'>
            <img src={commentAuthorAvatar} alt='userAvatar' className='commentAvatar'/>
        </div>

        <div className='commentBody'>
            <div className='commentHeader'>
                <h3 className='commentAuthor'>PoG Username #{commentAuthor}</h3>
                <h4 className='commentDate'>{commentDate}</h4>
            </div>
            <p className='commentText'>{commentText}</p>
        </div>


    </div>
  )
}

export default UserComment