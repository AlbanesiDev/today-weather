import { IAqi } from "./aqi.interface";
import { IWeatherOne } from "./weather-owm.interface";

export interface IWeatherCombined {
  weather: IWeatherOne;
  aqi: IAqi;
}
