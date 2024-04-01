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
   * @param value The speed value in km/h.
   * @param unit The unit to convert the speed into.
   * @returns The speed value converted into the specified unit.
   */
  transform(value: number, unit: TSpeed): any {
    switch (unit) {
      case "mph":
        // Convert km/h to mph
        const mph = (value * 0.621371).toFixed(2).toString();
        return `${mph} Mph`;
      case "ms":
        // Convert km/h to m/s
        const ms = (value / 3.6).toFixed(2).toString();
        return `${ms} m/s`;
      case "beaufort":
        // Convert km/h to Beaufort scale
        return this.kmhToBeaufort(value);
      case "knots":
        // Convert km/h to knots
        const knots = (value / 1.852).toFixed(2).toString();
        return `${knots} Knots`;
      default:
        // Return the default value in km/h
        return `${value} Km/h`;
    }
  }

  /**
   * Converts km/h to the Beaufort scale.
   * @param kmh The speed value in km/h.
   * @returns The corresponding Beaufort scale description.
   */
  private kmhToBeaufort(kmh: number): string {
    if (kmh < 2) return "0 (Calm)";
    if (kmh < 6) return "1 (Light air)";
    if (kmh < 12) return "2 (Light breeze)";
    if (kmh < 20) return "3 (Gentle breeze)";
    if (kmh < 29) return "4 (Moderate breeze)";
    if (kmh < 39) return "5 (Fresh breeze)";
    if (kmh < 50) return "6 (Strong breeze)";
    if (kmh < 62) return "7 (Moderate gale)";
    if (kmh < 75) return "8 (Fresh gale)";
    if (kmh < 89) return "9 (Strong gale)";
    if (kmh < 103) return "10 (Whole gale)";
    if (kmh < 118) return "11 (Storm)";
    return "12 (Hurricane)";
  }
}
