import axios from "axios";
import * as config from '../config/config.json';

export const getRandomSoccerImage = async () => {
  try {
    if(config.ENV !== 'DEV'){
      const response = await axios.get(
        "https://source.unsplash.com/featured/?soccer"
      );
      return response.request.responseURL;
    } else {
      return 'assets/1080x720.png';
    }
  } catch (err) {
    console.log({ err });
    return err;
  }
};
