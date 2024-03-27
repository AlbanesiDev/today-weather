import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from './../../services/sidebar.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ThemesComponent } from '../../../core/themes/themes.component';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './config/notifications/notifications.component';
import { UnitsComponent } from './config/units/units.component';
import { IconsComponent } from './config/icons/icons.component';
import { LangComponent } from './config/lang/lang.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FavsComponent } from './favs/favs.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    SidebarModule,
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
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidebarComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);

  public currentMenu = 'home';

  public showMenu: boolean = true;
  public configMenu: boolean = true;
  public btnConfig: any[] = [
    {
      icon: 'pi pi-bell',
      label: 'Notificaciones',
      config: 'notifications',
      disabled: 'true',
    },
    {
      icon: 'pi pi-compass',
      label: 'Unidades',
      config: 'units',
      disabled: 'true',
    },
    {
      icon: 'pi pi-moon',
      config: 'themes',
      label: 'Tema',
    },
    {
      icon: 'pi pi-images',
      label: 'Paquete de iconos',
      config: 'icons',
      disabled: 'true',
    },
    {
      icon: 'pi pi-language',
      label: 'Idioma',
      config: 'lang',
    },
  ];

  public sidebarCurrentRoute = 'sidebar';

  public dynamicConfig: string = '';

  public showConfigClick() {
    this.showMenu = !this.showMenu;
  }

  public showMenuConfigClick(config: string) {
    this.dynamicConfig = config;
    this.currentMenu = config;
    this.configMenu = !this.configMenu;
  }

  public showModalClick() {
    this.modalService.openModal = true;
  }

  public signOut(){
    this.authService.signOut();
  }
}
