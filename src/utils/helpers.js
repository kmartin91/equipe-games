import axios from "axios";

export const getRandomSoccerImage = async () => {
  try {
    if (process.env.REACT_APP_ENV !== "development") {
      const response = await axios.get(
        "https://source.unsplash.com/featured/?soccer"
      );
      return response.request.responseURL;
    } else {
      return "assets/1080x720.png";
    }
  } catch (err) {
    console.log({ err });
    return err;
  }
};
