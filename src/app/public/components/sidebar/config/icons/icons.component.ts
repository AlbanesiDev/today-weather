import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-icons",
  standalone: true,
  imports: [CommonModule],
  template: `<p>icons works!</p>`,
  styleUrl: "./icons.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {}
