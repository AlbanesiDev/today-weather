import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { ToggleButtonModule } from "primeng/togglebutton";
import { ButtonModule } from "primeng/button";

import { IconsService } from "../../../../../core/services/icons.service";
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
              [class.active]="item.label === IconsService.iconsType()"
              [style]="{ width: '100%' }"
              (click)="setTypeIcon(item.label)"
            >
            @if(item.icon === 'bi-cloud-rain-fill'){
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain-fill" viewBox="0 0 16 16">
              <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973"/>
            </svg>
            }@else{
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain" viewBox="0 0 16 16">
              <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>
            </svg>
            }
            </p-button>
          }
        </div>
      </div>
      <div class="mt-6">
        <h3>{{ "icon_settings.title_animations" | translate }}</h3>
        <p-button
          label="{{ 'icon_settings.label_animations_' + IconsService.iconsAnimations() | translate }}"
          [outlined]="true"
          [class.active]="IconsService.iconsAnimations() === 'on'"
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
   * Inject the IconsService.
   */
  public IconsService: IconsService = inject(IconsService);
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
    if (this.IconsService.iconsAnimations() === 'on') {
      this.IconsService.iconsType.set(type);
    } else {
      this.IconsService.iconsType.set(type);
    }
    this.IconsService.getTypeIcons();
  }

  /**
   * Toggles weather icons animations (on/off).
   */
  public toggleAnimationsClick(): void {
    this.IconsService.iconsAnimations.set(this.IconsService.iconsAnimations() === "off" ? "on" : "off");
    this.IconsService.getTypeIcons();
  }
}
