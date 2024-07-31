import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

import { register } from "swiper/element/bundle";
import {
  CloudStoreService,
  WeatherService,
  LoaderService,
  AuthService,
  SetConfigService,
  IconsService,
  NotificationsService,
} from "./core/services";
import { LayoutComponent } from "./layout/layout/layout.component";
import { LangService } from "./core/lang/lang.service";
import { ThemesService } from "./core/themes/themes.service";
import { SwPush } from "@angular/service-worker";
import { Store } from "@ngrx/store";
import * as WeatherActions from "./core/state/weather.actions";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

register();

/**
 * @author Joaquin Albanesi
 * @license MIT
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule, LayoutComponent],
  template: `
    <app-layout>
      <p-toast />
      <router-outlet />
    </app-layout>
  `,
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  private notificationsService = inject(NotificationsService);
  private cloudStoreService = inject(CloudStoreService);
  private messageService = inject(MessageService);
  private weatherService = inject(WeatherService);
  private loaderService = inject(LoaderService);
  private themesService = inject(ThemesService);
  private iconsService = inject(IconsService);
  private langService = inject(LangService);
  private authService = inject(AuthService);
  private setConfigService = inject(SetConfigService);
  private swPush = inject(SwPush);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  public errorMessage: undefined;

  constructor() {
    this.store.dispatch(WeatherActions.getCurrentLocation());
  }

  ngOnInit(): void {
    const user = this.authService.user$;
    if (user) {
      user.subscribe((data) => {
        if (data) {
          this.cloudStoreService.getUser(data.uid).subscribe((res) => {
            this.authService.userDataSig.set(res);
            // this.setConfigService.setConfig(res)
          });
        }
      });
      this.authService.userAuth.set(true);
    } else {
      this.authService.userAuth.set(false);
    }

    this.swPush.messages.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message) => {
      console.log(message);
    });
  }
}
