import { Injectable, inject, signal } from "@angular/core";
import { SidebarService } from "./sidebar.service";
@Injectable({
  providedIn: "root",
})
export class ModalService {
  private sidebarService = inject(SidebarService);
  public loginModal: boolean = false;

  public openLogin(): void {
    this.sidebarService.sidebarVisible = false;
    this.loginModal = true;
  }

  public closeLogin(): void {
    this.loginModal = false;
  }
}
