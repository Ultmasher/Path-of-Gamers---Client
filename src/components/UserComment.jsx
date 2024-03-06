import React, { useState } from 'react';

const UserComment = () => {
  const [commentLikes, setCommentLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const [commentAuthorAvatar] = useState("https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png");
  const [commentId] = useState(1);
  const [commentText] = useState("Thrilling matchups and strategic plays at the League of Legends event! The intense competition showcased top-tier skills and kept us on the edge of our seats. Can't wait for the next showdown in the Summoner's Rift! #LeagueOfLegends #EsportsExcitement");
  const [commentAuthor] = useState(117);
  const [commentDate] = useState("2023-03-01 12:02:53");
  const [commentImg] = useState("https://nexus.leagueoflegends.com/wp-content/uploads/2019/11/ase1920clear_xzacpjebut2xunpks7x1.jpg");
  const [commentComments] = useState(3);
  const [listOfComments] = useState([
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

  const likePost = () => {
    setCommentLikes(commentLikes + 1);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

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
          <h3 className="commentAuthor">PoG Username #{commentAuthor}</h3>
          <h4 className="commentDate">{commentDate}</h4>
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
            {commentText}
          </p>
          <div className="commentActions">
            <div className="commentLikeButtonDiv" onClick={likePost}>
              <span className="material-symbols-outlined likeSymbol">
                favorite
              </span>
              {commentLikes}
            </div>
            <div className="commentCommentButtonDiv" onClick={toggleComments}>
              <span className="material-symbols-outlined commentSymbol">
                comment
              </span>
              {commentComments}
            </div>
          </div>

          {showComments && (
            <div className="commentComments">
              {listOfComments.map((comment) => (
                <div className="singleComment" key={comment.commentId}>
                  <div className="commentAuthorAvatar">
                    <img
                      src={commentAuthorAvatar}
                      alt="userAvatar"
                      className="commentAvatar"
                    />
                  </div>
                  <div className="commentBody">
                    <div className="commentHeader">
                      <h3 className="commentAuthor">
                        PoG Username #{comment.commentAuthor}
                      </h3>
                      <h4 className="commentDate">{comment.commentDate}</h4>
                    </div>
                    <p className="commentText">{comment.commentText}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserComment;
