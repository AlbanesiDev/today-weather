import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

import { NotificationsService } from "./core/services/notifications.service";
import { ThemesService } from "./core/themes/themes.service";
import { IconsService } from "./core/services/icons.service";
import { LangService } from "./core/lang/lang.service";

import { register } from "swiper/element/bundle";
import { Subject, takeUntil, tap } from "rxjs";
import { AuthService } from "./core/services/auth.service";
import { CloudStoreService } from "./core/services/cloud-store.service";
register();

/**
 * @description
 * @author Joaquin Albanesi
 * @license
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  template: `<p-toast /><router-outlet /> `,
  providers: [MessageService],
})
export class AppComponent {
  private notificationsService: NotificationsService = inject(NotificationsService);
  private themesService: ThemesService = inject(ThemesService);
  private iconsService: IconsService = inject(IconsService);
  private langService: LangService = inject(LangService);
  private authService: AuthService = inject(AuthService);
  private cloudStoreService: CloudStoreService = inject(CloudStoreService);
  private messageService: MessageService = inject(MessageService);
}
