import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/AddGameInformation.css';

const AddGameInformation = ({closeGame}) => {
    const [summonerName, setSummonerName] = useState('');
    const [region, setRegion] = useState('');

    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleSummonerNameChange = (event) => {
        setSummonerName(event.target.value);
    };

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const checkIfValidSummoner = async (summonerName, region) => {
        try {
            const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-ed5a8d01-34e9-4bc7-af7f-ec961dac2ce5`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Summoner Name:', summonerName);
        console.log('Region:', region);
        setSubmitted(true);
    }

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
            <button className='closeAddGameInfoBtn' onClick={closeGame}><span className="material-symbols-outlined">close</span></button>
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
                    <option value="EUW">Europe West</option>
                    <option value="EUE">Europe East</option>
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
