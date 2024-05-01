import { Injectable, inject, signal } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class FeaturesService {
  /**
   * Injects the LocalStorageService dependency.
   */
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  /**
   * Key for storing user features preferences in local storage.
   */
  private featuresListKeyStorage: string = environment.LOCAL_STORAGE.userFeaturesKey[0].list;
  private featuresActiveKeyStorage: string = environment.LOCAL_STORAGE.userFeaturesKey[0].active;

  public featureListActive = [
    {
      current: true,
      forecastHourly: true,
      currentDetail: true,
      forecastDaily: true,
      sunriseSunset: true,
      moonPhase: true,
      aqi: true,
    },
  ];

  public featureListOrder = signal<Array<{ id: number; title: string }>>([
    {
      id: 0,
      title: "current",
    },
    {
      id: 1,
      title: "forecast_hourly",
    },
    {
      id: 2,
      title: "current_details",
    },
    {
      id: 3,
      title: "forecast_daily",
    },
    {
      id: 5,
      title: "sunrise_sunset",
    },
    {
      id: 6,
      title: "moon_phase",
    },
    {
      id: 4,
      title: "aqi",
    },
  ]);

  constructor() {
    const featuresListStores = this.localStorageService.getItem(this.featuresListKeyStorage);
    const featuresActiveStores = this.localStorageService.getItem(this.featuresActiveKeyStorage);
    if (featuresListStores) {
      this.featureListOrder.set(featuresListStores);
    }
    if (featuresActiveStores) {
      this.featureListActive = featuresActiveStores;
    }
  }

  public setLocalStorage(current: "list" | "active"): void {
    if (current == "list") {
      this.localStorageService.setItem(this.featuresListKeyStorage, this.featureListOrder());
    } else {
      this.localStorageService.setItem(this.featuresActiveKeyStorage, this.featureListActive);
    }
  }
}
