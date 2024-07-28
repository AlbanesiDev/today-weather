import { Pipe, type PipeTransform } from "@angular/core";
import { AQI_DICTIONARY } from "../../core/utils";
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
  transform(value: string): string {
    switch (value) {
      case AQI_DICTIONARY.POLLUTANT.CO:
        return "CO";
      case AQI_DICTIONARY.POLLUTANT.NH3:
        return "NH₃";
      case AQI_DICTIONARY.POLLUTANT.NO:
        return "NO";
      case AQI_DICTIONARY.POLLUTANT.NO2:
        return "NO₂";
      case AQI_DICTIONARY.POLLUTANT.O3:
        return "O₃";
      case AQI_DICTIONARY.POLLUTANT.PM10:
        return "PM 10";
      case AQI_DICTIONARY.POLLUTANT.PM2_5:
        return "PM 2,5";
      case AQI_DICTIONARY.POLLUTANT.SO2:
        return "SO₂";
    }
    return value;
  }
}
