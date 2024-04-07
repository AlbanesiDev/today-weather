import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { WeatherService } from "../../../core/services/weather.service";
import { VisibilityPipe } from "../../shared/pipes/visibility.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";

import { UnitsService } from "../../../core/services/units.service";
import { WeatherIconsService } from "../../../core/services/weather-icons.service";

@Component({
  selector: "app-weather-current-detail",
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
  ],
  templateUrl: "./weather-current-detail.component.html",
  styleUrl: "./weather-current-detail.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCurrentDetailComponent {
  /**
   * Service for managing unit conversions.
   */
  public unitsService: UnitsService = inject(UnitsService);

  /**
   * Service for fetching weather data.
   */
  public weatherService: WeatherService = inject(WeatherService);

  /**
   * Service for managing weather icons.
   */
  public weatherIconsService: WeatherIconsService = inject(WeatherIconsService);

  /**
   * Observable for current weather data.
   */
  public currentData$ = this.weatherService.getWeatherOwmOne();
}
