import React, { useEffect, useState } from 'react';
import { getResultByWeek } from '../../utils/helpers.js';

import './NextMatch.scss';

const NextMatch = () => {
  const [dataMPG, setDataMPG] = useState({});

  useEffect(() => {
    async function getResults() {
      const result = await getResultByWeek({ leagueId: 'LH9NBJJ8' });
      setDataMPG(JSON.parse(result));
    }

    getResults();
  }, []);

  const { data: { results: { matches } = {} } = {} } = dataMPG || {};

  if (!matches) {
    return <div className="Result">Chargement des prochains matchs</div>;
  }

  return (
    <div className="NextMatch">
      {matches &&
        matches.length > 0 &&
        matches.map(({ teamAway: { name: nameAway }, teamHome: { name: nameHome }, id }) => (
          <div className="NextMatch__Match" key={id}>
            <div className="NextMatch__Home">{nameHome}</div>
            <div className="NextMatch__Separator">vs</div>
            <div className="NextMatch__Away">{nameAway}</div>
          </div>
        ))}
    </div>
  );
};

export default NextMatch;
