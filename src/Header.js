import React from 'react';
import './Header.scss';

const Header = ({ isHome, logo, backHome, goToArchive, showMenu }) => {
  return (
    <header className="Header">
      {!isHome ? (
        <div className="Header__HeaderZone">
          <div className="Header__Chevron Header__Chevron_Left" onClick={backHome} />
        </div>
      ) : (
        <div className="Header__HeaderZone" />
      )}
      <a href="/" className="Header__HeaderZone Header__Logo">
        <img src={logo} alt="Equipe Games, le meilleur site sportif" />
      </a>
      <div className="Header__HeaderZone Header__Menu">
        {showMenu && (
          <ul>
            <li onClick={goToArchive}>Archive</li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
