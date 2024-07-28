import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent, AuthComponent } from "../../features";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, SidebarComponent, AuthComponent],
  template: `
    <div class="container">
      <app-sidebar />
      <app-auth />
      <app-header />
      <ng-content></ng-content>
      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
