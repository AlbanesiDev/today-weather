import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { UnitsService } from "../../../../../core/services/units.service";
import { IUnitsConfig } from "../../../../../core/interface/units.inteface";
/**
 * A component that renders buttons to toggle different unit formats.
 * It uses the UnitsService to change and retrieve the current format for time, temperature, speed, pressure and precipitation.
 */
@Component({
  selector: "app-units",
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
  template: `
    <div class="flex flex-column gap-4 pb-3">
      @for (section of unitsConfig; track $index) {
        <div class="mb-3">
          <h3 class="mt-0">{{ "units_settings." + section.name | translate }}</h3>
          <div class="flex flex-column gap-3">
            @for (item of section.buttons; track $index) {
              <p-button
                appButtonActive
                label="{{ 'units_settings.' + item.label | translate }}"
                [outlined]="true"
                [style]="{ width: '100%' }"
                [class.active]="item.state === item.stateCurrent()"
                (click)="item.action()"
              />
            }
          </div>
        </div>
      }
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
export class UnitsComponent {
  /**
   *  Inject the UnitService to manage unit formats.
   */
  public unitsService: UnitsService = inject(UnitsService);

  // Configuration for unit sections and their respective buttons.
  public unitsConfig: IUnitsConfig[] = [
    {
      name: "format_time_title",
      buttons: [
        {
          label: "format_time_24",
          state: "HH:mm a",
          stateCurrent: () => this.unitsService.formatTime(),
          action: () => this.unitsService.toggleFormatTime(),
        },
        {
          label: "format_time_12",
          state: "h:mm a",
          stateCurrent: () => this.unitsService.formatTime(),
          action: () => this.unitsService.toggleFormatTime(),
        },
      ],
    },
    {
      name: "format_temperature_title",
      buttons: [
        {
          label: "units_temperature_c",
          state: "c",
          stateCurrent: () => this.unitsService.temperatureUnit(),
          action: () => this.unitsService.toggleTemperature(),
        },
        {
          label: "units_temperature_f",
          state: "f",
          stateCurrent: () => this.unitsService.temperatureUnit(),
          action: () => this.unitsService.toggleTemperature(),
        },
      ],
    },
    {
      name: "format_speed_title",
      buttons: [
        {
          label: "units_speed_kmh",
          state: "kmh",
          stateCurrent: () => this.unitsService.speedUnit(),
          action: () => this.unitsService.setSpeedUnit("kmh"),
        },
        {
          label: "units_speed_mph",
          state: "mph",
          stateCurrent: () => this.unitsService.speedUnit(),
          action: () => this.unitsService.setSpeedUnit("mph"),
        },
        {
          label: "units_speed_ms",
          state: "ms",
          stateCurrent: () => this.unitsService.speedUnit(),
          action: () => this.unitsService.setSpeedUnit("ms"),
        },
        {
          label: "units_speed_beaufort",
          state: "beaufort",
          stateCurrent: () => this.unitsService.speedUnit(),
          action: () => this.unitsService.setSpeedUnit("beaufort"),
        },
        {
          label: "units_speed_knots",
          state: "knots",
          stateCurrent: () => this.unitsService.speedUnit(),
          action: () => this.unitsService.setSpeedUnit("knots"),
        },
      ],
    },
    {
      name: "format_pressure_title",
      buttons: [
        {
          label: "units_pressure_hpa",
          state: "hpa",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("hpa"),
        },
        {
          label: "units_pressure_kpa",
          state: "kpa",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("kpa"),
        },
        {
          label: "units_pressure_mbar",
          state: "mbar",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("mbar"),
        },
        {
          label: "units_pressure_inhg",
          state: "inhg",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("inhg"),
        },
        {
          label: "units_pressure_psi",
          state: "psi",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("psi"),
        },
        {
          label: "units_pressure_bar",
          state: "bar",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("bar"),
        },
        {
          label: "units_pressure_mmhg",
          state: "mmhg",
          stateCurrent: () => this.unitsService.pressureUnit(),
          action: () => this.unitsService.setPressureUnit("mmhg"),
        },
      ],
    },
    {
      name: "format_visibility_title",
      buttons: [
        {
          label: "units_visibility_km",
          state: "km",
          stateCurrent: () => this.unitsService.visibilityUnit(),
          action: () => this.unitsService.toggleVisibility(),
        },
        {
          label: "units_visibility_mi",
          state: "mi",
          stateCurrent: () => this.unitsService.visibilityUnit(),
          action: () => this.unitsService.toggleVisibility(),
        },
      ],
    },
    {
      name: "format_precipitation_title",
      buttons: [
        {
          label: "units_precipitation_mm",
          state: "mm",
          stateCurrent: () => this.unitsService.precipitationUnit(),
          action: () => this.unitsService.togglePrecipitation(),
        },
        {
          label: "units_precipitation_in",
          state: "in",
          stateCurrent: () => this.unitsService.precipitationUnit(),
          action: () => this.unitsService.togglePrecipitation(),
        },
      ],
    },
  ];
}
