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
      aqi: true,
    },
  ];

  public featureListOrder = signal<Array<{ id: number; title: string }>>([
    {
      id: 0,
      title: "Current",
    },
    {
      id: 1,
      title: "Forecast Hourly",
    },
    {
      id: 2,
      title: "Current Details",
    },
    {
      id: 3,
      title: "Forecast Daily",
    },
    {
      id: 4,
      title: "Aqi",
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
