import React, { useState, useEffect } from 'react';
import '../../styles/PoGTab.css';
import TestLoL from '../TestLoL';
import fortniteLogo from '../../assets/GameAssets/fortnite.png';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PoGTab = () => {


    const { user } = useAuth();
    const [games, setGames] = useState([]);
    const [gameData, setGameData] = useState({});
    const [showLoLInfo, setShowLoLInfo] = useState(false);
    const { id } = useParams();

    const handleLoLClick = async (region, tag, key) => {
        setGameData({});
        try {
            const gamesResponse = await axios.get(`http://localhost:8000/getInfo/${region}/${tag}/${key}`);
            setGameData(gamesResponse.data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Set loading to false in case of error
        }
        // setShowLoLInfo(!showLoLInfo);
    };

    console.log(gameData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userId = user._id; // Initialize userId with user._id
                if (id) {
                    userId = id; // If id parameter exists, use it instead
                }
                const gamesResponse = await axios.get(`http://localhost:8000/gameSettings/${userId}`);
                setGames(gamesResponse.data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                // Set loading to false in case of error
            }
        };

        fetchData();
    }, [user, id]); // Include id in the dependency array

    return (
        <div className='pogTabContainer'>

            <div className='pogGameList'>

                {games.length ? games.map((gameSetting) => (
                    <>
                        <div key={gameSetting.game._id} className={`pogGameCard ${showLoLInfo ? 'activeGameCard' : null}`} onClick={() => handleLoLClick(gameSetting.region, gameSetting.gamerTag, gameSetting.game.key)}>
                            <img src={gameSetting.game.image} alt="gameLogo" className="pogGameCardLogo" />
                            <h4 className="pogGameCardTitle">{gameSetting.game.name}</h4>
                        </div>

                        {Object.keys(gameData).length ? <TestLoL data={gameData} /> : null}
                    </>
                )) : <div>No games added</div>}



            </div>

        </div>
    )
}

export default PoGTab