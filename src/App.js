import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import classnames from 'classnames';

import { getRandomSoccerImage } from './utils/helpers.js';
import Lines from './Lines.js';
import Header from './Header';
import Logo from './logo-color.svg';
import './App.scss';

import * as informations from './data/informations.json';

const authorIntroductions = [
  'Propos recueillis par ',
  'Écrit par ',
  'Conférence fraîchement récolté par ',
  'Rapporté par ',
  'Dactylographié par ',
  'Gribouillé par ',
  'Griffonné par',
  'Rédigé par ',
  'Noté par ',
  "Envoyé à l'impression par ",
];

const App = ({ location }) => {
  const [weekInformations, setWeekInformations] = useState({});
  const [mainInformation, setMainInformation] = useState({});
  const [randomImage, setRandomImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const { week: weekKey } = queryString.parse(location.search) || {};

  useEffect(() => {
    const weekInformation = informations[weekKey] ? informations[weekKey] : informations['week1'];
    setWeekInformations(weekInformation);
    setMainInformation(weekInformation.articles[0]);

    setIsLoading(true);
    async function getImage() {
      const image = await getRandomSoccerImage();
      setRandomImage(image);
      setIsLoading(false);
    }

    getImage();
  }, [location.search, weekKey]);

  useEffect(() => {}, [mainInformation]);

  const readInfo = event => {
    event.preventDefault();
    setIsReading(true);
  };

  const handleReadArticle = article => {
    setMainInformation(article);
    setIsLoading(true);
    async function getImage() {
      const image = await getRandomSoccerImage();
      setRandomImage(image);
      setIsLoading(false);
      setIsReading(true);
    }
    window.scrollTo(0, 0);
    getImage();
  };

  const backHome = event => {
    setIsReading(false);
  };

  const { title, subtitle, message, author } = mainInformation;
  const { articles = [] } = weekInformations || {};
  const htmlTitle = title && title.length > 16 ? `${title.substring(0, 16)}...` : title;

  const url = weekKey ? `/?week=${weekKey}` : '/';
  const authorIntroduction =
    authorIntroductions[Math.floor(Math.random() * authorIntroductions.length)];

  return (
    <div className="EquipeGames">
      <Helmet>
        <title>{`${htmlTitle || ''} - Equipe.Games`}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <Header url={url} logo={Logo} isHome={!isReading} backHome={backHome} />
      <div className="Content">
        {randomImage && (
          <div className="Articles">
            <div className="Main">
              <div
                className={classnames('Image', {
                  Image_Read: isReading,
                  Image_Loading: isLoading,
                })}
              >
                <img src={randomImage} className="MainImage" alt="La folie à la Beaujoire" />
                <div className="Overlay" />
                <div className="Text" onClick={readInfo}>
                  <div className="HeadLine">"&nbsp;{title}&nbsp;"</div>
                  <div className="SubHeadLine">"&nbsp;{subtitle}&nbsp;"</div>
                  {!isReading && (
                    <div className="ChevronContainer">
                      <div className="Chevron" />
                    </div>
                  )}
                </div>
              </div>
              {isReading && (
                <div className={classnames('Article', { Article_Read: isReading })}>
                  <Lines>{message}</Lines>
                  {author && (
                    <div className="Author">
                      {authorIntroduction}
                      {author}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="Sides">
              {articles.map((article, key) => {
                const { title, subtitle, message } = article || {};
                if (title === mainInformation.title) return null;
                return (
                  <div className="Side" key={title} onClick={() => handleReadArticle(article)}>
                    <h2>{title}</h2>
                    <h3>{subtitle}</h3>
                    <p>{message[0].substring(0, 200)}</p>
                    {(message.length > 1 || message[0].length > 200) && (
                      <div className="ReadMore">...lire plus</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!randomImage && (
          <div className="Loader">Un peu de patience mordu du football, le site charge</div>
        )}
      </div>
    </div>
  );
};

export default App;
