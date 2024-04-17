import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

import { TooltipModule } from "primeng/tooltip";
import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";

import { AqiPipe } from "../../shared/pipes/aqi.pipe";
import { TAqi } from "../../../core/interface/aqi.interface";

/**
 * The `WeatherAqiComponent` displays air pollution data.
 */
@Component({
  selector: "app-weather-aqi",
  standalone: true,
  imports: [CommonModule, TranslateModule, TooltipModule, DividerModule, ButtonModule, AqiPipe],
  templateUrl: "./weather-aqi.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherAqiComponent {
  /**
   * Input signal that receives air quality data.
   */
  public dataInput = input.required<any>();

  /**
   * Returns the severity level, used to display the current state and its description.
   * @param index The air quality index value.
   * @returns The string representing the severity level.
   */
  public returnSeverity(index: TAqi) {
    switch (index) {
      case 1:
        return "good";
      case 2:
        return "moderate";
      case 3:
        return "unhealthy_f_s_g";
      case 4:
        return "unhealthy";
      case 5:
        return "very_unhealthy";
    }
  }

  /**
   * Returns the text color class based on the air quality index value.
   * @param index The air quality index value.
   * @returns The string representing the Tailwind CSS class for text color.
   */
  public returnTextColor(index: TAqi): string {
    switch (index) {
      case 1:
        return "text-green-500";
      case 2:
        return "text-yellow-400";
      case 3:
        return "text-orange-500";
      case 4:
        return "text-red-500";
      case 5:
        return "text-purple-500";
    }
  }
}
