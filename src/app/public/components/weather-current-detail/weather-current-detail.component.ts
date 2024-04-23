import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { PrecipitationPipe } from "../../shared/pipes/precipitation.pipe";
import { TemperaturePipe } from "../../shared/pipes/temperature.pipe";
import { VisibilityPipe } from "../../shared/pipes/visibility.pipe";
import { PressurePipe } from "../../shared/pipes/pressure.pipe";
import { IconPipe } from "../../shared/pipes/icon.pipe";

import { SkeletonModule } from "primeng/skeleton";

import { LoaderService } from "../../../core/services/loader.service";
import { UnitsService } from "../../../core/services/units.service";
import { IconsService } from "../../../core/services/icons.service";

@Component({
  selector: "app-weather-current-detail",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PrecipitationPipe,
    TemperaturePipe,
    VisibilityPipe,
    PressurePipe,
    IconPipe,
    SkeletonModule,
    AsyncPipe
  ],
  templateUrl: "./weather-current-detail.component.html",
  styleUrl: "./weather-current-detail.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCurrentDetailComponent {
  /**
   * The input data containing weather current information.
   */
  public readonly dataInput = input.required<any>();

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
}
