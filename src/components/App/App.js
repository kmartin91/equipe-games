import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import { getRandomSoccerImage } from '../../utils/helpers.js';
import Header from '../Header/Header';
import Result from '../Result/Result';
import Toggle from '../Toggle/Toggle';
import Ladder from '../Ladder/Ladder';
import NextMatch from '../NextMatch/NextMatch';
import Logo from '../../svg/logo-color.svg';
import './App.scss';

import * as informations from '../../data/informations.json';
import Archive from '../Archive/Archive';
import Main from '../Main/Main';

function getLastData() {
  const orderedInfos = informations.data.sort((a, b) => a.order > b.order);

  return orderedInfos[orderedInfos.length - 1];
}

function getLastWeek() {
  const orderedInfos = informations.data.sort((a, b) => a.order > b.order);

  return orderedInfos.length;
}

function getWeekData(weekNumber) {
  const data = informations.data.find(information => information.order === weekNumber);

  return data ? data : getLastData();
}

function getToggleTabs({ weekNumber }) {
  const lastWeeKNumber = getLastWeek();
  return [
    {
      title: 'Resultat',
      content: <Result weekNumber={weekNumber || lastWeeKNumber} />,
    },
    {
      title: 'Classement',
      content: <Ladder />,
    },
    {
      title: 'Prochaine rencontre',
      content: <NextMatch />,
    },
  ];
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

  const backHome = () => {
    setIsArchive(false);
    setIsReading(false);
  };

  const { title } = mainInformation;
  const htmlTitle = title && title.length > 16 ? `${title.substring(0, 16)}...` : title;
  return (
    <div className="EquipeGames">
      <Helmet>
        <title>{`${htmlTitle || ''} - Equipe.Games`}</title>
        <meta charSet="utf-8" />
      </Helmet>
      <Header
        logo={Logo}
        isHome={!isReading && !isArchive}
        showMenu={informations.data.length > 1}
        backHome={backHome}
        goToArchive={() => setIsArchive(true)}
      />
      <div className="Content">
        {isArchive && <Archive informations={informations.data} />}
        {!isArchive && currentImage && (
          <Main
            isLoading={isLoading}
            isReading={isReading}
            handleIsLoading={bool => setIsLoading(bool)}
            handleIsReading={bool => setIsReading(bool)}
            handleMainInformation={newMainInformation => setMainInformation(newMainInformation)}
            handleCurrentImage={newImage => setCurrentImage(newImage)}
            currentImage={currentImage}
            currentArticle={mainInformation}
            weekInformations={weekInformations}
          />
        )}
        {!isArchive && currentImage && <Toggle tabs={getToggleTabs({ weekNumber })} />}
        {!currentImage && (
          <div className="Loader">Un peu de patience mordu du football, le site charge</div>
        )}
      </div>
    </div>
  );
};

export default App;
