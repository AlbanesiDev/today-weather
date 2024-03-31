export interface IWeatherBitCurrent {
  count: number;
  data: DatumCurrent[];
}

export interface DatumCurrent {
  app_temp: number;
  aqi: number;
  city_name: string;
  clouds: number;
  country_code: string;
  datetime: string;
  dewpt: number;
  dhi: number;
  dni: number;
  elev_angle: number;
  ghi: number;
  gust: null;
  h_angle: number;
  lat: number;
  lon: number;
  ob_time: string;
  pod: string;
  precip: number;
  pres: number;
  rh: number;
  slp: number;
  snow: number;
  solar_rad: number;
  sources: string[];
  state_code: string;
  station: string;
  sunrise: string;
  sunset: string;
  temp: number;
  timezone: string;
  ts: number;
  uv: number;
  vis: number;
  weather: Weather;
  wind_cdir: string;
  wind_cdir_full: string;
  wind_dir: number;
  wind_spd: number;
}

export interface IWeatherBitAlerts {
  alerts: any[];
  city_name: string;
  country_code: string;
  lat: number;
  lon: number;
  state_code: string;
  timezone: string;
}

export interface IWeatherBitForecastDaily {
  city_name: string;
  country_code: string;
  data: DatumForecast[];
  lat: string;
  lon: string;
  state_code: string;
  timezone: string;
}

export interface DatumForecast {
  app_max_temp: number;
  app_min_temp: number;
  clouds: number;
  clouds_hi: number;
  clouds_low: number;
  clouds_mid: number;
  datetime: Date;
  dewpt: number;
  high_temp: number;
  low_temp: number;
  max_dhi: null;
  max_temp: number;
  min_temp: number;
  moon_phase: number;
  moon_phase_lunation: number;
  moonrise_ts: number;
  moonset_ts: number;
  ozone: number;
  pop: number;
  precip: number;
  pres: number;
  rh: number;
  slp: number;
  snow: number;
  snow_depth: number;
  sunrise_ts: number;
  sunset_ts: number;
  temp: number;
  ts: number;
  uv: number;
  valid_date: Date;
  vis: number;
  weather: Weather;
  wind_cdir: string;
  wind_cdir_full: string;
  wind_dir: number;
  wind_gust_spd: number;
  wind_spd: number;
}

export interface Weather {
  description: string;
  code: number;
  icon: string;
}
