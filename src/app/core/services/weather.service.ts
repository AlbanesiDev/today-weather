import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, of, switchMap } from "rxjs";
import { LangService } from "../lang/lang.service";
import { GeolocationService } from "./geolocation.service";
import { IWeatherAqi, IWeatherOne } from "../interface/weather-owm.interface";
import { environment } from "../../../environments/environment.development";
import { IconsService } from "./icons.service";

/**
 * Service to retrieve weather data from OpenWeatherMap API.
 */
@Injectable({
  providedIn: "root",
})
export class WeatherService {
  /**
   * HttpClient to perform HTTP requests.
   */
  private http: HttpClient = inject(HttpClient);

  /**
   * Service to manage language settings.
   */
  private langService: LangService = inject(LangService);

  /**
   * Service to retrieve icons.
   */
  private iconsService: IconsService = inject(IconsService);

  /**
   * Service to manage geolocation.
   */
  private geolocationService: GeolocationService = inject(GeolocationService);

  /**
   * API key for OpenWeatherMap.
   */
  private readonly weatherOwmKey: string = environment.WEATHER_OWM_KEY;

  /**
   * Environment URLs for production or mock data.
   */
  private readonly isProduction: boolean = environment.IS_PRODUCTION;

  /**
   * URL for the OpenWeatherMap One Call endpoint.
   */
  private readonly weatherOwmOne: string = environment.WEATHER_OWM;

  /**
   * URL for the OpenWeatherMap AQI endpoint.
   */
  private readonly weatherOwmAqi: string = environment.WEATHER_OWM_AQI;

  /**
   * Retrieves comprehensive weather data in a single request.
   * @returns {Observable<IWeatherOne>} An Observable emitting the weather data.
   */
  private getWeatherOne(): Observable<IWeatherOne> {
    const url = this.isProduction
      ? `${this.weatherOwmOne}lat=${this.geolocationService.lat()}&lon=${this.geolocationService.lon()}&units=metric&lang=${this.langService.currentLangSig()}&appid=${this.weatherOwmKey}`
      : this.weatherOwmOne;
      console.log('peticion')
    return this.http.get<IWeatherOne>(url);
  }

  /**
   * Retrieves air quality index (AQI) data.
   * @returns {Observable<IWeatherAqi>} An Observable emitting the AQI data.
   */
  private getWeatherAqi(): Observable<IWeatherAqi> {
    const url = this.isProduction
      ? `${this.weatherOwmAqi}lat=${this.geolocationService.lon()}&lon=${this.geolocationService.lon()}&appid=${this.weatherOwmKey}`
      : this.weatherOwmAqi;
    return this.http.get<IWeatherAqi>(url);
  }

  /**
   * Combines weather and AQI data into a single object.
   * @returns {Observable<any>} An Observable emitting an object containing both weather data and AQI information.
   */
  public weatherMergeData(): Observable<any> {
    return forkJoin({
      weather: this.getWeatherOne(),
      aqi: this.getWeatherAqi(),
      icons: this.iconsService.getIcons(),
    }).pipe(
      switchMap((results) => {
        const combinedData = {
          ...results.weather,
          aqi: results.aqi,
          icons: results.icons,
        };
        return of(combinedData);
      }),
    );
  }
}
