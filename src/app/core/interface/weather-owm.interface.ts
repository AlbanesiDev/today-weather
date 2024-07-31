export interface IWeatherOne {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: OneCurrent;
  minutely: OneMinutely[];
  hourly: OneCurrent[];
  daily: OneDaily[];
  alerts: OneAlert[];
}

export interface OneAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface OneCurrent {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  pop?: number;
  rain?: Rain;
}

export interface OneRain {
  "1h": number;
}

export interface OneWeather {
  id: number;
  main: Main;
  description: string;
  icon: string;
}

export enum OneMain {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
}

export interface OneDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: OneTemp;
  feels_like: OneFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

export interface OneFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OneTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface OneMinutely {
  dt: number;
  precipitation: number;
}

export interface Main {
  aqi: number;
}

export interface IWeatherCurrent {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Rain {
  "1h": number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
