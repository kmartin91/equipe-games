import React from 'react';
import classnames from 'classnames';
import Lines from './Lines';
import { getRandomSoccerImage } from './utils/helpers.js';

import './Main.scss';

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

const Main = ({
  isLoading,
  isReading,
  currentImage,
  currentArticle,
  weekInformations,
  handleIsLoading,
  handleIsReading,
  handleMainInformation,
  handleCurrentImage,
}) => {
  const handleReadArticle = articleIndex => {
    handleMainInformation(articles[articleIndex]);
    handleIsLoading(true);

    async function getImage() {
      if (!articles[articleIndex].image) {
        articles[articleIndex].image = await getNewImage(articles);
      }
      handleCurrentImage(articles[articleIndex].image);
      handleIsReading(true);
      handleIsLoading(false);
    }

    window.scrollTo(0, 0);
    getImage();
  };

  const readInfo = event => {
    event.preventDefault();
    handleIsReading(true);
  };

  const { title: currentTitle, message, subtitle: currentSubtitle, author } = currentArticle || {};
  const authorIntroduction =
    authorIntroductions[Math.floor(Math.random() * authorIntroductions.length)];

  const { articles = [] } = weekInformations || {};
  return (
    <div className="Main">
      <div className="Main__MainArticle">
        <div
          className={classnames('Main__ImageContainer', {
            Main__Image_Read: isReading,
            Main__Image_Loading: isLoading,
          })}
        >
          <img src={currentImage} className="Main__Image" alt="La folie à la Beaujoire" />
          <div className="Main__Overlay" />
          <div className="Main__Text" onClick={readInfo}>
            <div className="Main__HeadLine">"&nbsp;{currentTitle}&nbsp;"</div>
            <div className="Main__SubHeadLine">"&nbsp;{currentSubtitle}&nbsp;"</div>
            {!isReading && (
              <div className="Main__ChevronContainer">
                <div className="Main__Chevron" />
              </div>
            )}
          </div>
        </div>
        {isReading && (
          <div className={classnames('Main__Article', { Main__Article_Read: isReading })}>
            <Lines>{message}</Lines>
            {author && (
              <div className="Main__Author">
                {authorIntroduction}
                {author}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="Main__SidesArticles">
        {articles.map((article, index) => {
          const { title, subtitle, message } = article || {};
          if (title === currentTitle) return null;
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
  );
};

export default Main;
