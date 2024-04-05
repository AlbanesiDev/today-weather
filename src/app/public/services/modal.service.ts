import { Injectable, inject } from "@angular/core";
import { SidebarService } from "./sidebar.service";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private sidebarService = inject(SidebarService);
  public openModal: boolean = false;

  openLogin(){
    this.sidebarService.sidebarVisible = false
    this.openModal = true;
  }
}
