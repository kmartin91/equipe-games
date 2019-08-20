import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { getResultByWeek } from '../../utils/helpers.js';

import './Result.scss';

const Result = ({ weekNumber }) => {
  const [dataMPG, setDataMPG] = useState({});

  useEffect(() => {
    async function getResults() {
      const result = await getResultByWeek({ weekNumber, leagueId: 'LH9NBJJ8' });
      setDataMPG(JSON.parse(result));
    }

    getResults();
  }, [weekNumber]);

  const { data: { results: { matches } = {} } = {} } = dataMPG || {};

  if (!matches) {
    return <div className="Result">Chargement des résultats</div>;
  }

  return (
    <div className="Result">
      {matches &&
        matches.length > 0 &&
        matches.map(
          ({
            teamAway: { score: scoreAway, name: nameAway },
            teamHome: { score: scoreHome, name: nameHome },
            id,
          }) => {
            return (
              <div className="Result__Match" key={id}>
                <div className="Result__Home">{nameHome}</div>
                <div className="Result__Score">
                  <div
                    className={classnames('Result__Number', {
                      Result__Number_Winner: scoreHome > scoreAway,
                    })}
                  >
                    {scoreHome}
                  </div>
                  <span className="Result__Separator"> - </span>
                  <div
                    className={classnames('Result__Number', {
                      Result__Number_Winner: scoreAway > scoreHome,
                    })}
                  >
                    {scoreAway}
                  </div>
                </div>
                <div className="Result__Away">{nameAway}</div>
              </div>
            );
          },
        )}
    </div>
  );
};

export default Result;
