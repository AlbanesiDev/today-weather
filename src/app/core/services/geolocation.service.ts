import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { IGeolocation } from "../interface/geolocation.interface";

/**
 * Service for retrieving geolocation data.
 */
@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  private http: HttpClient = inject(HttpClient);
  private readonly geolocation_mock: string = environment.MOCK.GEOLOCATION;
  private readonly geolocation_endpoint: string = environment.ENDPOINT.GEOLOCATION;
  private readonly isProduction: boolean = environment.IS_PRODUCTION;

  /**
   * Retrieves geolocation data from the appropriate endpoint.
   * @returns An Observable of type IGeolocation containing the geolocation data.
   */
  public getGeolocation(): Observable<IGeolocation> {
    const url = this.isProduction ? this.geolocation_endpoint : this.geolocation_mock;
    return this.http.get<IGeolocation>(url);
  }
}
