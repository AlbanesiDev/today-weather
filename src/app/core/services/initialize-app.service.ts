import { Injectable, inject } from "@angular/core";
import { GeolocationService } from "./geolocation.service";
import { WeatherService } from "./weather.service";
import { Observable, map, of, switchMap, tap } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../../environments/environment";

/**
 * Service responsible for initializing the application by fetching weather and geolocation data.
 * This service coordinates the retrieval of weather data based on the user's geolocation.
 */
@Injectable({
  providedIn: "root",
})
export class InitializeAppService {
  /**
   * Service for fetch weather data
   */
  public weatherService: WeatherService = inject(WeatherService);

  /**
   * Service for fetch geolocation data
   */
  public geolocationService: GeolocationService = inject(GeolocationService);

  /**
   * Service for fetch geolocation data
   */
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  public readonly userWeatherStorage: string = environment.LOCAL_STORAGE.userWeatherDataKey;
  public readonly userGeoStorage: string = environment.LOCAL_STORAGE.userGeoKey;

  /**
   * Initializes the weather data.
   * @returns An Observable containing the merged weather and geolocation data.
   */
  initWeather(): Observable<any> {
    const geoStorage = this.localStorageService.getItem(this.userGeoStorage);
    const weatherStorage = this.localStorageService.getItem(this.userWeatherStorage);

    // If both geolocation and weather data are present in local storage, return them
    if (geoStorage && weatherStorage) {
      return of({ weather: weatherStorage, geo: geoStorage });
    }

    // If only geolocation data is present, fetch weather data based on geolocation
    if (geoStorage) {
      return this.weatherService.weatherMergeData(geoStorage.latitude, geoStorage.longitude).pipe(
        tap((res) => {
          this.localStorageService.setItem(this.userWeatherStorage, res, true, "30m");
        }),
        map((weatherData) => ({ weather: weatherData, geo: geoStorage })),
      );
    }

    // If no data is present in local storage, fetch geolocation data and then fetch weather data
    return this.geolocationService.getGeolocation().pipe(
      switchMap((geo) => {
        this.localStorageService.setItem(this.userGeoStorage, geo, true, "1hr");
        return this.weatherService.weatherMergeData(geo.latitude, geo.longitude).pipe(
          tap((res) => {
            this.localStorageService.setItem(this.userWeatherStorage, res, true, "30m");
          }),
          map((weatherData: any) => ({ weather: weatherData, geo: geo })),
        );
      }),
    );
  }
}
