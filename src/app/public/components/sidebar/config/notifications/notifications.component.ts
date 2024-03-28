import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SelectButtonModule } from "primeng/selectbutton";

@Component({
  selector: "app-notifications",
  standalone: true,
  imports: [CommonModule, SelectButtonModule],
  template: `<p>notifications works!</p>`,
  styleUrl: "./notifications.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {}
