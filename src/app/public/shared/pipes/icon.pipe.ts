import { Pipe, type PipeTransform } from "@angular/core";
import { TIcons } from "../../../core/interface/icon.interface";
/**
 * A pipe that dynamically generates the path to icon assets
 * based on the specified icon type.
 */
@Pipe({
  name: "IconDynamic",
  standalone: true,
})
export class IconPipe implements PipeTransform {
  /**
   * Transforms the input icon name into a path to the corresponding SVG asset.
   *
   * @param {string} icon - The name of the icon.
   * @param {TIcons} type - The type of the icon, which determines the folder and style of the icon.
   * @returns {string} - The path to the SVG asset for the icon.
   */
  transform(icon: string, type: TIcons): string {
    switch (type) {
      case "fill":
        let fill = `/assets/icons/weather-fill/${icon}.svg`;
        return fill;
      case "fill-static":
        let fillStatic = `/assets/icons/weather-fill-static/${icon}.svg`;
        return fillStatic;
      case "outline":
        let outline = `/assets/icons/weather-outline/${icon}.svg`;
        return outline;
      case "outline-static":
        let outlineStatic = `/assets/icons/weather-outline-static/${icon}.svg`;
        return outlineStatic;
    }
  }
}
