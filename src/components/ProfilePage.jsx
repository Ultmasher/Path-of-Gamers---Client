import React from 'react';
import '../styles/ProfilePage.css';
import ProfileTabMenu from './ProfileTabMenu';

const ProfilePage = () => {
  return (
    <div className='profilePageContainer'>
        <div className='profilePageLeft'>
            <div className='profilePageUserCard'>
                <img className='userAvatarSettingsImg' src='https://assets.practice365.co.uk/wp-content/uploads/sites/1005/2023/03/Default-Profile-Picture-Transparent.png' alt='blankProfile' >
                </img>
                <h2>PoG Username #117</h2>
                <button className='followBtn pogBtn'>Follow +</button>
            </div>
        </div>

        <div className='profilePageRight'>
            <div className='profilePageTopContent' >
                <h1>User Profile</h1>
                <h3><span className='lastSeenTitle'>Last seen:</span> 12 Hours Ago</h3>
                <p className='bioText'>Passionate League of Legends enthusiast with a knack for outplaying opponents and a deep understanding of strategic gameplay. From clutch Baron steals to flashy penta-kills, this player brings an electrifying mix of skill and style to the Summoner's Rift. Join me on this thrilling adventure as we explore the highs and lows of the League, one epic play at a time! 🎮✨ #LeagueOfLegends #GamerLife</p>
            </div>
            <div className='profilePageTabMenu'>
                <ProfileTabMenu />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage