/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICurrentCountry, IGeolocation } from "./geolocation.interface";
import { IWeatherCombined } from "./weather-merge-data.interface";

export interface WeatherState {
  userLocation: IGeolocation | null;
  loadingUserLocation: boolean;
  errorUserLocation: unknown;

  locationSuggestions: any;
  loadingLocationSuggestions: boolean;
  errorLocationSuggestions: unknown;

  currentCountry: ICurrentCountry | null;

  weatherData: IWeatherCombined | null;
  loadingWeatherData: boolean;
  errorWeatherData: unknown;
}
