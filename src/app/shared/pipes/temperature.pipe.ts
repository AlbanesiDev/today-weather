import { Pipe, type PipeTransform } from "@angular/core";
import { TTemperature } from "../../core/interface";
import { UNITS_DICTIONARY } from "../../core/utils";

/**
 * A pipe that transforms temperature values into degrees Fahrenheit.
 */
@Pipe({
  name: "temperatureUnit",
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  private readonly CELSIUS_TO_FAHRENHEIT = (value: number) => (value * 9) / 5 + 32;

  /**
   * Transforms the input temperature value to a formatted string with the specified unit.
   *
   * @param value The numeric value of the temperature to transform.
   * @param unit The unit of temperature, either 'c' for Celsius or 'f' for Fahrenheit.
   * @returns A string representing the formatted temperature with its unit.
   */
  transform(value: number, unit: TTemperature): string {
    switch (unit) {
      case UNITS_DICTIONARY.TEMPERATURE.C: {
        const celsius = value.toFixed(1).toString();
        return `${celsius} °${UNITS_DICTIONARY.TEMPERATURE.C}`;
      }
      case UNITS_DICTIONARY.TEMPERATURE.F: {
        const fahrenheit = this.CELSIUS_TO_FAHRENHEIT(value).toFixed(1);
        return `${fahrenheit} °${UNITS_DICTIONARY.TEMPERATURE.F}`;
      }
    }
  }
}
