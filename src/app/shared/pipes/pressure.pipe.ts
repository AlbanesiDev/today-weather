import { Pipe, type PipeTransform } from "@angular/core";
import { TPressure } from "../../core/interface";
import { UNITS_DICTIONARY } from "../../core/utils";
/**
 * A pipe that transforms pressure values into different units.
 */
@Pipe({
  name: "pressureUnit",
  standalone: true,
})
export class PressurePipe implements PipeTransform {
  private readonly HPA_TO_MBAR = 1;
  private readonly HPA_TO_INHG = 0.0295299;
  private readonly HPA_TO_PSI = 0.0145038;
  private readonly HPA_TO_BAR = 0.001;
  private readonly HPA_TO_MMHG = 0.750062;
  private readonly HPA_TO_KPA = 0.1;

  /**
   * Transforms a pressure value to the specified unit.
   *
   * @param value The pressure value in hectopascals (hPa).
   * @param unit The target pressure unit.
   * @returns The pressure value converted to the target unit, as a string with the unit abbreviation.
   */
  transform(value: number, unit: TPressure): string {
    switch (unit) {
      case UNITS_DICTIONARY.PRESSURE.MBAR: {
        return this.formatValue(value * this.HPA_TO_MBAR, "mBar");
      }
      case UNITS_DICTIONARY.PRESSURE.INHG: {
        return this.formatValue(value * this.HPA_TO_INHG, "inHg");
      }
      case UNITS_DICTIONARY.PRESSURE.PSI: {
        return this.formatValue(value * this.HPA_TO_PSI, "Psi");
      }
      case UNITS_DICTIONARY.PRESSURE.BAR: {
        return this.formatValue(value * this.HPA_TO_BAR, "Bar");
      }
      case UNITS_DICTIONARY.PRESSURE.MMHG: {
        return this.formatValue(value * this.HPA_TO_MMHG, "mmHg");
      }
      case UNITS_DICTIONARY.PRESSURE.KPA: {
        return this.formatValue(value * this.HPA_TO_KPA, "kPa");
      }
      default: {
        return this.formatValue(value, "hPa");
      }
    }
  }

  private formatValue(value: number, unit: string): string {
    return `${value.toFixed(2)} ${unit}`;
  }
}
