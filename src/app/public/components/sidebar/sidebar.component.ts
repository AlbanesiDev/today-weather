import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { InputTextModule } from "primeng/inputtext";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";

import { NotificationsComponent } from "./config/notifications/notifications.component";
import { SidebarHeaderComponent } from "./sidebar-header/sidebar-header.component";
import { SidebarFooterComponent } from "./sidebar-footer/sidebar-footer.component";
import { ThemesComponent } from "../../../core/themes/themes.component";
import { SearchbarComponent } from "./searchbar/searchbar.component";
import { UnitsComponent } from "./config/units/units.component";
import { IconsComponent } from "./config/icons/icons.component";
import { LangComponent } from "./config/lang/lang.component";
import { FavsComponent } from "./favs/favs.component";

import { AuthService } from "../../../core/services/auth.service";
import { SidebarService } from "./../../services/sidebar.service";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    SidebarModule,
    SidebarHeaderComponent,
    SidebarFooterComponent,
    ButtonModule,
    InputTextModule,
    SearchbarComponent,
    FavsComponent,
    NotificationsComponent,
    UnitsComponent,
    ThemesComponent,
    IconsComponent,
    LangComponent,
  ],
  templateUrl: "./sidebar.component.html",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidebarComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);

  public btnConfig: any[] = [
    {
      icon: "pi pi-bell",
      label: "Notificaciones",
      config: "notification",
      disabled: "true",
    },
    {
      icon: "pi pi-compass",
      label: "Unidades",
      config: "units",
      disabled: "true",
    },
    {
      icon: "pi pi-moon",
      config: "themes",
      label: "Tema",
    },
    {
      icon: "pi pi-images",
      label: "Paquete de iconos",
      config: "icons",
      disabled: "true",
    },
    {
      icon: "pi pi-language",
      label: "Idioma",
      config: "lang",
    },
  ];

  public showModalClick() {
    this.modalService.openModal = true;
  }
}
