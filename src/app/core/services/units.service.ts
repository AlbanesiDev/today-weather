import { Injectable, inject, signal } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { TFormatTime, TPrecipitation, TPressure, TSpeed, TTemperature } from "../interface/units.inteface";

/**
 * A service that provides unit preferences functionality.
 * It allows the application to maintain and update user preferences for various units like time format, temperature, speed, pressure, and precipitation.
 */
@Injectable({
  providedIn: "root",
})
export class UnitsService {
  /**
   * The LocalStorageService is injected to interact with the browser's local storage.
   */
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  /**
   * Signals representing the user's unit preferences for various measurements.
   */
  public formatTime = signal<TFormatTime>("HH:mm a");
  public temperatureUnit = signal<TTemperature>("c");
  public speedUnit = signal<TSpeed>("kmh");
  public pressureUnit = signal<TPressure>("hpa");
  public precipitationUnit = signal<TPrecipitation>("mm");
  /**
   * An array to hold the preferences with their corresponding keys, signals, and default values.
   * This structure allows for a scalable way to manage multiple user preferences.
   */
  private prefs: { key: string; signal: any; default: any }[] = [
    { key: "userFormatTime", signal: this.formatTime, default: "HH:mm a" },
    { key: "userTemperatureUnit", signal: this.temperatureUnit, default: "c" },
    { key: "userSpeedUnit", signal: this.speedUnit, default: "kmh" },
    { key: "userPressureUnit", signal: this.pressureUnit, default: "hpa" },
    { key: "userPrecipitationUnit", signal: this.precipitationUnit, default: "mm" },
  ];

  constructor() {
    // On initialization, load the stored preferences or set to default if not previously stored.
    this.prefs.forEach((pref) => {
      const storedValue = this.localStorageService.getItem(pref.key);
      if (storedValue !== null) {
        pref.signal.set(storedValue as any);
      }
    });
  }

  /**
   * Updates the local storage with the new preference value.
   * @param key The key under which the preference is stored.
   * @param value The new value for the preference.
   */
  private updatePreference(key: string, value: any): void {
    this.localStorageService.setItem(key, value);
  }

  /**
   * Toggles the time format between 24-hour and 12-hour notation and updates the preference.
   */
  public toggleFormatTime(): void {
    this.formatTime.set(this.formatTime() === "h:mm a" ? "HH:mm a" : "h:mm a");
    this.updatePreference("userFormatTime", this.formatTime());
  }

  /**
   * Toggles the temperature unit between Celsius and Fahrenheit and updates the preference.
   */
  public toggleTemperature(): void {
    this.temperatureUnit.set(this.temperatureUnit() === "f" ? "c" : "f");
    this.updatePreference("userTemperatureUnit", this.temperatureUnit());
  }

  /**
   * Sets the speed unit to the provided value and updates the preference.
   * @param unit The new speed unit.
   */
  public setSpeedUnit(unit: TSpeed): void {
    this.speedUnit.set(unit);
    this.updatePreference("userSpeedUnit", unit);
  }

  /**
   * Sets the pressure unit to the provided value and updates the preference.
   * @param unit The new pressure unit.
   */
  public setPressureUnit(unit: TPressure): void {
    this.pressureUnit.set(unit);
    this.updatePreference("userPressureUnit", unit);
  }

  /**
   * Toggles the precipitation unit between millimeters and inches and updates the preference.
   */
  public togglePrecipitation(): void {
    this.precipitationUnit.set(this.precipitationUnit() === "in" ? "mm" : "in");
    this.updatePreference("userPrecipitationUnit", this.precipitationUnit());
  }
}
