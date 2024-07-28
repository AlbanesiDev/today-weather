import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { UnitsService } from "../../core/services";
import { SidebarService } from "../../shared/services";

/**
 * HeaderComponent is a standalone Angular component that displays
 * a header with a clock and a button to toggle the sidebar.
 */
@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <header class="flex justify-content-between align-items-center py-3">
      <p-button size="large" [text]="true">
        {{ timeSig() | date: unitsService.formatTime() }}
      </p-button>
      <p-button icon="pi pi-bars" size="large" [text]="true" (click)="toggleSidebarClick()" />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public unitsService: UnitsService = inject(UnitsService);
  private sidebarService: SidebarService = inject(SidebarService);

  public timeSig = signal(new Date());

  constructor() {
    // Updates the timeSig signal every second
    setInterval(() => this.timeSig.set(new Date()), 1000);
  }
  public toggleSidebarClick(): void {
    this.sidebarService.sidebarVisible = true;
  }
}
