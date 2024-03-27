import { ThemesService } from "./themes.service";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SelectButtonModule } from "primeng/selectbutton";
import { IThemeStateOptions, IThemeList } from "../interface/themes.interface";
import { ButtonModule } from "primeng/button";
import { TranslateModule } from "@ngx-translate/core";

/**
 * A component that allows users to switch between different themes and modes for the application.
 */
@Component({
  selector: "app-themes",
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule, ButtonModule, TranslateModule],
  template: `
    <div class="flex flex-column gap-5">
      <div>
        <h2>{{ "theme_settings.mode" | translate }}</h2>
        <p-selectButton
          optionLabel="label"
          optionValue="value"
          [options]="stateOptions"
          [(ngModel)]="themeMode"
          (click)="setModeClick()"
        >
          <ng-template let-item pTemplate>
            <i [class]="item.icon"></i>
          </ng-template>
        </p-selectButton>
      </div>
      <div>
        <h2>{{ "theme_settings.theme" | translate }}</h2>
        <div class="flex flex-wrap gap-3">
          @for (item of themeList; track $index) {
          <button
            [ngStyle]="{ border: item.theme == themeMode ? '2px solid ' + item.hex : '' }"
            (click)="setThemeClick(item.theme)"
          >
            <span [ngStyle]="{ 'background-color': item.hex }"></span>
          </button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: "./themes.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemesComponent {
  // Dependency injection
  private themesService: ThemesService = inject(ThemesService);

  // The current theme mode (dark or light).
  public themeMode: string = this.themesService.activeModeSig();

  // Options for the theme mode selection button.
  public stateOptions: IThemeStateOptions[] = [
    { icon: "pi pi-sun", value: "light" },
    { icon: "pi pi-moon", value: "dark" },
  ];

  // List of available themes with their corresponding color codes.
  public themeList: IThemeList[] = [
    {
      theme: "amber",
      hex: "#f59e0b",
    },
    {
      theme: "blue",
      hex: "#3b82f6",
    },
    {
      theme: "cyan",
      hex: "#06b6d4",
    },
    {
      theme: "green",
      hex: "#10b981",
    },
    {
      theme: "indigo",
      hex: "#6366f1",
    },
    {
      theme: "pink",
      hex: "#ec4899",
    },
    {
      theme: "purple",
      hex: "#8b5cf6",
    },
    {
      theme: "teal",
      hex: "#14b8a6",
    },
  ];

  /**
   * Handles the click event to set the application's mode.
   */
  public setModeClick() {
    const themeActive = this.themesService.activeThemeSig();
    if (this.themeMode) {
      const theme = "lara-" + this.themeMode + "-" + themeActive;
      this.themesService.setTheme(theme);
    } else {
      this.themeMode = this.themesService.activeModeSig();
    }
  }

  /**
   * Handles the click event to set the application's theme.
   * @param themeSelect The selected theme.
   */
  public setThemeClick(themeSelect: string): void {
    const theme = "lara-" + this.themeMode + "-" + themeSelect;
    this.themesService.setTheme(theme);
  }
}
