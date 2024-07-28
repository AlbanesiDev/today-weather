import { Pipe, type PipeTransform } from "@angular/core";
import { TWeatherIconsFolder } from "../../core/interface";
import { ICONS_DICTIONARY } from "../../core/utils";
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
   * @param {TWeatherIconsFolder} type - The type of the icon, which determines the folder and style of the icon.
   * @returns {string} - The path to the SVG asset for the icon.
   */
  transform(icon: string, type: TWeatherIconsFolder): string {
    switch (type) {
      case ICONS_DICTIONARY.ICONS_FOLDER.FILL:
        return this.getIconPath(icon, "weather-fill");
      case ICONS_DICTIONARY.ICONS_FOLDER.FILL_STATIC:
        return this.getIconPath(icon, "weather-fill-static");
      case ICONS_DICTIONARY.ICONS_FOLDER.OUTLINE:
        return this.getIconPath(icon, "weather-outline");
      case ICONS_DICTIONARY.ICONS_FOLDER.OUTLINE_STATIC:
        return this.getIconPath(icon, "weather-outline-static");
    }
  }

  private getIconPath(icon: string, folder: string): string {
    return `/assets/icons/${folder}/${icon}.svg`;
  }
}
