import { Pipe, type PipeTransform } from "@angular/core";
import { TPressure } from "../../../core/interface/units.inteface";
/**
 * A pipe that transforms pressure values into different units.
 */
@Pipe({
  name: "pressureUnit",
  standalone: true,
})
export class PressurePipe implements PipeTransform {
  /**
   * Transforms a pressure value to the specified unit.
   *
   * @param value The pressure value in hectopascals (hPa).
   * @param unit The target pressure unit.
   * @returns The pressure value converted to the target unit, as a string with the unit abbreviation.
   */
  transform(value: number, unit: TPressure): any {
    switch (unit) {
      case "mbar":
        // Converts hPa to mbar (millibar)
        const mbar = value.toFixed(2).toString();
        return `${mbar} mBar`;
      case "inhg":
        // Converts hPa to inHg (inches of mercury)
        const inhg = (value * 0.0295299).toFixed(2).toString();
        return `${inhg} inHg`;
      case "psi":
        // Converts hPa to psi (pounds per square inch)
        const psi = (value * 0.0145038).toFixed(2).toString();
        return `${psi} Psi`;
      case "bar":
        // Converts hPa to bar
        const bar = (value * 0.001).toFixed(2).toString();
        return `${bar} Bar`;
      case "mmhg":
        // Converts hPa to mmHg (millimeters of mercury)
        const mmhg = (value * 0.750062).toFixed(2).toString();
        return `${mmhg} mmHg`;
      case "kpa":
        // Converts hPa to kPa (kilopascals)
        const kpa = (value * 0.1).toFixed(2).toString();
        return `${kpa} kPa`;
      default:
        // Returns the default value in hPa (hectopascal)
        return `${value} hPa`;
    }
  }
}
