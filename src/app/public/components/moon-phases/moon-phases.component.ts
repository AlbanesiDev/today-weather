import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, HostListener, inject, input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TooltipModule } from "primeng/tooltip";
import { IconPipe } from "../../shared/pipes/icon.pipe";
import { IconsService } from "../../../core/services/icons.service";
import { LoaderService } from "../../../core/services/loader.service";
import { UnitsService } from "../../../core/services/units.service";
import { UnixTimestampPipe } from "../../shared/pipes/unix-timestamp.pipe";

@Component({
  selector: "app-moon-phases",
  standalone: true,
  imports: [CommonModule, TranslateModule, TooltipModule, IconPipe, UnixTimestampPipe],
  template: `
    <h2 class="ml-4">{{ "moon_phase.title" | translate }}</h2>
    <swiper-container navigation="true" space-between="16" [slidesPerView]="slidesPerView">
      @for (item of data().daily; track $index) {
        <swiper-slide
          class=" flex flex-column justify-content-between border-1 border-primary border-round min-h-full py-2 px-1 xl:py-5 xl:px-3"
          style="background-color: transparent"
        >
          <div class="flex flex-column justify-content-between align-items-center gap-3 h-full">
            <p class="text-center">{{ item.dt | UnixTimestamp | date: "EEEE, MMMM dd" }}</p>
            <img [src]="moonIcon(item.moon_phase) | IconDynamic: iconsService.iconsFolder()" alt="" />
            <p class="text-center">{{ "moon_phase." + moonIcon(item.moon_phase) | translate }}</p>
            <span [pTooltip]="'moon_phase.moonrise' | translate"
              >{{ item.moonrise | UnixTimestamp | date: unitsService.formatTime() }}
              <i class="pi pi-angle-double-up"></i>
            </span>
            <span [pTooltip]="'moon_phase.moonset' | translate"
              >{{ item.moonset | UnixTimestamp | date: unitsService.formatTime() }}
              <i class="pi pi-angle-double-down"></i>
            </span>
          </div>
        </swiper-slide>
      }
    </swiper-container>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoonPhasesComponent {
  public loaderService: LoaderService = inject(LoaderService);
  public iconsService: IconsService = inject(IconsService);
  public unitsService: UnitsService = inject(UnitsService);

  public data = input.required<any>();

  public moonIcon(phase: number): string {
    let icon = "";
    if (phase === 0 || phase === 1) {
      icon = "moon-new";
    } else if (phase > 0 && phase < 0.25) {
      icon = "moon-waxing-crescent";
    } else if (phase === 0.25) {
      icon = "moon-first-quarter";
    } else if (phase > 0.25 && phase < 0.5) {
      icon = "moon-waxing-gibbous";
    } else if (phase === 0.5) {
      icon = "moon-full";
    } else if (phase > 0.5 && phase < 0.75) {
      icon = "moon-waning-gibbous";
    } else if (phase === 0.75) {
      icon = "moon-last-quarter";
    } else if (phase > 0.75 && phase < 1) {
      icon = "moon-waning-crescent";
    }
    return icon;
  }

  /**
   * The number of slides to show in the view, adjusted based on screen width.
   */
  public slidesPerView: number = 5;

  /**
   * The current width of the screen, used to adjust `slidesPerView`.
   */
  private screenWidth!: number;
  @HostListener("window:resize")
  getScreenWidth(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 320 && this.screenWidth <= 620) {
      this.slidesPerView = 3;
    } else if (this.screenWidth >= 620 && this.screenWidth <= 998) {
      this.slidesPerView = 4;
    } else {
      this.slidesPerView = 5;
    }
  }
}
