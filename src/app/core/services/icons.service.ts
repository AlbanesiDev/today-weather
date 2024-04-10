import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "./local-storage.service";
import {
  IconConfig,
  TWeatherIconsAnimations,
  TWeatherIconsFolder,
  TWeatherIconsType,
} from "../interface/icon.interface";
import { environment } from "../../../environments/environment";
import { iconsList } from "../data/weather-icons.data";

/**
 * This service stores user preferences regarding icons, allowing a switch between
 * 'fill' and 'outline' icons and their respective non-animated versions.
 * The stored values are used in a pipe to dynamically change the path of the icon to be displayed.
 */
@Injectable({
  providedIn: "root",
})
export class IconsService {
  /**
   * Injects the LocalStorageService dependency.
   */
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  /**
   * Key for storing user icon preferences in local storage.
   */
  private iconsKeyStorage: string = environment.LOCAL_STORAGE.userIconPreferences;

  /**
   * Stores the current icon type ('fill' or 'outline').
   */
  public iconsType = signal<TWeatherIconsType>("outline");

  /**
   * Stores whether the icon is animated ('on') or static ('off').
   */
  public iconsAnimations = signal<TWeatherIconsAnimations>("on");

  /**
   * Stores the folder path for the current icon type.
   */
  public iconsFolder = signal<TWeatherIconsFolder>("outline");

  /**
   * Holds the current date and time, used to determine day or night for icon selection.
   */
  private currentDate = new Date();

  /**
   * Configuration mapping for icon types and their corresponding folder and animation states.
   */
  private iconConfig: IconConfig = {
    fill: { type: "fill", animation: "on", folder: "fill" },
    outline: { type: "outline", animation: "on", folder: "outline" },
    "fill-static": { type: "fill", animation: "off", folder: "fill-static" },
    "outline-static": { type: "outline", animation: "off", folder: "outline-static" },
  };

  /**
   * The constructor retrieves the stored icon type and sets the signals accordingly.
   */
  constructor() {
    let iconTypeStorage = this.localStorageService.getItem(this.iconsKeyStorage) as keyof IconConfig;
    const config = this.iconConfig[iconTypeStorage];

    if (config) {
      this.iconsType.set(config.type);
      this.iconsAnimations.set(config.animation);
      this.iconsFolder.set(config.folder);
    }
  }

  /**
   * Determines the icon folder path based on the current animation state and updates
   * the local storage with the new icon folder value.
   */
  public getTypeIcons(): void {
    const iconState = this.iconsAnimations() === "on" ? "" : "-static";
    this.iconsFolder.set(`${this.iconsType()}${iconState}`);
    this.localStorageService.setItem(this.iconsKeyStorage, this.iconsFolder());
  }

  /**
   * Retrieves the appropriate weather icon based on time and weather conditions,
   * and an optional default parameter.
   * @param iconCode - The code representing the weather condition.
   * @param useDefault - Optional parameter to return default icons.
   * @returns The weather icon.
   */
  public searchWeatherIcon(iconCode: number, useDefault?: boolean): string {
    let hour = this.currentDate.getHours();
    let isNight = hour >= 19 || hour < 6;

    let matchingIcon = iconsList.find((icon: any) => icon.code === iconCode);

    if (!matchingIcon) {
      return "not-available";
    }

    if (useDefault) {
      return matchingIcon.icon;
    }

    return isNight ? matchingIcon.icon_night : matchingIcon.icon_day;
  }
}
