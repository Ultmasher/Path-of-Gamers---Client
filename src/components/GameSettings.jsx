import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import '../styles/GameSettings.css';

import legaueOfLegendsLogo from '../assets/GameAssets/leagueoflegends.png';
import fifa24Logo from '../assets/GameAssets/eafc24.png';
import fortniteLogo from '../assets/GameAssets/fortnite.png';

const GameSettings = () => {

  const handleSelectGame = (game) => {
    selectedGame === game.name ? setSelectedGame('') : setSelectedGame(game.name);
  };

  const handleAddGame = () => {
    console.log('Add Game');
    navigate('/addgame');
  };

  const navigateToAccountSettings = () => {
    navigate('/account');
  };

  const gameList = [

    {
      name: 'League of Legends',
      logo: legaueOfLegendsLogo
    },

    {
      name: 'EA: FC24',
      logo: fifa24Logo
    },

    {
      name: 'Fortnite',
      logo: fortniteLogo
    }

  ];


  return (
    <div className='gameSettingsContainer'>
      <div className='gameSettingsContent'>

          <h1 className='gameSettingsTitle'>Game Settings</h1>

          <div className='gameSettingsColumns'>

          <div className='gameSettingsLeft'>
            <div className='gameSettingsInstructions'>
              <ol>
                <li>Click on the game from the list below that you want to add to your profile</li>
                <li>Click on the 'ADD GAME +' button beaneath the list</li>
                <li>You will then be directed on how to link your PoG account to the game!</li>
              </ol>
            </div>

            <div className='gameSettingsBackBtnDiv'>
            <button className='backBtn' onClick={navigateToAccountSettings} >⏴&nbsp;&nbsp; Account Settings</button>
            </div>
          </div>

          <div className='gameSettingsRight'>

            <div className='gameSettingsGameList'>
                {gameList.map((game, index) => {
                  return (
                    <div key={index} className={selectedGame === game.name ? 'selectedGameItem gameSettingsGameItem' : 'gameSettingsGameItem'} onClick={() => handleSelectGame(game)} >
                      <img src={game.logo} alt={game.name} />
                      <p className='gameSettingsGameTitle'>{game.name}</p>
                    </div>
                  )
                })}
            </div>

            <div className='gameSettingsAddGameBtnDiv'>
              <button disabled={!selectedGame ?  true : false} className={!selectedGame ? 'addGameBtn disabledBtn' : 'addGameBtn activeAddGameBtn'} onClick={handleAddGame}>Add Game&nbsp;&nbsp;+</button>
            </div>

          </div>

          </div>

      </div>
    </div>
  )
}

export default GameSettings;