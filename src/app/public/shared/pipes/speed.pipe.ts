import { Pipe, type PipeTransform } from "@angular/core";
import { TSpeed } from "../../../core/interface/units.inteface";
/**
 * A pipe that transforms speed values into different units.
 */
@Pipe({
  name: "speedUnit",
  standalone: true,
})
export class SpeedPipe implements PipeTransform {

  /**
   * Transforms a speed value into the specified unit.
   * @param value The speed value in m/s.
   * @param unit The unit to convert the speed into.
   * @returns The speed value converted into the specified unit.
   */
  transform(value: number, unit: TSpeed): any {
    switch (unit) {
      case "mph":
        // Convert m/s to mph
        const mph = (value * 2.23694).toFixed(2).toString();
        return `${mph} Mph`;
      case "kmh":
        // Convert m/s to km/h
        const ms = (value * 3.6).toFixed(2).toString();
        return `${ms} km/h`;
      case "beaufort":
        // Convert m/s to Beaufort scale
        return this.msToBeaufort(value);
      case "knots":
        // Convert m/s to knots
        const knots = (value * 1.94384).toFixed(2).toString();
        return `${knots} Knots`;
      default:
        // Return the default value in m/s
        return `${value} m/s`;
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
