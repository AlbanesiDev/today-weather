/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from "@angular/common";
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  DestroyRef,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { FeaturesService, GeolocationService } from "../../core/services";
import {
  WeatherCurrentComponent,
  WeatherCurrentDetailComponent,
  WeatherAqiComponent,
  WeatherForecastComponent,
  SunriseSunsetComponent,
  MoonPhasesComponent,
} from "../../features";
import { IAqi, ICurrentCountry, IWeatherOne } from "../../core/interface";
import * as WeatherSelectors from "../../core/state/weather.selectors";
import * as WeatherActions from "../../core/state/weather.actions";
import { take } from "rxjs";

/**
 * The HomeComponent is responsible for rendering the main home view.
 * It includes the sidebar, authentication, header, and various weather components.
 * The order of the weather components is determined by the `getPosition` method,
 * which is based on the current order of features in the `FeaturesService`.
 */
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    WeatherCurrentComponent,
    WeatherCurrentDetailComponent,
    WeatherAqiComponent,
    WeatherForecastComponent,
    SunriseSunsetComponent,
    MoonPhasesComponent,
  ],
  template: `
    <div class="flex flex-column gap-6 min-h-screen">
      @defer {
        @if (featuresService.featureListActive.current) {
          <app-weather-current
            [data]="weatherDataSig()"
            [geoData]="locationSig()"
            [loading]="loadingSig()"
            [class]="'flex-order-' + getPosition(0)"
          />
        }
      }
      @defer {
        @if (featuresService.featureListActive.forecastHourly) {
          <app-weather-forecast
            forecastType="hourly"
            [data]="weatherDataSig().hourly"
            [loading]="loadingSig()"
            [class]="'flex-order-' + getPosition(1)"
          />
        }
      }
      @defer {
        @if (featuresService.featureListActive.currentDetail) {
          <app-weather-current-detail
            [data]="weatherDataSig().current"
            [loading]="loadingSig()"
            [class]="'flex-order-' + getPosition(2)"
          />
        }
      }
      @defer {
        @if (featuresService.featureListActive.forecastDaily) {
          <app-weather-forecast
            forecastType="daily"
            [class]="'flex-order-' + getPosition(3)"
            [data]="weatherDataSig().daily"
            [loading]="loadingSig()"
          />
        }
      }
      @defer {
        @if (featuresService.featureListActive.sunriseSunset) {
          <app-sunrise-sunset
            [data]="weatherDataSig().current"
            [loading]="loadingSig()"
            [class]="'flex-order-' + getPosition(5)"
          />
        }
      }
      @defer {
        @if (featuresService.featureListActive.moonPhase) {
          <app-moon-phases
            [data]="weatherDataSig().daily"
            [loading]="loadingSig()"
            [class]="'flex-order-' + getPosition(6)"
          />
        }
      }
      @defer {
        @if (featuresService.featureListActive.aqi) {
          <app-weather-aqi
            [data]="aqiDataSig()"
            [loading]="loadingSig()"
            [class]="'flex-order-' + getPosition(4)"
          />
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public readonly geolocationService = inject(GeolocationService);
  public readonly featuresService = inject(FeaturesService);
  public readonly destroyRef = inject(DestroyRef);
  public readonly store = inject(Store);

  public readonly weatherDataSig = signal<IWeatherOne>({} as IWeatherOne);
  public readonly locationSig = signal<ICurrentCountry>({} as ICurrentCountry);
  public readonly aqiDataSig = signal<IAqi>({} as IAqi);
  public readonly loadingSig = signal<boolean>(false);

  ngOnInit(): void {
    this.store
      .select(WeatherSelectors.selectUserLocation)
      .pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe((position) => {
        if (position) {
          // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
          this.store.dispatch(
            WeatherActions.selectedLocation({
              location: {
                latitude: position.latitude,
                longitude: position.longitude,
                name: position.country_name,
                state: position.city,
                country: position.country_code_iso3,
              },
            }),
          );
          // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
          this.store.dispatch(
            WeatherActions.getWeather({
              location: { latitude: position.latitude, longitude: position.longitude },
            }),
          );
        }
      });

    this.subscribeToSelector(WeatherSelectors.selectLoadingWeatherData, (res) =>
      this.loadingSig.set(res),
    );
    this.subscribeToSelector(WeatherSelectors.selectCurrentCountry, (res) =>
      this.locationSig.set(res),
    );
    this.subscribeToSelector(WeatherSelectors.selectWeatherData, (res) => {
      if (res) {
        this.weatherDataSig.set(res.weather);
        this.aqiDataSig.set(res.aqi);
      }
    });
  }

  /**
   * Subscribes to a store selector and executes a callback with the result.
   * @param selector The selector used to select a fragment of the store state.
   * @param callback The function that is called with the subscription result.
   */
  private subscribeToSelector(selector: any, callback: (res: any) => void): void {
    this.store
      .select(selector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        callback(res);
      });
  }

  /**
   * Retrieves the current position of a feature by its ID.
   * @param id The unique identifier of the feature.
   * @returns The current position of the feature within the feature list.
   */
  public getPosition(id: number): number {
    return this.featuresService.featureListOrder().findIndex((feature) => feature.id === id);
  }
}
