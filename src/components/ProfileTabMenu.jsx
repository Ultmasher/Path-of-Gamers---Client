import React, { useState } from "react";
import "../styles/ProfileTabMenu.css";

const ProfileTabMenu = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tabContainer">
      <div className="blockTabs">
        <div
          className={toggleState === 1 ? 'profileTab activeProfileTab' : 'profileTab'}
          onClick={() => toggleTab(1)}
        >
          User Feed
        </div>
        <div 
        className={toggleState === 2 ? 'profileTab activeProfileTab' : 'profileTab'}
        onClick={() => toggleTab(2)}>
          PoG
        </div>
        <div 
        className={toggleState === 3 ? 'profileTab activeProfileTab' : 'profileTab'}
        onClick={() => toggleTab(3)}>
          ABOUT
        </div>
        <div 
        className={toggleState === 4 ? 'profileTab activeProfileTab' : 'profileTab'}
        onClick={() => toggleTab(4)}>
          FOLLOWERS
        </div>
        <div 
        className={toggleState === 5 ? 'profileTab activeProfileTab' : 'profileTab'}
        onClick={() => toggleTab(5)}>
          FOLLOWING
        </div>

      </div>
                        

        <div className="tabContentWrapper">

            <div className={toggleState === 1 ? 'tabContent activeTabContent' : 'tabContent'}>
                <h2>Content 1</h2>
                <p>Here is some content!</p>
            </div>

            <div className={toggleState === 2 ? 'tabContent activeTabContent' : 'tabContent'}>
                <h2>Content 2</h2>
                <p>Here is some more content!</p>
            </div>

            <div className={toggleState === 3 ? 'tabContent activeTabContent' : 'tabContent'}>
                <h2>Content 3</h2>
                <p>Here is even more content!</p>
            </div>

            <div className={toggleState === 4 ? 'tabContent activeTabContent' : 'tabContent'}>
                <h2>Content 4</h2>
                <p>Here is even more content!</p>
            </div>

            <div className={toggleState === 5 ? 'tabContent activeTabContent' : 'tabContent'}>
                <h2>Content 5</h2>
                <p>Here is even more content!</p>
            </div>



        </div>

    </div>
  );
};

export default ProfileTabMenu;