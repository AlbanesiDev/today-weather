import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { ToggleButtonModule } from "primeng/togglebutton";
import { ButtonModule } from "primeng/button";

import { WeatherIconsService } from "./../../../../../core/services/weather-icons.service";
import { TWeatherIconsType } from "../../../../../core/interface/icon.interface";

/**
 * IconsComponent is used to change the style of the icons.
 */
@Component({
  selector: "app-icons",
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ButtonModule, ToggleButtonModule],
  template: `
    <div>
      <div>
        <h3>{{ "icon_settings.title_icons" | translate }}</h3>
        <div class="flex flex-column gap-3">
          @for (item of iconList; track $index) {
            <p-button
              label="{{ 'icon_settings.label_' + item.label | translate }}"
              [outlined]="true"
              [class.active]="item.label === weatherIconsService.iconsType()"
              [style]="{ width: '100%' }"
              (click)="setTypeIcon(item.label)"
            >
              <i class="text-lg bi" [class]="item.icon"></i>
            </p-button>
          }
        </div>
      </div>
      <div class="mt-6">
        <h3>{{ "icon_settings.title_animations" | translate }}</h3>
        <p-button
          label="{{ 'icon_settings.label_animations_' + weatherIconsService.iconsAnimations() | translate }}"
          [outlined]="true"
          [class.active]="weatherIconsService.iconsAnimations() === 'on'"
          [style]="{ width: '100%' }"
          (click)="toggleAnimationsClick()"
        />
      </div>
    </div>
  `,
  styles: `
    .active {
      ::ng-deep {
        .p-button {
          background-color: var(--primary-color);
          color: var(--primary-color-text);
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  /**
   * Inject the WeatherIconsService.
   */
  public weatherIconsService: WeatherIconsService = inject(WeatherIconsService);
  /**
   * List of weather icons with labels and corresponding icon names.
   */
  public iconList: Array<{ label: TWeatherIconsType; icon: string }> = [
    {
      label: "fill",
      icon: "bi-cloud-rain-fill",
    },
    {
      label: "outline",
      icon: "bi-cloud-rain",
    },
  ];

  /**
   * Sets the weather icon type (fill or outline).
   * @param type The type of weather icons.
   */
  public setTypeIcon(type: TWeatherIconsType): void {
    if (this.weatherIconsService.iconsAnimations() === 'on') {
      this.weatherIconsService.iconsType.set(type);
    } else {
      this.weatherIconsService.iconsType.set(type);
    }
    this.weatherIconsService.getTypeIcons();
  }

  /**
   * Toggles weather icons animations (on/off).
   */
  public toggleAnimationsClick(): void {
    this.weatherIconsService.iconsAnimations.set(this.weatherIconsService.iconsAnimations() === "off" ? "on" : "off");
    this.weatherIconsService.getTypeIcons();
  }
}
