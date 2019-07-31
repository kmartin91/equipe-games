import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import queryString from "query-string";
import classnames from "classnames";

import { getRandomSoccerImage } from "./utils/helpers.js";
import Logo from "./logo-color.svg";
import "./App.css";

import * as informations from "./data/informations.json";

const App = ({ location }) => {
  const [weekInformations, setWeekInformations] = useState({});
  const [mainInformation, setMainInformation] = useState({});
  const [randomImage, setRandomImage] = useState("");
  const [isReading, setIsReading] = useState(false);
  const { week: weekKey } = queryString.parse(location.search) || {};

  useEffect(() => {
    const weekInformation = informations[weekKey]
      ? informations[weekKey]
      : informations["week1"];
    const { main } = weekInformation;
    setWeekInformations(weekInformation);
    setMainInformation(main);

    async function getImage() {
      const image = await getRandomSoccerImage();
      setRandomImage(image);
    }

    getImage();
  }, [location.search, weekKey]);

  const readInfo = event => {
    event.preventDefault();
    setIsReading(true);
  };

  const stopReading = event => {
    event.preventDefault();
    setIsReading(false);
  };

  const { title, subtitle, message, author } = mainInformation;
  const { sides = [] } = weekInformations || {};
  const htmlTitle =
    title && title.length > 16 ? `${title.substring(0, 16)}...` : title;

  const url = weekKey ? `/?week=${weekKey}` : "/";

  return (
    <div className="EquipeGames">
      <Helmet>
        <title>{`${htmlTitle || ""} - Equipe.Games`}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <header className="Header">
        {isReading && (
          <button className="ButtonLikeLink Return" onClick={stopReading}>
            Retour à l'accueil
          </button>
        )}
        <a href={url} className="Logo">
          <img src={Logo} alt="Equipe Games, le meilleur site sportif" />
        </a>
      </header>

      {randomImage && (
        <div className="Articles">
          <div className="Main">
            <div className={classnames("Image", { Image_Read: isReading })}>
              <img
                src={randomImage}
                className="MainImage"
                alt="La folie à la Beaujoire"
              />
              <div className="Overlay" />
              <div className="Text">
                <div className="HeadLine"> {title} </div>
                <div className="SubHeadLine"> {subtitle} </div>
                {!isReading && (
                  <button className="ButtonLikeLink" onClick={readInfo}>
                    Lire notre article exclusif
                  </button>
                )}
              </div>
            </div>
            {isReading && (
              <div
                className={classnames("Article", { Article_Read: isReading })}
              >
                {message && message.map(line => <p className="Line">{line}</p>)}
              </div>
            )}
          </div>
          <div className="Sides">
            {sides.map(({ title, subtitle }, key) => {
              if (key === "main") return null;

              return <div key={title}>{title}</div>;
            })}
          </div>
        </div>
      )}
      {!randomImage && (
        <div className="Loader">
          Un peu de patience mordu du football, le site charge
        </div>
      )}
    </div>
  );
};

export default App;
