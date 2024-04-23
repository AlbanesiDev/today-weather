import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";

import { TranslateModule } from "@ngx-translate/core";

import { SkeletonModule } from "primeng/skeleton";

import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { SpeedPipe } from "../../shared/pipes/speed.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";

import { LoaderService } from "../../../core/services/loader.service";
import { IconsService } from "../../../core/services/icons.service";
import { UnitsService } from "../../../core/services/units.service";
/**
 * Component that displays current weather information.
 */
@Component({
  selector: "app-weather-current",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonModule,
    PrecipitationPipe,
    TemperaturePipe,
    PressurePipe,
    SpeedPipe,
    IconPipe,
    AsyncPipe
  ],
  templateUrl: "./weather-current.component.html",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WeatherCurrentComponent {
  public data = input.required<any>();
  public geoData = input.required<any>();

  /**
   * Injects the iconsService to retrieve the list of weather icons.
   */
  public iconsService: IconsService = inject(IconsService);

  /**
   * Injects the UnitsService to manage user preferences for units of measurement.
   */
  public unitsService: UnitsService = inject(UnitsService);

  /**
   * Inject the LoaderService to show or hide the skeleton loader
   */
  public loaderService: LoaderService = inject(LoaderService);

  /**
   * Holds the current date.
   */
  public currentDate = new Date();
}
