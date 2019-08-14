import React from 'react';
import './Archive.scss';

const Archive = ({ informations }) => {
  return (
    <div className="Archive">
      <ul className="Archive__List">
        {informations.map(info => (
          <a href={`/?week=${info.order}`}>
            <li className="Archive__link" key={`week-${info.order}}`}>
              Week n°{info.order}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Archive;
