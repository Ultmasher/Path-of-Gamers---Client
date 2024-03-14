import React, { useState } from "react";
import "../styles/UserComment.css";

const UserComment = ({props}) => {


  let commentData = props;

  if (!commentData) {
    return <div></div>;
  }

  console.log(commentData);


  const [showComments, setShowComments] = useState(false);

  // WILL TAKE THESE VALUES BELOW AS PROPS
  const [commentAuthorAvatar, setCommentAuthorAvatar] = useState(
    "https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png"
  );
  const [commentId, setCommentId] = useState(1);
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
    setShowComments(!showComments);
  };

  console.log(commentData.likes.length);

  return (
    <div className="singleCommentContainer">
      <div className="commentAuthorAvatar">
        <img
          src={commentAuthorAvatar}
          alt="userAvatar"
          className="commentAvatar"
        />
      </div>

      <div className="commentBody">
        <div className="commentHeader">
          <h3 className="commentAuthor">{commentData.user.name}</h3>
          <h4 className="commentDate">{commentData.created}</h4>
        </div>
        <div className="commentLower">
          {commentImg && (
            <img src={commentImg} alt="gameLogo" className="commentMediaImg" />
          )}
          <p
            className={
              !commentImg
                ? "commentText soloTextComment"
                : "commentText textAndImgComment"
            }
          >
            {commentData.content}
          </p>
          <div className="commentActions">
            <div className="commentLikeButtonDiv">
              <span
                className="material-symbols-outlined likeSymbol"
                onClick={likePost}
              >
                favorite
              </span>
              {commentData.likes.length}
            </div>
            <div className="commentCommentButtonDiv" onClick={showHideComments}>
              <span className="material-symbols-outlined commentSymbol">
                comment
              </span>
              {commentData.comments.length}
            </div>
          </div>

          {showComments && (
            <div className="commentComments">
              <div className="subcommentList">
                {listOfComments.map((comment) => (
                  <div className="singleSubcomment" key={comment.commentId}>
                    <div className="subcommentBody">
                      <div className="subcommentHeader">
                        <div className="subcommentAuthorAvatar">
                          <img
                            src={commentAuthorAvatar}
                            alt="userAvatar"
                            className="subcommentAvatar"
                          />
                        </div>
                        <div className="subcommentHeaderInfo">
                          <h3 className="subcommentAuthor">
                            PoG Username #{comment.commentAuthor}
                          </h3>
                          <h4 className="subcommentDate">
                            {comment.commentDate}
                          </h4>
                        </div>
                      </div>
                      <div className="subcommentTextDiv">
                        <p className="subcommentText">{comment.commentText}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="subcommentInputDiv">
                <img src={commentAuthorAvatar} alt="userAvatar" className="subcommentSubmitAvatar" />
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="subcommentInput"
                />
                <button className="subcommentSubmitButton">Submit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserComment;