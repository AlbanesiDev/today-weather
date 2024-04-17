import { CommonModule } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CarouselModule } from "primeng/carousel";

import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { UnixTimestampPipe } from "../../shared/pipes/unix-timestamp.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { VisibilityPipe } from "../../shared/pipes/visibility.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { SpeedPipe } from "../../shared/pipes/speed.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";

import { LoaderService } from "../../../core/services/spinner-loader.service";
import { UnitsService } from "../../../core/services/units.service";
import { IconsService } from "../../../core/services/icons.service";

/**
 * `WeatherForecastComponent` is a reusable Angular component that displays weather data
 * either by the hour or by day of the week. It uses various pipes and services to format
 * and present the data, and includes a responsive swiper for navigation.
 */
@Component({
  selector: "app-weather-forecast",
  standalone: true,
  template: `
    <h2 class="pl-4">{{ "weather_forecast." + forecastType() | translate }}</h2>
    <swiper-container navigation="true" space-between="16" [slidesPerView]="slidesPerView">
      <!-- Skeleton Loader -->
      @if (loaderService.isLoadSig()) {
        @for (item of [1, 2, 3, 4, 5, 6, 7]; track $index) {
          <swiper-slide
            class=" flex flex-column justify-content-between h-25rem border-1 border-primary border-round py-5 px-4"
            style="background-color: transparent"
          >
            <p-skeleton borderRadius="0" styleClass="h-1rem mb-5" />
            <p-skeleton borderRadius="0" styleClass="h-10rem mb-5" />
            <p-skeleton borderRadius="0" styleClass="h-1rem mb-5" />
            <p-skeleton borderRadius="0" styleClass="h-1rem" />
          </swiper-slide>
        }
      } @else {
        <!-- Swiper -->
        @for (item of dataInput(); track $index) {
          <swiper-slide
            class=" flex flex-column justify-content-between h-28rem border-1 border-primary border-round py-1 px-1 xl:py-5 xl:px-3"
            style="background-color: transparent"
          >
            @if (forecastType() === "hourly") {
              <p class="text-center">
                {{ item.dt | UnixTimestamp | date: unitsService.formatTime() }} |
                {{ item.dt | UnixTimestamp | date: "MMMM dd" }}
              </p>
            } @else {
              <p class="text-center">{{ item.dt | UnixTimestamp | date: "EEEE, MMMM dd" }}</p>
            }
            <img
              class="w-full"
              [src]="
                iconsService.searchWeatherIcon(item.weather[0].id, true)
                  | IconDynamic: iconsService.iconsFolder()
              "
              [alt]="'icono de ' + item.weather[0].main"
            />
            <p class="text-center">{{ item.wind_speed | speedUnit: unitsService.speedUnit() }}</p>
            <p class="text-center">
              {{
                (forecastType() === "hourly" ? item.temp : item.temp.day)
                  | temperatureUnit: unitsService.temperatureUnit()
              }}
            </p>
            <p class="text-center capitalize">
              {{ "weather_description." + item.weather[0].id | translate }}
            </p>
          </swiper-slide>
        }
      }
    </swiper-container>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    CarouselModule,
    PrecipitationPipe,
    UnixTimestampPipe,
    TemperaturePipe,
    VisibilityPipe,
    PressurePipe,
    SpeedPipe,
    IconPipe,
  ],
})
export class WeatherForecastComponent {
  /**
   * The input data containing weather information.
   */
  public readonly dataInput = input.required<any>();
  /**
   * The type of forecast to display, either 'hourly' or 'daily'.
   */
  public readonly forecastType = input.required<"hourly" | "daily">();

  /**
   * The number of slides to show in the view, adjusted based on screen width.
   */
  public slidesPerView: number = 5;

  /**
   * The current width of the screen, used to adjust `slidesPerView`.
   */
  private screenWidth!: number;

  /**
   * Listens to window resize events to adjust the number of visible slides.
   */
  @HostListener("window:resize")
  getScreenWidth(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 320 && this.screenWidth <= 620) {
      this.slidesPerView = 3;
    } else if (this.screenWidth >= 620 && this.screenWidth <= 998) {
      this.slidesPerView = 4;
    } else {
      this.slidesPerView = 5;
    }
  }

  /**
   * Service to retrieve and manage weather icons.
   */
  public iconsService: IconsService = inject(IconsService);

  /**
   * Service to manage user preferences for units of measurement.
   */
  public unitsService: UnitsService = inject(UnitsService);

  /**
   * Service to control the display of the skeleton loader during data loading.
   */
  public loaderService: LoaderService = inject(LoaderService);
}
