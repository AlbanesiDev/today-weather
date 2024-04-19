import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Auth } from "@angular/fire/auth";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { MessageService } from "primeng/api";
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
      @if (authService.userAuth()) {
        <p-button
          label="{{ 'sidebar.sign_out' | translate }}"
          severity="danger"
          styleClass="w-full"
          [outlined]="true"
          (onClick)="signOut()"
        />
      } @else {
        <p-button
          label="{{ 'sidebar.login' | translate }}"
          styleClass="w-full"
          [outlined]="true"
          (onClick)="openLogin()"
        />
      }
      <p-button
        label="{{ 'sidebar.config' | translate }}"
        severity="secondary"
        styleClass="w-full"
        [outlined]="true"
        (onClick)="sidebarService.currentRouteSig.set('config')"
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
export class SidebarFooterComponent implements OnInit {
  private translateService: TranslateService = inject(TranslateService);
  private messageService: MessageService = inject(MessageService);
  private modalService: ModalService = inject(ModalService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private auth: Auth = inject(Auth);
  public sidebarService: SidebarService = inject(SidebarService);
  public authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.authService.userAuth.set(true);
    } else {
      this.authService.userAuth.set(false);
    }
  }

  public openLogin() {
    this.sidebarService.sidebarVisible = false;
    this.modalService.loginModal = true;
    this.cdr.detectChanges()
  }

  public signOut() {
    this.authService
      .signOut()
      .then(() => {
        const translatedMessageDetail = this.translateService.instant("sign_out.message");
        this.authService.userAuth.set(false);
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: translatedMessageDetail,
        });
      })
      .catch((err) => {
        const translatedErrorSummary = this.translateService.instant("firebase_auth.summary");
        const translatedErrorDetail = this.translateService.instant("firebase_auth." + err.code);
        this.messageService.add({
          severity: "error",
          summary: translatedErrorSummary,
          detail: translatedErrorDetail,
          life: 8000,
        });
      });
  }
}
