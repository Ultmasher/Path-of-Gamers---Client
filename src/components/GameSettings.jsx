import React from 'react';
import '../styles/GameSettings.css';

import legaueOfLegendsLogo from '../assets/GameAssets/leagueoflegends.png';
import fifa24Logo from '../assets/GameAssets/eafc24.png';
import fortniteLogo from '../assets/GameAssets/fortnite.png';

const GameSettings = () => {

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

          <div className='gameSettingsLeft'>
            <img src='https://example.com/assets/GameAssets/fortnite.png' alt='League of Legends' />
          </div>

          <div className='gameSettingsRight'>

            <div className='gameSettingsGameList'>
                {gameList.map((game, index) => {
                  return (
                    <div key={index} className='gameSettingsGameItem'>
                      <img src={game.logo} alt={game.name} />
                      <p className='gameSettingsGameTitle'>{game.name}</p>
                    </div>
                  )
                })}
            </div>

            <div className='gameSettingsAddGameBtnDiv'>
              <button className='addGameBtn'>Add Game&nbsp;&nbsp;+</button>
            </div>

          </div>

      </div>
    </div>
  )
}

export default GameSettings;