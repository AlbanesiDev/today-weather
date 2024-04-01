import { Pipe, type PipeTransform } from "@angular/core";
import { TPrecipitation } from "../../../core/interface/units.inteface";
/**
 * A pipe that transforms precipitation values into inches.
 */
@Pipe({
  name: "precipitationUnit",
  standalone: true,
})
export class PrecipitationPipe implements PipeTransform {
  /**
   * Transforms a precipitation value to the specified unit.
   *
   * @param value The numerical value of precipitation to be converted.
   * @param unit The unit of measurement for the precipitation value ('mm' or 'in').
   * @returns A string representation of the value with the unit appended.
   */
  transform(value: number, unit: TPrecipitation): any {
    if (value && !isNaN(value)) {
      if (unit === "mm") {
        let mm = value.toFixed(1).toString();
        return `${mm} mm`; // Converts and formats the value to millimeters.
      }
      if (unit === "in") {
        let inc = (value * 0.0393701).toFixed(1).toString();
        return `${inc} in`; // Converts and formats the value to inches.
      }
    }
    return; // Returns undefined if the value is not a number or is not provided.
  }
}
