import { Injectable, signal } from "@angular/core";
/**
 * A service that manages the visibility and current route of the sidebar.
 */
@Injectable({
  providedIn: "root",
})
export class SidebarService {
    /**
   * A boolean variable to control the visibility of the sidebar.
   */
  public sidebarVisible: boolean = false;
  /**
   * A signal that contains the current route or component being displayed in the sidebar.
   */
  public currentRouteSig = signal<string>('home');
}
