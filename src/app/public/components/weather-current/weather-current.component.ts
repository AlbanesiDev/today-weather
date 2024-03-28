import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-weather-current",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./weather-current.component.html",
  styleUrl: "./weather-current.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCurrentComponent {}
