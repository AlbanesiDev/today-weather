/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from "@ngrx/store";
import { ICurrentCountry, IGeolocation, ILatLon, IWeatherCombined } from "../interface";

// Location
export const getCurrentLocation = createAction("[Weather] Get Current Location");
export const getCurrentLocationSuccess = createAction(
  "[Weather] Get Current Location Success",
  props<{ location: IGeolocation }>(),
);
export const getCurrentLocationFailure = createAction(
  "[Weather] Get Current Location Failure",
  props<{ error: any }>(),
);

// Search
export const searchLocations = createAction(
  "[Weather] Search Locations",
  props<{ query: string }>(),
);
export const searchLocationsSuccess = createAction(
  "[Weather] Search Locations Success",
  props<{ suggestions: string[] }>(),
);
export const searchLocationsFailure = createAction(
  "[Weather] Search Locations Failure",
  props<{ error: any }>(),
);

// Select Location
export const selectedLocation = createAction(
  "[Weather] Select Location",
  props<{ location: ICurrentCountry }>(),
);

// Weather
export const getWeather = createAction("[Weather] Get Weather", props<{ location: ILatLon }>());
export const getWeatherSuccess = createAction(
  "[Weather] Get Weather Success",
  props<{ weatherData: IWeatherCombined }>(),
);
export const getWeatherFailure = createAction(
  "[Weather] Get Weather Failure",
  props<{ error: any }>(),
);
