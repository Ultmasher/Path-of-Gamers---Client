import React from 'react'
import API from '../../API';
import { useState, useEffect } from 'react';
import '../styles/LoLView.css';


const LoLView = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { getLoLData } = API();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getLoLData();
            setData(response);


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(data)
    }, []);

    console.log(data)




    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                data && Object.keys(data).length > 0 ? (
                    <div>
                        <div className='userData'>
                            <img src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${data.userId.profileIconId}.png`} alt="Profile Icon" />
                            <p className='userLevel'>{data.userId.summonerLevel}</p>
                            <p className='summonerName'>{data.userId.name}</p>
                        </div>
                        <h2>User League Data</h2>
                        {data.userData.length === 0 ? (
                            <div>
                                <p>No user data available.</p>
                            </div>
                        ) : (
                            data.userData.map((entry, index) => (
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
                            ))
                        )}
                        <h2>Games</h2>
                        {console.log(data)}
                        {data.matchData.map((game, index) => (
                            console.log(game),
                            <div key={index} style={{ backgroundColor: 'gray' }} className='matchHistoryCardLoL'>
                                <h2>Game: {index + 1}</h2>
                                {game.info.participants.map((participant, participantIndex) => (
                                
                                    <p key={participantIndex} className='matchHistoryLoLPlayerCard'>
                                        Player {participantIndex + 1}: {participant.summonerName}, KDA: {participant.kills}/{participant.deaths}/{participant.assists} champion name: {participant.championName}
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${participant.championName}.png`} />
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No data available</p>
                )
            )}
        </>
    );


}

export default LoLView;
