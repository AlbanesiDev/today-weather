import { createSelector, createFeatureSelector } from "@ngrx/store";
import { WeatherState } from "../interface/weather-state.interface";

export const selectWeatherState = createFeatureSelector<WeatherState>("weather");

export const selectUserLocation = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.userLocation,
);
export const selectLoadingUserLocation = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.loadingUserLocation,
);
export const selectErrorUserLocation = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.errorUserLocation,
);

export const selectLocationSuggestions = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.locationSuggestions,
);
export const selectLoadingLocationSuggestions = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.loadingLocationSuggestions,
);
export const selectErrorLocationSuggestions = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.errorLocationSuggestions,
);

export const selectWeatherData = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weatherData,
);
export const selectLoadingWeatherData = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.loadingWeatherData,
);
export const selectErrorWeatherData = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.errorWeatherData,
);

export const selectCurrentCountry = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.currentCountry,
);
