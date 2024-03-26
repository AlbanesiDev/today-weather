import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../services/sidebar.service';

/**
 * HeaderComponent is a standalone Angular component that displays
 * a header with a clock and a button to toggle the sidebar.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <header class="flex justify-content-between align-items-center py-3">
      <p-button size="large" [text]="true">
        {{ timeSig() | date : 'HH:mm a' }}
      </p-button>
      <p-button
        icon="pi pi-bars"
        size="large"
        [text]="true"
        (click)="toggleSidebarClick()"
      />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // Dependency injection
  private sidebarService: SidebarService = inject(SidebarService);
  // Signal for the current time
  public timeSig = signal(new Date());

  constructor() {
    // Updates the timeSig signal every second
    setInterval(() => this.timeSig.set(new Date()), 1000);
  }

  /**
   * Toggles the visibility of the sidebar when the sidebar button is clicked.
   */
  public toggleSidebarClick(): void {
    this.sidebarService.sidebarVisible = true;
  }
}
