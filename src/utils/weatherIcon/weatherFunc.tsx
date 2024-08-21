import Cloudy from "../../assets/weather/Cloudy.svg";
import Sunny from "../../assets/weather/Sunny.svg";
import Rainy from "../../assets/weather/Rainy.svg";
import Thunder from "../../assets/weather/Thunder.svg";

export const getWeatherImage = (weather: string) => {
  let imageUrl;

  switch (weather) {
    case "Clouds": {
      imageUrl = Cloudy;
      break;
    }
    case "Sunny": {
      imageUrl = Sunny;
      break;
    }
    case "Thunder": {
      imageUrl = Thunder;
      break;
    }
    case "Rain": {
      imageUrl = Rainy;
      break;
    }
    default: {
      imageUrl = Sunny;
    }
  }

  return imageUrl;
};
