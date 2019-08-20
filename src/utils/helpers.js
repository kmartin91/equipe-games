import axios from 'axios';

export const getRandomSoccerImage = async () => {
  try {
    if (process.env.REACT_APP_ENV !== 'development') {
      const response = await axios.get('https://source.unsplash.com/featured/?soccer');
      return response.request.responseURL;
    } else {
      return 'assets/1080x720.png';
    }
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const getLadder = async ({ leagueId = 'LH9NBJJ8' }) => {
  try {
    const response = await axios.get(`https://api.monpetitgazon.com/league/${leagueId}/ranking`);
    return response.request.response;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const getResultByWeek = async ({ leagueId = 'LH9NBJJ8', weekNumber = '1' }) => {
  try {
    const response = await axios.get(
      `  https://api.monpetitgazon.com/league/${leagueId}/calendar/${weekNumber}`,
    );
    return response.request.response;
  } catch (err) {
    console.log({ err });
    return err;
  }
};
