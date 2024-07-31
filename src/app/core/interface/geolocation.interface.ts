export interface ILatLon {
  latitude: number;
  longitude: number;
}

export interface ICurrentCountry extends ILatLon {
  name: string;
  country: string;
  state: string;
}

export interface IGeolocation extends ILatLon {
  city: string;
  country_capital: string;
  country_code_iso3: string;
  country_name: string;
  languages: string;
  region: string;
  timezone: string;
  utc_offset: string;
}
