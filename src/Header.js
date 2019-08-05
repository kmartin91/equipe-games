import React from 'react';

const Header = ({ isHome, url, logo, backHome }) => {
  return (
    <header className="Header">
      {!isHome ? (
        <div className="HeaderZone ButtonLikeLink Return">
          <div className="Chevron Chevron_Left" onClick={backHome} />
        </div>
      ) : (
        <div className="HeaderZone" />
      )}
      <a href={url} className="HeaderZone Logo">
        <img src={logo} alt="Equipe Games, le meilleur site sportif" />
      </a>
      <div className="HeaderZone Menu">
        <ul>{process.env.REACT_APP_ENV === 'development' && <li>Archive</li>}</ul>
      </div>
    </header>
  );
};

export default Header;
