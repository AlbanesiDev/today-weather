import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { CachedDataService } from "../../../core/services/cached-data.service";
import { IconsService } from "../../../core/services/icons.service";
import { UnitsService } from "../../../core/services/units.service";

import { UnixTimestampPipe } from "../../shared/pipes/unix-timestamp.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { SpeedPipe } from "./../../shared/pipes/speed.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";

@Component({
  selector: "app-weather-forecast-hourly",
  standalone: true,
  imports: [CommonModule, IconPipe, UnixTimestampPipe, TemperaturePipe, SpeedPipe],
  template: `@if (weatherData$ | async; as weather) {
    <swiper-container navigation="true" slides-per-view="5" space-between="16">
      @for (item of weather.hourly; track $index) {
        <swiper-slide
          class="border-1 border-primary border-round p-3 flex flex-column"
          style="background-color: transparent"
        >
          <p class="text-center">
            {{ item.dt | UnixTimestamp | date: unitsService.formatTime() }} |
            {{ item.dt | UnixTimestamp | date: "MMMM dd" }}
          </p>
          <img
            class="w-full"
            [src]="iconsService.searchWeatherIcon(item.weather[0].id, true) | IconDynamic: iconsService.iconsFolder()"
            [alt]="'icono de ' + item.weather[0].main"
          />
          <p class="text-center">{{ item.wind_speed | speedUnit: unitsService.speedUnit() }}</p>
          <p class="text-center">{{ item.temp | temperatureUnit: unitsService.temperatureUnit() }}</p>
          <p class="text-center capitalize">{{ item.weather[0].description }}</p>
        </swiper-slide>
      }
    </swiper-container>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeatherForecastHourlyComponent {
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
