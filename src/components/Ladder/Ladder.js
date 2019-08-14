import React, { useEffect, useState } from 'react';
import { getLadder } from '../../utils/helpers.js';

import './Ladder.scss';

const Ladder = () => {
  const [ladder, setLadder] = useState({});
  useEffect(() => {
    async function callLader() {
      const response = await getLadder({ leagueId: 'LH9NBJJ8' });
      setLadder(JSON.parse(response));
    }
    callLader();
  }, []);

  const { ranking, teams } = ladder || {};

  if (!ranking) return <div className="Ladder">Chargement du classement</div>;
  return (
    <div className="Ladder">
      <div className="Ladder__Header">
        <div className="Ladder__HeaderCol">Equipe</div>
        <div className="Ladder__HeaderCol">W</div>
        <div className="Ladder__HeaderCol">D</div>
        <div className="Ladder__HeaderCol">L</div>
        <div className="Ladder__HeaderCol">BP</div>
        <div className="Ladder__HeaderCol">BC</div>
        <div className="Ladder__HeaderCol Ladder__HeaderCol_Points">Points</div>
      </div>

      {ranking.map(({ teamid, draw, points, defeat, goal, goalconceded, victory }, key) => (
        <div className="Ladder__Line" key={`line-${key}`}>
          <div className="Ladder__LineCol">{teams[teamid].abbr}</div>
          <div className="Ladder__LineCol">{victory}</div>
          <div className="Ladder__LineCol">{draw}</div>
          <div className="Ladder__LineCol">{defeat}</div>
          <div className="Ladder__LineCol">{goal}</div>
          <div className="Ladder__LineCol">{goalconceded}</div>
          <div className="Ladder__LineCol Ladder__LinePoints">{points}</div>
        </div>
      ))}
    </div>
  );
};

export default Ladder;
