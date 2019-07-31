import axios from "axios";

export const getRandomSoccerImage = async () => {
  try {
    const response = await axios.get(
      "https://source.unsplash.com/featured/?soccer"
    );
    return response.request.responseURL;
  } catch (err) {
    console.log({ err });
    return err;
  }
};
