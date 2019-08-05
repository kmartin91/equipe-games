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
import Archive from './Archive.js';

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

async function getNewImage(articles) {
  const newImage = await getRandomSoccerImage();
  if (articles.some(article => article.image === newImage)) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getNewImage(articles));
      }, 500);
    });
  } else {
    return newImage;
  }
}

function getLastData() {
  const orderedInfos = informations.data.sort((a, b) => a > b);

  return orderedInfos[orderedInfos.length - 1];
}

function getWeekData(weekNumber) {
  const data = informations.data.find(information => information.order === weekNumber);

  return data ? data : getLastData();
}

const App = ({ location }) => {
  const [weekInformations, setWeekInformations] = useState({});
  const [mainInformation, setMainInformation] = useState({});
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isArchive, setIsArchive] = useState(false);
  const { week: weekNumber } = queryString.parse(location.search) || {};

  useEffect(() => {
    const weekInformation = weekNumber ? getWeekData(parseInt(weekNumber, 10)) : getLastData();
    setWeekInformations(weekInformation);
    setIsLoading(true);
    async function getImage() {
      const image = await getRandomSoccerImage();
      weekInformation.articles[0].image = image;
      setMainInformation(weekInformation.articles[0]);
      setCurrentImage(image);
      setIsLoading(false);
    }

    getImage();
  }, [location.search, weekNumber]);

  useEffect(() => {}, [mainInformation]);

  const readInfo = event => {
    event.preventDefault();
    setIsReading(true);
  };

  const handleReadArticle = articleIndex => {
    setMainInformation(articles[articleIndex]);
    setIsLoading(true);

    async function getImage() {
      if (!articles[articleIndex].image) {
        articles[articleIndex].image = await getNewImage(articles);
      }
      setCurrentImage(articles[articleIndex].image);
      setIsReading(true);
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
    getImage();
  };

  const backHome = event => {
    setIsArchive(false);
    setIsReading(false);
  };

  const { title, subtitle, message, author } = mainInformation;
  const { articles = [] } = weekInformations || {};
  const htmlTitle = title && title.length > 16 ? `${title.substring(0, 16)}...` : title;

  const url = weekNumber ? `/?week=${weekNumber}` : '/';
  const authorIntroduction =
    authorIntroductions[Math.floor(Math.random() * authorIntroductions.length)];

  return (
    <div className="EquipeGames">
      <Helmet>
        <title>{`${htmlTitle || ''} - Equipe.Games`}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <Header
        url={url}
        logo={Logo}
        isHome={!isReading && !isArchive}
        showMenu={informations.data.length > 1}
        backHome={backHome}
        goToArchive={() => setIsArchive(true)}
      />
      <div className="Content">
        {isArchive && <Archive informations={informations.data} />}
        {!isArchive && currentImage && (
          <div className="Articles">
            <div className="Main">
              <div
                className={classnames('Image', {
                  Image_Read: isReading,
                  Image_Loading: isLoading,
                })}
              >
                <img src={currentImage} className="MainImage" alt="La folie à la Beaujoire" />
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
              {articles.map((article, index) => {
                const { title, subtitle, message } = article || {};
                if (title === mainInformation.title) return null;
                return (
                  <div
                    className="Side"
                    key={`${title}-${index}`}
                    onClick={() => handleReadArticle(index)}
                  >
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
        {!currentImage && (
          <div className="Loader">Un peu de patience mordu du football, le site charge</div>
        )}
      </div>
    </div>
  );
};

export default App;
