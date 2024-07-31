import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, shareReplay, switchMap, tap } from "rxjs";
import { SearchbarService, WeatherService, GeolocationService } from "../services";
import * as WeatherActions from "./weather.actions";

@Injectable()
export class WeatherEffects {
  private geolocationService = inject(GeolocationService);
  private searchbarService = inject(SearchbarService);
  private weatherService = inject(WeatherService);
  private actions$: Actions = inject(Actions);

  getCurrentLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getCurrentLocation),
      exhaustMap(() =>
        this.geolocationService.getGeolocation().pipe(
          shareReplay(1),
          map((geolocation) => WeatherActions.getCurrentLocationSuccess({ location: geolocation })),
          catchError((error) => of(WeatherActions.getCurrentLocationFailure({ error }))),
        ),
      ),
    );
  });

  getWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getWeather),
      switchMap((action) => {
        return this.weatherService
          .weatherMergeData(action.location.latitude, action.location.longitude)
          .pipe(
            map((weather) => WeatherActions.getWeatherSuccess({ weatherData: weather })),
            catchError((error) => of(WeatherActions.getWeatherFailure({ error }))),
          );
      }),
    );
  });

  searchLocations$ = createEffect(() => {
    return this.actions$.pipe(ofType(WeatherActions.searchLocations)).pipe(
      switchMap((action) => {
        return this.searchbarService.searchLocation(action.query).pipe(
          map((suggestions) => WeatherActions.searchLocationsSuccess({ suggestions: suggestions })),
          catchError((error) => of(WeatherActions.searchLocationsFailure({ error }))),
        );
      }),
    );
  });

  error$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        WeatherActions.getWeatherFailure,
        WeatherActions.searchLocationsFailure,
        WeatherActions.getCurrentLocationFailure,
      ),
      tap((error) => console.error(error)),
    );
  });
}
