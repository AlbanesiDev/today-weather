import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { SidebarService } from "../../../services/sidebar.service";
import { SIDEBAR_DICTIONARY } from "../../../../core/utils/dictionaries/sidebar.dictionary";

@Component({
  selector: "sidebar-header",
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
  template: ` <div class="flex gap-2 align-items-center">
    @if (sidebarService.currentRouteSig() !== SIDEBAR_DICTIONARY.ROUTES.HOME) {
      <p-button icon="pi pi-chevron-left" severity="secondary" size="small" [text]="true" (click)="goBackBtnClick()" />
    }
    <h3>{{ "sidebar.header_" + this.sidebarService.currentRouteSig() | translate }}</h3>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarHeaderComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  public SIDEBAR_DICTIONARY = SIDEBAR_DICTIONARY;

  public goBackBtnClick() {
    const route = this.sidebarService.currentRouteSig();
    if (route === SIDEBAR_DICTIONARY.ROUTES.CONFIG) {
      this.sidebarService.currentRouteSig.set(SIDEBAR_DICTIONARY.ROUTES.HOME);
    } else {
      this.sidebarService.currentRouteSig.set(SIDEBAR_DICTIONARY.ROUTES.CONFIG);
    }
  }
}
