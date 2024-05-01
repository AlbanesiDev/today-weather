import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { WeatherCurrentComponent } from "../../components/weather-current/weather-current.component";
import { AuthComponent } from "../../components/auth/auth.component";
import { WeatherCurrentDetailComponent } from "../../components/weather-current-detail/weather-current-detail.component";
import { FeaturesService } from "./../../../core/services/features.service";
import { WeatherAqiComponent } from "../../components/weather-aqi/weather-aqi.component";
import { Subject, takeUntil } from "rxjs";
import { LoaderService } from "../../../core/services/loader.service";
import { WeatherForecastComponent } from "../../components/weather-forecast/weather-forecast.component";
import { GeolocationService } from "../../../core/services/geolocation.service";
import { initializeApp } from "@angular/fire/app";
import { InitializeAppService } from "../../../core/services/initialize-app.service";
import { TranslateModule } from "@ngx-translate/core";
import { SunriseSunsetComponent } from "../../components/sunrise-sunset/sunrise-sunset.component";

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
    HeaderComponent,
    SidebarComponent,
    AuthComponent,
    WeatherCurrentComponent,
    WeatherCurrentDetailComponent,
    WeatherAqiComponent,
    WeatherForecastComponent,
    SunriseSunsetComponent,
  ],
  template: `
    <app-sidebar />
    <app-auth />
    <div class="container">
      <app-header />
      <div class="flex flex-column gap-6">
        @if (loaderService.isErrorSig()) {
          <div class="flex justify-content-center align-items-center border-1 border-primary border-round h-25rem">
            <p class="text-4xl text-red-500">
              {{ loaderService.errorMessage() }}
            </p>
          </div>
        } @else {
          @if (featuresService.featureListActive[0].current) {
            <app-weather-current
              [data]="weatherDataSig()"
              [geoData]="geolocationDataSig()"
              [class]="'flex-order-' + getPosition(0)"
            />
          }
          @if (featuresService.featureListActive[0].forecastHourly) {
            <app-weather-forecast
              forecastType="hourly"
              [class]="'flex-order-' + getPosition(1)"
              [dataInput]="weatherDataSig().hourly"
            />
          }
          @if (featuresService.featureListActive[0].currentDetail) {
            <app-weather-current-detail
              [dataInput]="weatherDataSig().current"
              [class]="'flex-order-' + getPosition(2)"
            />
          }
          @if (featuresService.featureListActive[0].forecastDaily) {
            <app-weather-forecast
              forecastType="daily"
              [class]="'flex-order-' + getPosition(3)"
              [dataInput]="weatherDataSig().daily"
            />
          }
          @if (featuresService.featureListActive[0].sunriseSunset) {
            <app-sunrise-sunset [data]="weatherDataSig().current" [class]="'flex-order-' + getPosition(5)" />
          }
          @if (featuresService.featureListActive[0].aqi) {
            <app-weather-aqi [dataInput]="weatherDataSig().aqi" [class]="'flex-order-' + getPosition(4)" />
          }
        }
      </div>
      <footer class="flex justify-content-center align-items-center my-7 h-3rem">
        <div class="text-xl font-medium">
          {{ "footer.copyright" | translate }} 2024 |
          <a class="p-0 text-primary no-underline hover:underline" href="https://github.com/AlbanesiDev" target="_blank"
            >AlbanesiDev</a
          >
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  public loaderService: LoaderService = inject(LoaderService);
  public featuresService: FeaturesService = inject(FeaturesService);
  private initializeAppService: InitializeAppService = inject(InitializeAppService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private unsubscribe$ = new Subject<boolean>();
  public weatherDataSig = signal<any>([]);
  public geolocationDataSig = signal<any>([]);
  public errorMessage: undefined;

  ngOnInit(): void {
    this.initializeAppService
      .initWeather()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.weatherDataSig.set(res.weather);
          this.geolocationDataSig.set(res.geo);
        },
        error: (err) => {
          this.loaderService.errorMessage.set(err);
        },
      });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
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
