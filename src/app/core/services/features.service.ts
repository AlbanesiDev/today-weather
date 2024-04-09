import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FeaturesService {
  public featureList = signal<Array<{id: number, title: string}>>([
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
}
