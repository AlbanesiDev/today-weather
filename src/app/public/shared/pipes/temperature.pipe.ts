import { Pipe, type PipeTransform } from "@angular/core";
import { TTemperature } from "../../../core/interface/units.inteface";
/**
 * A pipe that transforms temperature values into degrees Fahrenheit.
 */
@Pipe({
  name: "temperatureUnit",
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  /**
   * Transforms the input temperature value to a formatted string with the specified unit.
   *
   * @param value The numeric value of the temperature to transform.
   * @param unit The unit of temperature, either 'c' for Celsius or 'f' for Fahrenheit.
   * @returns A string representing the formatted temperature with its unit.
   */
  transform(value: number, unit: TTemperature): any {
    if (value && !isNaN(value)) {
      if (unit === "c") {
        // Convert the value to a string with one decimal place and append °C.
        let celsius = value.toFixed(1).toString();
        return `${celsius} °C`;
      }
      if (unit === "f") {
        // Convert the value to Fahrenheit, format to one decimal place, and append °F.
        let fahrenheit = ((value * 9) / 5 + 32).toFixed(1).toString();
        return `${fahrenheit} °F`;
      }
    }
    // If the value is not a number or the unit is not recognized, return undefined.
    return;
  }
}
