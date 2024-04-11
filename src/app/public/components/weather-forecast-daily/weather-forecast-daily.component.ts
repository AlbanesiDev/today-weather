import { AsyncPipe, CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

import { UnitsService } from "../../../core/services/units.service";
import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";
import { UnixTimestampPipe } from "../../shared/pipes/unix-timestamp.pipe";
import { VisibilityPipe } from "../../shared/pipes/visibility.pipe";

import { CachedDataService } from "../../../core/services/cached-data.service";
import { IconsService } from "../../../core/services/icons.service";

import { CarouselModule } from "primeng/carousel";

@Component({
  selector: "app-weather-forecast-daily",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AsyncPipe,
    TemperaturePipe,
    PressurePipe,
    VisibilityPipe,
    PrecipitationPipe,
    IconPipe,
    UnixTimestampPipe,
    CarouselModule,
  ],
  template: `
    @if (weatherData$ | async; as weather) {
      <swiper-container class="mySwiper" navigation="true" slides-per-view="5" space-between="16">
        @for (item of weather.daily; track $index) {
          <swiper-slide
            class="border-1 border-primary border-round p-3 flex flex-column"
            style="background-color: transparent"
          >
            <p class="text-center">{{ item.dt | UnixTimestamp | date: "EEEE, MMMM d" }}</p>
            <img
              class="w-full"
              [src]="iconsService.searchWeatherIcon(item.weather[0].id, true) | IconDynamic: iconsService.iconsFolder()"
              [alt]="'icono de ' + item.weather[0].main"
            />
            <p class="text-center">{{ item.temp.day | temperatureUnit: unitsService.temperatureUnit() }}</p>
            <p class="text-center capitalize">{{ item.weather[0].description }}</p>
          </swiper-slide>
        }
      </swiper-container>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecastDailyComponent {
  /**
   * Injects the CachedDataService to access cached data.
   */
  private cachedDataService: CachedDataService = inject(CachedDataService);

  /**
   * Injects the iconsService to retrieve the list of weather icons.
   */
  public iconsService: IconsService = inject(IconsService);

  /**
   * Injects the UnitsService to manage user preferences for units of measurement.
   */
  public unitsService: UnitsService = inject(UnitsService);

  /**
   * An Observable that streams the current weather data.
   */
  public weatherData$ = this.cachedDataService.cachedData();
}
