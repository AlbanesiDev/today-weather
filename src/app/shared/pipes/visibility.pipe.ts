import { Pipe, type PipeTransform } from "@angular/core";
import { TVisibility } from "../../core/interface";
import { UNITS_DICTIONARY } from "../../core/utils";

/**
 * A pipe that transforms visibility distance from meters to kilometers or miles.
 */
@Pipe({
  name: "visibilityUnit",
  standalone: true,
})
export class VisibilityPipe implements PipeTransform {
  private readonly KM_CONVERSION = 1000;
  private readonly MI_CONVERSION = 1609.34;

  /**
   * Transforms visibility distance from meters to the specified unit (kilometers or miles).
   *
   * @param value The visibility distance in meters.
   * @param unit The unit to which the distance is to be converted ('km' for kilometers, 'mi' for miles).
   * @returns The visibility distance converted to the specified unit, as a string with the unit abbreviation appended.
   */
  transform(value: number, unit: TVisibility): string {
    switch (unit) {
      case UNITS_DICTIONARY.VISIBILITY.KM: {
        const kilometers = (value / this.KM_CONVERSION).toFixed(2);
        return `${kilometers} ${UNITS_DICTIONARY.VISIBILITY.KM}`;
      }
      case UNITS_DICTIONARY.VISIBILITY.MI: {
        const miles = (value / this.MI_CONVERSION).toFixed(2);
        return `${miles} ${UNITS_DICTIONARY.VISIBILITY.MI}`;
      }
    }
  }
}
