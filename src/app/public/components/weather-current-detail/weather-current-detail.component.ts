import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { VisibilityPipe } from "../../shared/pipes/visibility.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";

import { CachedDataService } from "./../../../core/services/cached-data.service";
import { UnitsService } from "../../../core/services/units.service";
import { IconsService } from "../../../core/services/icons.service";

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
