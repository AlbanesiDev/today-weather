import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

import { WeatherIconsService } from "../../../core/services/weather-icons.service";
import { WeatherService } from "./../../../core/services/weather.service";
import { UnitsService } from "../../../core/services/units.service";
import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { SpeedPipe } from "../../shared/pipes/speed.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";
/**
 * Component that displays current weather information.
 */
@Component({
  selector: "app-weather-current",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    AsyncPipe,
    TemperaturePipe,
    SpeedPipe,
    PressurePipe,
    PrecipitationPipe,
    IconPipe,
  ],
  templateUrl: "./weather-current.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCurrentComponent {
  /**
   * Injects the WeatherService to fetch weather data.
   */
  private weatherService: WeatherService = inject(WeatherService);

  /**
   * Injects the WeatherIconsService to retrieve the list of weather icons.
   */
  public weatherIconService: WeatherIconsService = inject(WeatherIconsService);

  /**
   * Injects the UnitsService to manage user preferences for units of measurement.
   */
  public unitsService: UnitsService = inject(UnitsService);
  /**
   * An Observable that streams the current weather data fetched from OpenWeatherMap.
   */
  public weatherData$ = this.weatherService.getWeatherOwm();

  /**
   * An Observable that streams the list of weather icons.
   */
  public weatherIcons$ = this.weatherIconService.getIcons();

  /**
   * Holds the current date and time, used to determine day or night for icon selection.
   */
  public currentDate = new Date();

  /**
   * Retrieves the appropriate weather icon URL based on the current time and weather conditions.
   * @param iconCode - The code representing the current weather condition.
   * @param iconsList - The list of available icons.
   * @returns The URL of the weather icon.
   */ public searchWeatherIcon(iconCode: number, iconsList: any): string {
    let hour = this.currentDate.getHours();
    let isNight = hour >= 19 || hour < 6;

    let matchingIcon = iconsList.find((icon: any) => icon.code === iconCode);
    if (isNight) {
      return matchingIcon.icon_night;
    } else if (!isNight) {
      return matchingIcon.icon_day;
    } else {
      return matchingIcon.icon;
    }
  }
}
