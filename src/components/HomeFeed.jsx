import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import "../styles/HomeFeed.css";
import API from "../../API";

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [postImage, setPostImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const { postPost } = API();

  const [postData, setpostData] = useState({
    content: "",
    image: "",
    user: user.id,
    game: user.game,
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await postPost(postData);
      console.log("Post data submitted:", postData);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleChange = (e) => {
    const { user, value } = e.target;
    setpostData({
      ...postData,
      [user]: value,
    });
  };


  const postSubmit = async (e) => {
    e.preventDefault();
    if (!postData.post) {
      console.error("No post text found");
      return;
    }
    const newPostData = new FormData();
    newPostData.append("post", postData.content);
    try {
      const response = await axios.post(
        "http://localhost:8000/posts",
        newPostData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data);
      console.log("Post submitted:", response.data);
    } catch (error) {
      console.error("Error submitting Post:", error);
    }
  };

  //const handlePostImageChange = (event) => {
    //setPostImage(event.target.files[0]);
  //};
  console.log("THE USER! ", user);


  return (
    <div>
      <form onSubmit={postSubmit} className="eventInputsWrapper">
        <label className="" htmlFor="bio">
          {" "}
          Create a post:
        </label>
        <textarea
          className="textarea"
          rows="8"
          cols="100"
          maxLength="150"
          id="bio"
          name="bio"
          value={postData.post}
          onChange={(e) => setpostData({ ...postData, post: e.target.value })}
          placeholder="What are you thinking about?"
        />
        <label htmlFor="game">Choose Post Game:</label>
        <select id="game" name="game">
          <option value="Fortnite">Fortnite</option>
          <option value="FIFA24">FIFA24</option>
          <option value="League of Legends">League of Legends</option>
        </select>
        <div htmlFor="profile-picture" style={{ backgroundImage: `url('')` }}>
          <input
            className="changeAvatarButton"
            src=""
            type="file"
            id="profile-picture"
            name="profile-picture"
            accept="image/png, image/jpeg"
            onChange={handlePostSubmit}d
          />
        </div>
        <div className="">
          <button
            className="changeAvatarButton"
            onClick={() => setIsOpen(true)}
          >
            Post
          </button>
        </div>
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <img src={post.image} alt="Post" />
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </form>

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
