import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { SidebarService } from "../../../services/sidebar.service";

@Component({
  selector: "sidebar-header",
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
  template: ` <div class="flex gap-2 align-items-center">
    @if (sidebarService.currentRouteSig() !== "home") {
      <p-button icon="pi pi-chevron-left" severity="secondary" size="small" [text]="true" (click)="goBackBtnClick()" />
    }
    <h3>{{ "sidebar.header_" + this.sidebarService.currentRouteSig() | translate }}</h3>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHeaderComponent {
  public sidebarService: SidebarService = inject(SidebarService);

  public goBackBtnClick() {
    const route = this.sidebarService.currentRouteSig();
    if (route === "config") {
      this.sidebarService.currentRouteSig.set("home");
    } else {
      this.sidebarService.currentRouteSig.set("config");
    }
  }
}
