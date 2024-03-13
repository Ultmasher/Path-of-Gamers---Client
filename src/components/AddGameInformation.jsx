import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import '../styles/AddGameInformation.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddGameInformation = ({ closeGame }) => {
    const [summonerName, setSummonerName] = useState('');
    const [region, setRegion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedGame = location.state ? location.state.selectedGame : null; // Check if location.state is defined

    console.log('selectedGame:', selectedGame); // Log the value of selectedGame

    const handleSummonerNameChange = (event) => {
        setSummonerName(event.target.value);
    };

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/gameSettings', {
                gamerTag: summonerName,
                region,
                userId: user._id,
                gameId: selectedGame._id
            });

            console.log(response.data);
            setSubmitted(true);
        } catch (error) {
            console.error('Error adding game:', error);
            // Handle error
        }
    };



    return (
        <div className='addGameInfoWrapper'>
            <form className='addGameForm'>
                {submitted ? (
                    <div className='gameAddedSuccessWrapper'>
                        <h2 className='gameAddedSuccessTitle'>Game Added Successfully!</h2>
                        <p className='gameAddedSuccessText'>Add new Game?</p>
                        <div className='gameAddedSuccessBtns'>
                            <button className='pogBtn addGameSuccessBtn' onClick={() => closeGame()}>Yes</button>
                            <button className='pogBtn addGameSuccessBtn' onClick={() => navigate('/')}>No</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='closeGameBtnDiv'>
                            <button className='closeAddGameInfoBtn' onClick={() => navigate(-1)}><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className='addGameInfoTop'>
                            <div className='addSummonerDiv'>
                                <label htmlFor="summonerName">Summoner Name:</label>
                                <input
                                    type="text"
                                    id="summonerName"
                                    name="summonerName"
                                    placeholder="Enter your Summoner Name"
                                    value={summonerName}
                                    onChange={handleSummonerNameChange}
                                    required
                                />
                            </div>

                            <div className='addRegionDiv'>
                                <label htmlFor="region">Region:</label>
                                <select
                                    id="region"
                                    name="region"
                                    value={region}
                                    onChange={handleRegionChange}
                                    required
                                >
                                    <option value="" disabled>---</option>
                                    <option value="euw1">Europe West</option>
                                    <option value="eun1">Europe East</option>
                                </select>
                            </div>

                        </div>

                        <div className='confirmBtnDiv'>
                            <p className='apiInstructions'>You can find your League of Legends Summoner in-game.</p>
                            <button type="submit" className='pogBtn addGameConfirmBtn' onClick={handleSubmit}>Confirm</button>
                        </div>

                    </>
                )}

            </form>
        </div>
    );
};

export default AddGameInformation;