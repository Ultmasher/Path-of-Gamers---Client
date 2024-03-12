import React, {useState} from 'react';
import '../../styles/PoGTab.css';
import TestLoL from '../TestLoL';
import fortniteLogo from '../../assets/GameAssets/fortnite.png';

const PoGTab = () => {

    const [showLoLInfo, setShowLoLInfo] = useState(false);

    const handleLoLClick = () => {
        setShowLoLInfo(!showLoLInfo);
    };

  return (
    <div className='pogTabContainer'>
        
        <div className='pogGameList'>

            <div className={`pogGameCard ${showLoLInfo ? 'activeGameCard' : null}`} onClick={handleLoLClick}>
                <img src="https://brand.riotgames.com/static/a91000434ed683358004b85c95d43ce0/8a20a/lol-logo.png" alt="gameLogo" className="pogGameCardLogo"/>
                <h4 className="pogGameCardTitle">League of Legends</h4>
            </div>

            {showLoLInfo ? <TestLoL /> : null}

            <div className='pogGameCard'>
                <img src="https://i.pinimg.com/originals/fb/68/c8/fb68c8477c5d95f462f56421810e24d6.png" alt="gameLogo" className="pogGameCardLogo"/>
                <h4 className="pogGameCardTitle">Teamfight Tactics</h4>
            </div>

            <div className='pogGameCard'>
                <img src={fortniteLogo} alt="gameLogo" className="pogGameCardLogo"/>
                <h4 className="pogGameCardTitle">Fortnite</h4>
            </div>

        </div>

    </div>
  )
}

export default PoGTab