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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    .swiper-button-prev {
      left: 10px;
      right: auto;
    }

    /* Posiciona el botón "next" a la derecha */
    .swiper-button-next {
      right: 10px;
      left: auto;
    }
  `,
  templateUrl: "./weather-forecast-daily.component.html",
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
