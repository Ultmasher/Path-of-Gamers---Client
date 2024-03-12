import React from "react";
import API from "../../API";
import { useState, useEffect } from "react";
import "../styles/LoLView.css";

import ironLogo from '../assets/RankedEmblemsLatest/Rank=Iron.png';
import bronzeLogo from '../assets/RankedEmblemsLatest/Rank=Bronze.png';
import silverLogo from '../assets/RankedEmblemsLatest/Rank=Silver.png';
import goldLogo from '../assets/RankedEmblemsLatest/Rank=Gold.png';
import emeraldLogo from '../assets/RankedEmblemsLatest/Rank=Emerald.png';
import platinumLogo from '../assets/RankedEmblemsLatest/Rank=Platinum.png';
import diamondLogo from '../assets/RankedEmblemsLatest/Rank=Diamond.png';
import masterLogo from '../assets/RankedEmblemsLatest/Rank=Master.png';
import grandmasterLogo from '../assets/RankedEmblemsLatest/Rank=Grandmaster.png';
import challengerLogo from '../assets/RankedEmblemsLatest/Rank=Challenger.png';

const TestLoL = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showRecentMatches, setShowRecentMatches] = useState(false);
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

  const handleShowRecentMatches = () => {
    setShowRecentMatches(!showRecentMatches);
  };

const parseUserTier = (tier) => {
    console.log(tier);
    switch (tier) {
            case "IRON":
                    return <img src={ironLogo} alt="Iron" className="tierLogo" />;
            case "BRONZE":
                    return <img src={bronzeLogo} alt="Bronze" className="tierLogo" />;
            case "SILVER":
                    return <img src={silverLogo} alt="Silver" className="tierLogo" />;
            case "GOLD":
                    return <img src={goldLogo} alt="Gold" className="tierLogo" />;
            case "EMERALD":
                    return <img src={emeraldLogo} alt="Emerald" className="tierLogo" />;
            case "PLATINUM":
                    return <img src={platinumLogo} alt="Platinum" className="tierLogo" />;
            case "DIAMOND":
                    return <img src={diamondLogo} alt="Diamond" className="tierLogo" />;
            case "MASTER":
                    return <img src={masterLogo} alt="Master" className="tierLogo" />;
            case "GRANDMASTER":
                    return <img src={grandmasterLogo} alt="Grandmaster" className="tierLogo" />;
            case "CHALLENGER":
                    return <img src={challengerLogo} alt="Challenger" className="tierLogo" />;
            default:
                    return null;
    }
};

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  console.log(data);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : data && Object.keys(data).length > 0 ? (
        <div className="LoLStatsDiv">
          <div className="userDataContainer">
            <div className="userData">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${data.userId.profileIconId}.png`}
                alt="Profile Icon"
              />
              <p className="userLevel">{data.userId.summonerLevel}</p>
            </div>
            {data.userData.length === 0 ? (
              <div>
                <p>No user data available.</p>
              </div>
            ) : (
              data.userData.map((entry, index) => (
                <div key={index} className="userStatsDiv">
                  <div className="statsColLeft">
                    <p className="summonerName">{data.userId.name}</p>
                    <div className="winLossDiv">
                      <p>
                        W/L: {entry.wins}/{entry.losses}
                      </p>
                    </div>
                  </div>
                  <div className="statsColMiddle">
                   <span className="tierSpan"><p>Tier: </p>{parseUserTier(entry.tier)}</span>
                    <p>
                      Rank: <span className="rankSpan">{entry.rank}</span>
                    </p>

                    <p>Queue Type: {entry.queueType}</p>
                    <p>League Points: {entry.leaguePoints}</p>
                  </div>
                  <div className="statsColRight">
                    <p>Veteran: {entry.veteran ? "Yes" : "No"}</p>
                    <p>Inactive: {entry.inactive ? "Yes" : "No"}</p>
                    <p>Fresh Blood: {entry.freshBlood ? "Yes" : "No"}</p>
                    <p>Hot Streak: {entry.hotStreak ? "Yes" : "No"}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className="recentMatchesHeader"
            onClick={handleShowRecentMatches}
          >
            <div className="recentMatchesHeaderDropdown">
              <h4>RECENT MATCHES </h4>
              <p className={`dropdownArrow ${showRecentMatches ? "open" : ""}`}>
                ⏵
              </p>
            </div>
          </div>

        {showRecentMatches ? (
          <div className="recentMatchesDiv">
          {data.matchData.map((game, index) => (
            <>
              <h3 className="matchNumberTitle">Match {index + 1}</h3>
              <div className="recentMatchCardDiv">
                <div className="teamOneContainer">
                  <h3>Team One:</h3>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[0].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[0].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[0].kills}/
                        {game.info.participants[0].deaths}/
                        {game.info.participants[0].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[1].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[1].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[1].kills}/
                        {game.info.participants[1].deaths}/
                        {game.info.participants[1].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[2].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[2].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[2].kills}/
                        {game.info.participants[2].deaths}/
                        {game.info.participants[2].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[3].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[3].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[3].kills}/
                        {game.info.participants[3].deaths}/
                        {game.info.participants[3].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[4].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[4].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[4].kills}/
                        {game.info.participants[4].deaths}/
                        {game.info.participants[4].assists}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="teamTwoContainer">
                  <h3>Team Two:</h3>

                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[5].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[5].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[5].kills}/
                        {game.info.participants[5].deaths}/
                        {game.info.participants[5].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[6].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[6].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[6].kills}/
                        {game.info.participants[6].deaths}/
                        {game.info.participants[6].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[7].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[7].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[7].kills}/
                        {game.info.participants[7].deaths}/
                        {game.info.participants[7].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[8].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[8].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[8].kills}/
                        {game.info.participants[8].deaths}/
                        {game.info.participants[8].assists}
                      </p>
                    </div>
                  </div>
                  <div className="recentPlayerCard">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${game.info.participants[9].championName}.png`}
                    />
                    <div className="recentPlayerCardStats">
                      <p>{game.info.participants[9].summonerName}</p>
                      <p>
                        KDA: {game.info.participants[9].kills}/
                        {game.info.participants[9].deaths}/
                        {game.info.participants[9].assists}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div
                key={index}
                style={{ backgroundColor: "gray" }}
                className="matchHistoryCardLoL"
              >
                <h2>Game: {index + 1}</h2>
                {game.info.participants.map(
                  (participant, participantIndex) => (
                    <p
                      key={participantIndex}
                      className="matchHistoryLoLPlayerCard"
                    >
                      Player {participantIndex + 1}:{" "}
                      {participant.summonerName}, KDA: {participant.kills}/
                      {participant.deaths}/{participant.assists} champion
                      name: {participant.championName}
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${participant.championName}.png`}
                      />
                    </p>
                  )
                )}
              </div> */}
            </>
          ))}
        </div>
        ) : null}

        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default TestLoL;
