import React from "react";
import * as config from "./config/config.json";

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
      <div class="HeaderZone Menu">
        <ul>{config.ENV === "DEV" && <li>Archive</li>}</ul>
      </div>
    </header>
  );
};

export default Header;
