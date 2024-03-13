import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles/GameSettings.css';
import AddGameInformation from './AddGameInformation.jsx';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const GameSettings = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showAddGameInfo, setShowAddGameInfo] = useState(false);
  const navigate = useNavigate();
  const { games } = useAuth();
  console.log(games)

  console.log(games)

  const handleSelectGame = (game) => {
    setSelectedGame(selectedGame === game ? null : game);
  };


  const handleAddGame = () => {
    setShowAddGameInfo(true);
    navigate('/addgame', { state: { selectedGame } });
  };


  const navigateToAccountSettings = () => {
    navigate('/account');
  };


  return (
    <>

      <div className='gameSettingsContainer'>
        <div className='gameSettingsContent'>
          <h1 className='gameSettingsTitle'>Game Settings</h1>
          <div className='gameSettingsColumns'>
            <div className='gameSettingsLeft'>
              <div className='gameSettingsInstructions'>
                <ol>
                  <li>Click on the game from the list below that you want to add to your profile</li>
                  <li>Click on the 'ADD GAME +' button beneath the list</li>
                  <li>You will then be directed on how to link your PoG account to the game!</li>
                </ol>
              </div>
              <div className='gameSettingsBackBtnDiv'>
                <button className='backBtn' onClick={navigateToAccountSettings}>⏴&nbsp;&nbsp; Account Settings</button>
              </div>
            </div>
            <div className='gameSettingsRight'>
              <div className='gameSettingsGameList'>
                {games.map((game, index) => (
                  <div
                    key={index}
                    className={selectedGame && selectedGame.name === game.name ? 'selectedGameItem gameSettingsGameItem' : 'gameSettingsGameItem'}
                    onClick={() => handleSelectGame(game)}
                  >
                    <img src={game.image} alt={game.name} />
                    <p className='gameSettingsGameTitle'>{game.name}</p>
                  </div>
                ))}
              </div>
              <div className='gameSettingsAddGameBtnDiv'>
                <button
                  disabled={!selectedGame}
                  className={!selectedGame ? 'addGameBtn disabledBtn' : 'addGameBtn activeAddGameBtn'}
                  onClick={handleAddGame}
                >
                  Add Game&nbsp;&nbsp;+
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddGameInfo && <AddGameInformation selectedGame={selectedGame} />}
    </>
  );
};

export default GameSettings;
