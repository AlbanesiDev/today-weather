import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { ISearchbar } from "../interface/searchbar.interface";
import { LocalStorageService } from "./local-storage.service";
import { IWeatherAqi, IWeatherCurrent, IWeatherOne } from "../interface/weather-owm.interface";
import { IWeatherBitCurrent, IWeatherBitForecastDaily, IWeatherBitAlerts } from "../interface/weather-bit.interface";

/**
 * Service responsible for handling weather API requests.
 *
 * This service interacts with weather APIs to retrieve and manage weather data.
 * In production, it makes requests to actual weather API endpoints.
 * In non-production environments, it uses local JSON mocks for testing purposes.
 */
@Injectable({
  providedIn: "root",
})
export class WeatherService {
  /**
   * Injects HttpClient and LocalStorageService.
   */
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  /**
   * API keys for OpenWeatherMap (OWM) and WeatherBit services.
   */
  private readonly weatherOwmKey: string = environment.WEATHER_OWM_KEY;
  private readonly weatherBitKey: string = environment.WEATHER_BIT_KEY;
  /**
   * Environment URLs for production or mock data.
   */
  private readonly isProduction: boolean = environment.IS_PRODUCTION;
  private readonly weatherOwmOne: string = environment.WEATHER_OWM;
  private readonly weatherOwmAqi: string = environment.WEATHER_OWM_AQI;
  private readonly weatherOwmCurrent: string = environment.WEATHER_OWM_CURRENT;
  private readonly weatherOwmGeocoding: string = environment.WEATHER_OWM_GEOCODING;
  private readonly weatherBitCurrent: string = environment.WEATHER_BIT_CURRENT;
  private readonly weatherBitAlerts: string = environment.WEATHER_BIT_ALERTS;
  private readonly weatherBitDaily: string = environment.WEATHER_BIT_DAILY;

  /**
   * Signals for management latitude and longitude
   */
  public lat = signal<number | undefined>(undefined);
  public lon = signal<number | undefined>(undefined);
  public city = signal<string | undefined>(undefined);

  /**
   * Searches for locations based on the provided query string.
   * @param query The search query string.
   * @returns An Observable emitting the search results.
   */
  public searchLocation(query: string): Observable<ISearchbar> {
    const url = this.isProduction
      ? `${this.weatherOwmGeocoding}q=${query}&limit=5&appid=${this.weatherOwmKey}`
      : this.weatherOwmGeocoding;
    return this.http.get<ISearchbar>(url);
  }

  /**
   * Initiates a search to update weather data for a new location.
   */
  public doSearch(): void {
    this.getWeatherOwmCurrent();
    this.getWeatherOwmAqi();
    this.getWeatherBitCurrent();
    this.getWeatherBitDaily();
    this.getWeatherBitAlerts();
  }

  /**
   * Persists data to local storage.
   * @todo Define the structure for the data to be stored.
   */
  public saveData() {
    this.localStorageService.setItem;
  }

  //=============================================================================================
  // Open weather map
  //=============================================================================================

  /**
   * Retrieves comprehensive weather data in a single request.
   * @returns An Observable emitting the combined weather data.
   */
  public getWeatherOwmOne(): Observable<IWeatherOne> {
    const url = this.isProduction
      ? `${this.weatherOwmOne}lat=${this.lat()}&lon=${this.lon()}&appid=${this.weatherOwmKey}`
      : this.weatherOwmOne;
    return this.http.get<IWeatherOne>(url);
  }

  /**
   * Fetches current weather data.
   * @returns An Observable emitting the current weather data.
   */
  public getWeatherOwmCurrent(): Observable<IWeatherCurrent> {
    const url = this.isProduction
      ? `${this.weatherOwmCurrent}lat=${this.lat()}&lon=${this.lon()}&appid=${this.weatherOwmKey}`
      : this.weatherOwmCurrent;
    return this.http.get<IWeatherCurrent>(url);
  }

  /**
   * Retrieves air quality index (AQI) data.
   * @returns An Observable emitting the AQI data.
   */
  public getWeatherOwmAqi(): Observable<IWeatherAqi> {
    const url = this.isProduction
      ? `${this.weatherOwmAqi}lat=${this.lon()}&lon=${this.lon()}&appid=${this.weatherOwmKey}`
      : this.weatherOwmAqi;
    return this.http.get<IWeatherAqi>(url);
  }

  //=============================================================================================
  // Weather bit
  //=============================================================================================

  /**
   * Obtains current weather conditions from WeatherBit.
   * @returns An Observable emitting the current weather conditions.
   */
  public getWeatherBitCurrent(): Observable<IWeatherBitCurrent> {
    const url = this.isProduction
      ? `${this.weatherBitCurrent}lat=${this.lon()}&lon=${this.lon()}key=${this.weatherBitKey}&include=minutely`
      : this.weatherBitCurrent;
    return this.http.get<IWeatherBitCurrent>(url);
  }

  /**
   * Fetches daily weather forecast data from WeatherBit.
   * @returns An Observable emitting the daily forecast data.
   */
  public getWeatherBitDaily(): Observable<IWeatherBitForecastDaily> {
    const url = this.isProduction
      ? `${this.weatherBitDaily}lat=${this.lon()}&lon=${this.lon()}city=${this.city()}&key=${this.weatherBitKey}`
      : this.weatherBitDaily;
    return this.http.get<IWeatherBitForecastDaily>(url);
  }

  /**
   * Retrieves weather alerts from WeatherBit.
   * @returns An Observable emitting weather alerts.
   */
  public getWeatherBitAlerts(): Observable<IWeatherBitAlerts> {
    const url = this.isProduction
      ? `${this.weatherBitAlerts}lat=${this.lon()}&lon=${this.lon()}key=${this.weatherBitKey}`
      : this.weatherBitAlerts;
    return this.http.get<IWeatherBitAlerts>(url);
  }
}
