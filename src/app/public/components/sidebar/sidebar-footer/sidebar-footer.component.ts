import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { ButtonModule } from "primeng/button";

import { ModalService } from "../../../services/modal.service";
import { SidebarService } from "./../../../services/sidebar.service";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: "sidebar-footer",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ButtonModule],
  template: `
    <div class="flex flex-column gap-3">
      @if (userAuth) {
        <p-button
          label="{{ 'sidebar.sign_out' | translate }}"
          severity="danger"
          styleClass="w-full"
          [outlined]="true"
          (clikc)="authService.signOut()"
        />
      } @else {
        <p-button
          label="{{ 'sidebar.login' | translate }}"
          styleClass="w-full"
          [outlined]="true"
          (click)="openLogin()"
        />
      }
      <p-button
        label="{{ 'sidebar.config' | translate }}"
        severity="secondary"
        styleClass="w-full"
        [outlined]="true"
        (click)="sidebarService.currentRouteSig.set('config')"
      />
      <p-button
        routerLink="/help"
        label="{{ 'sidebar.help' | translate }}"
        severity="secondary"
        styleClass="w-full"
        [outlined]="true"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFooterComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);

  public userAuth: boolean = false;

  openLogin() {
    this.sidebarService.sidebarVisible = false;
    this.modalService.openModal = true;
  }
}
