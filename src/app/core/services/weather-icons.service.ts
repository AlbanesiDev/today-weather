import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import {
  IconConfig,
  IListIcons,
  TWeatherIconsAnimations,
  TWeatherIconsFolder,
  TWeatherIconsType,
} from "../interface/icon.interface";
import { environment } from "../../../environments/environment";

/**
 * This service handles the retrieval of the icon list and stores user preferences
 * regarding icons, allowing a switch between 'fill' and 'outline' icons and their
 * respective non-animated versions. The stored values are used in a pipe to dynamically
 * change the path of the icon to be displayed.
 */
@Injectable({
  providedIn: "root",
})
export class WeatherIconsService {
  /**
   * Injects the LocalStorageService dependency.
   */
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  /**
   * Injects the HttpClient dependency.
   */
  private http: HttpClient = inject(HttpClient);

  /**
   * Key for storing user icon preferences in local storage.
   */
  private iconsKeyStorage: string = environment.LOCAL_STORAGE.userIconPreferences;

  /**
   * URL to fetch the list of weather icons.
   */
  private iconsUrl: string = environment.WEATHER_ICON_LIST;

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
   * Retrieves the list of icons as an Observable array of IListIcons.
   * @returns An Observable of IListIcons array.
   */
  public getIcons(): Observable<IListIcons[]> {
    return this.http.get<IListIcons[]>(this.iconsUrl);
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
   * Retrieves the appropriate weather icon URL based on the current time and weather conditions.
   * @param iconCode - The code representing the current weather condition.
   * @param iconsList - The list of available icons.
   * @returns The URL of the weather icon.
   */ public searchWeatherIcon(iconCode: number, iconsList: any): string {
    let hour = this.currentDate.getHours();
    let isNight = hour >= 19 || hour < 6;

    let matchingIcon = iconsList.find((icon: any) => icon.code === iconCode);
    if (isNight) {
      return matchingIcon.icon_night;
    } else if (!isNight) {
      return matchingIcon.icon_day;
    } else {
      return matchingIcon.icon;
    }
  }
}
