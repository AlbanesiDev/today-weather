import { Pipe, type PipeTransform } from "@angular/core";
/**
 * Pipe that transforms air quality index (AQI) pollutant codes into their respective chemical symbols.
 */
@Pipe({
  name: "aqiPipe",
  standalone: true,
})
export class AqiPipe implements PipeTransform {
  /**
   * Transforms the input pollutant code to its chemical symbol.
   * @param value The pollutant code as a string.
   * @returns The chemical symbol for the given pollutant code or the original value if no match is found.
   */
  transform(value: unknown): string | unknown {
    switch (value) {
      case "co":
        return "CO";
      case "nh3":
        return "NH₃";
      case "no":
        return "NO";
      case "no2":
        return "NO₂";
      case "o3":
        return "O₃";
      case "pm10":
        return "PM 10";
      case "pm2_5":
        return "PM 2,5";
      case "so2":
        return "SO₂";
    }
    return value;
  }
}
