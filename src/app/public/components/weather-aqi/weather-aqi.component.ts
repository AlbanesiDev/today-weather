import { CachedDataService } from './../../../core/services/cached-data.service';
import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TooltipModule } from "primeng/tooltip";
import { AqiPipe } from '../../shared/pipes/aqi.pipe';
import { DividerModule } from "primeng/divider";

@Component({
  selector: "app-weather-aqi",
  standalone: true,
  imports: [CommonModule, AsyncPipe, TranslateModule, TooltipModule, DividerModule, AqiPipe],
  templateUrl: "./weather-aqi.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherAqiComponent {
  private cachedDataService: CachedDataService = inject(CachedDataService);
  public weatherData$ = this.cachedDataService.cachedData();
}
