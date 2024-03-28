import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  public notificationActivateSig = signal<string>("off");
}
