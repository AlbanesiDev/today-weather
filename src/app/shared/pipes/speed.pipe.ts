import { Pipe, type PipeTransform } from "@angular/core";
import { TSpeed } from "../../core/interface";
import { UNITS_DICTIONARY } from "../../core/utils";
/**
 * A pipe that transforms speed values into different units.
 */
@Pipe({
  name: "speedUnit",
  standalone: true,
})
export class SpeedPipe implements PipeTransform {
  private readonly MS_TO_MPH = 2.23694;
  private readonly MS_TO_KMH = 3.6;
  private readonly MS_TO_KNOTS = 1.94384;

  /**
   * Transforms a speed value into the specified unit.
   * @param value The speed value in m/s.
   * @param unit The unit to convert the speed into.
   * @returns The speed value converted into the specified unit.
   */
  transform(value: number, unit: TSpeed): string {
    switch (unit) {
      case UNITS_DICTIONARY.SPEED.MPH: {
        const mph = (value * this.MS_TO_MPH).toFixed(2);
        return `${mph} Mph`;
      }
      case UNITS_DICTIONARY.SPEED.KMH: {
        const kmh = (value * this.MS_TO_KMH).toFixed(2);
        return `${kmh} km/h`;
      }
      case UNITS_DICTIONARY.SPEED.BEAUFORT: {
        return this.msToBeaufort(value);
      }
      case UNITS_DICTIONARY.SPEED.KNOTS: {
        const knots = (value * this.MS_TO_KNOTS).toFixed(2);
        return `${knots} Knots`;
      }
      default: {
        return `${value} m/s`;
      }
    }
  }

  /**
   * Converts m/s to the Beaufort scale.
   * @param ms The speed value in m/s.
   * @returns The corresponding Beaufort scale description.
   */
  private msToBeaufort(ms: number): string {
    if (ms < 2) return "calm";
    if (ms < 6) return "light_air";
    if (ms < 12) return "light_breeze";
    if (ms < 20) return "gentle_breeze";
    if (ms < 29) return "moderate_breeze";
    if (ms < 39) return "fresh_breeze";
    if (ms < 50) return "strong_breeze";
    if (ms < 62) return "moderate_gale";
    if (ms < 75) return "fresh_gale";
    if (ms < 89) return "strong_gale";
    if (ms < 103) return "whole_gale";
    if (ms < 118) return "storm";
    return "hurricane";
  }
}
