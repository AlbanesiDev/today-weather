import { createReducer, on } from "@ngrx/store";
import * as WeatherActions from "./weather.actions";
import { WeatherState } from "../interface/weather-state.interface";

export const initialWeatherState: WeatherState = {
  userLocation: null,
  loadingUserLocation: false,
  errorUserLocation: null,

  locationSuggestions: [],
  loadingLocationSuggestions: false,
  errorLocationSuggestions: null,

  currentCountry: null,

  weatherData: null,
  loadingWeatherData: false,
  errorWeatherData: null,
};

export const weatherReducer = createReducer(
  initialWeatherState,
  on(
    WeatherActions.getCurrentLocation,
    (state): WeatherState => ({
      ...state,
      loadingUserLocation: true,
      errorUserLocation: null,
    }),
  ),
  on(
    WeatherActions.getCurrentLocationSuccess,
    (state, { location }): WeatherState => ({
      ...state,
      userLocation: location,
      loadingUserLocation: false,
      errorUserLocation: null,
    }),
  ),
  on(
    WeatherActions.getCurrentLocationFailure,
    (state, { error }): WeatherState => ({
      ...state,
      loadingUserLocation: false,
      errorLocationSuggestions: error,
    }),
  ),

  on(
    WeatherActions.searchLocations,
    (state): WeatherState => ({
      ...state,
      loadingLocationSuggestions: true,
      errorLocationSuggestions: null,
    }),
  ),
  on(
    WeatherActions.searchLocationsSuccess,
    (state, { suggestions }): WeatherState => ({
      ...state,
      locationSuggestions: suggestions,
      loadingLocationSuggestions: false,
      errorLocationSuggestions: null,
    }),
  ),
  on(
    WeatherActions.searchLocationsFailure,
    (state, { error }): WeatherState => ({
      ...state,
      loadingLocationSuggestions: false,
      errorLocationSuggestions: error,
    }),
  ),

  on(
    WeatherActions.selectedLocation,
    (state, { location }): WeatherState => ({
      ...state,
      currentCountry: location,
    }),
  ),

  on(
    WeatherActions.getWeather,
    (state): WeatherState => ({
      ...state,
      loadingWeatherData: true,
      errorWeatherData: null,
    }),
  ),
  on(
    WeatherActions.getWeatherSuccess,
    (state, { weatherData }): WeatherState => ({
      ...state,
      weatherData: weatherData,
      loadingWeatherData: false,
      errorWeatherData: null,
    }),
  ),
  on(
    WeatherActions.getWeatherFailure,
    (state, { error }): WeatherState => ({
      ...state,
      loadingWeatherData: false,
      errorWeatherData: error,
    }),
  ),
);
