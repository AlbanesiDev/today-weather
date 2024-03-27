import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>notifications works!</p>`,
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent { }
