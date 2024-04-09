import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { WeatherCurrentComponent } from "../../components/weather-current/weather-current.component";
import { AuthComponent } from "../../components/auth/auth.component";
import { WeatherCurrentDetailComponent } from "../../components/weather-current-detail/weather-current-detail.component";
import { WeatherForecastDailyComponent } from "../../components/weather-forecast-daily/weather-forecast-daily.component";
import { FeaturesService } from "./../../../core/services/features.service";
import { WeatherForecastHourlyComponent } from "../../components/weather-forecast-hourly/weather-forecast-hourly.component";
import { WeatherAqiComponent } from "../../components/weather-aqi/weather-aqi.component";

/**
 * The HomeComponent is responsible for rendering the main home view.
 * It includes the sidebar, authentication, header, and various weather components.
 * The order of the weather components is determined by the `getPosition` method,
 * which is based on the current order of features in the `FeaturesService`.
 */
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    AuthComponent,
    WeatherCurrentComponent,
    WeatherForecastHourlyComponent,
    WeatherCurrentDetailComponent,
    WeatherForecastDailyComponent,
    WeatherAqiComponent,
  ],
  template: `
    <app-sidebar />
    <app-auth />
    <div class="container">
      <app-header />
      <div class="flex flex-column gap-6">
        <app-weather-current [class]="'flex-order-' + getPosition(0)" />
        <app-weather-forecast-hourly [class]="'flex-order-' + getPosition(1)" />
        <app-weather-current-detail [class]="'flex-order-' + getPosition(2)" />
        <app-weather-forecast-daily [class]="'flex-order-' + getPosition(3)" />
        <app-weather-aqi [class]="'flex-order-' + getPosition(4)" />
      </div>
      <footer class="flex justify-content-center align-items-center p-7 h-3rem">
        <div class="text-xl font-medium">
          Copyright 2024 |
          <a href="https://github.com/AlbanesiDev" class="p-0 text-primary no-underline hover:underline">AlbanesiDev</a>
        </div>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public featuresService: FeaturesService = inject(FeaturesService);

  /**
   * Retrieves the current position of a feature by its ID.
   * @param id The unique identifier of the feature.
   * @returns The current position of the feature within the feature list.
   */
  public getPosition(id: number): number {
    return this.featuresService.featureList().findIndex((feature) => feature.id === id);
  }
}
