import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Storage, getDownloadURL, ref } from "@angular/fire/storage";
import { listAll } from "@firebase/storage";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherIconsService {
  private http: HttpClient = inject(HttpClient);
  private storage: Storage = inject(Storage);

  public iconsIsLoading = signal<boolean>(true);
  public icons = signal<any[]>([]);
  images: string[] = [];

  public iconFolder = ["weather-fill", "weather-fill-static", "weather-outline", "weather-outline-static"];

  public getIcons(iconsFolder: string) {
    const iconsRef = ref(this.storage, iconsFolder);
    listAll(iconsRef)
      .then(async (response) => {
        console.log(response);
        for (let image of response.items) {
          const url = await getDownloadURL(image);
          this.images.push(url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
