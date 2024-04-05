import { Pipe, type PipeTransform } from "@angular/core";
import { TVisibility } from "../../../core/interface/units.inteface";
/**
 * A pipe that transforms visibility distance from meters to kilometers or miles.
 */
@Pipe({
  name: "visibilityUnit",
  standalone: true,
})
export class VisibilityPipe implements PipeTransform {
  /**
   * Transforms visibility distance from meters to the specified unit (kilometers or miles).
   *
   * @param value The visibility distance in meters.
   * @param unit The unit to which the distance is to be converted ('km' for kilometers, 'mi' for miles).
   * @returns The visibility distance converted to the specified unit, as a string with the unit abbreviation appended.
   */
  transform(value: number, unit: TVisibility): any {
    if (value && !isNaN(value)) {
      if (unit === "km") {
        let kiometer = (value / 1000).toFixed(2).toString();
        return `${kiometer} Km`;
      }
      if (unit === "mi") {
        let millas = (value / 1609.34).toFixed(2).toString();
        return `${millas} mi`;
      }
    }
    return null;
  }
}
