import React from 'react'
import API from '../../API';
import { useState, useEffect } from 'react';


const LoLView = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const getUserData = API();





    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getLoLData();
            setData(response);
            console.log(data)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);




    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>User Information</h2>
                    <p>Name: {data.userId.name}</p>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${data.userId.profileIconId}.png`} alt="Profile Icon" />

                    <p>Summoner Level: {data.userId.summonerLevel}</p>

                    <h2>User League Data</h2>
                    {data.userData.map((entry, index) => (
                        <div key={index}>
                            <p>Queue Type: {entry.queueType}</p>
                            <p>Tier: {entry.tier}</p>
                            <p>Rank: {entry.rank}</p>
                            <p>League Points: {entry.leaguePoints}</p>
                            <p>Wins: {entry.wins}</p>
                            <p>Losses: {entry.losses}</p>
                            <p>Veteran: {entry.veteran ? "Yes" : "No"}</p>
                            <p>Inactive: {entry.inactive ? "Yes" : "No"}</p>
                            <p>Fresh Blood: {entry.freshBlood ? "Yes" : "No"}</p>
                            <p>Hot Streak: {entry.hotStreak ? "Yes" : "No"}</p>
                        </div>

                    ))}
                    <h2>Games</h2>
                    {data.matchData.map((game, index) => (
                        <div key={index} style={{ backgroundColor: 'gray' }}>
                            <h2>Game: {index + 1}</h2>
                            {game.info.participants.map((participant, participantIndex) => (
                                <p key={participantIndex}>
                                    Player {participantIndex + 1}: {participant.summonerName}, KDA: {participant.kills}/{participant.deaths}/{participant.assists} champion name: {participant.championName}
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${participant.championName}.png`} />
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default LoLView;
