import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-units",
  standalone: true,
  imports: [CommonModule],
  template: `<p>units works!</p>`,
  styleUrl: "./units.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsComponent {}
