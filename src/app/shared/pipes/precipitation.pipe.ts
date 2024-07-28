import { Pipe, type PipeTransform } from "@angular/core";
import { TPrecipitation } from "../../core/interface";
import { UNITS_DICTIONARY } from "../../core/utils";
/**
 * A pipe that transforms precipitation values into inches.
 */
@Pipe({
  name: "precipitationUnit",
  standalone: true,
})
export class PrecipitationPipe implements PipeTransform {
  private readonly MM_TO_INCH = 0.0393701;

  /**
   * Transforms a precipitation value to the specified unit.
   *
   * @param value The numerical value of precipitation to be converted.
   * @param unit The unit of measurement for the precipitation value ('mm' or 'in').
   * @returns A string representation of the value with the unit appended.
   */
  transform(value: number, unit: TPrecipitation): string {
    switch (unit) {
      case UNITS_DICTIONARY.PRECIPITATION.MM: {
        return this.formatValue(value, "mm");
      }
      case UNITS_DICTIONARY.PRECIPITATION.IN: {
        return this.formatValue(value * this.MM_TO_INCH, "in");
      }
    }
  }

  private formatValue(value: number, unit: string): string {
    return `${value.toFixed(1)} ${unit}`;
  }
}
