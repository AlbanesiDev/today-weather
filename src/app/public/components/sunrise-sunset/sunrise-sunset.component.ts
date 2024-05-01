import { AsyncPipe, CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { IconPipe } from "../../shared/pipes/icon.pipe";
import { IconsService } from "../../../core/services/icons.service";
import { UnixTimestampPipe } from "../../shared/pipes/unix-timestamp.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { UnitsService } from "../../../core/services/units.service";
import { SkeletonModule } from "primeng/skeleton";
import { LoaderService } from "../../../core/services/loader.service";

@Component({
  selector: "app-sunrise-sunset",
  standalone: true,
  imports: [CommonModule, AsyncPipe, TranslateModule, SkeletonModule, UnixTimestampPipe, IconPipe],
  template: `
    <h2 class="ml-4">{{ "sunrise_sunset.title" | translate }}</h2>
    <div class="grid grid-nogutter justify-content-between border-1 border-primary border-round p-3 md:p-5">
      @if (loaderService.isLoading$ | async) {
        <div class="col-6">
          <p-skeleton styleClass="w-full h-full"/>
        </div>
        <div class="col-6">
          <p-skeleton styleClass="w-full h-full"/>
        </div>
      } @else {
        <div class="col-6">
          <div class="flex justify-content-center align-items-center h-full">
            <img class="w-5" [src]="'sunrise' | IconDynamic: iconsService.iconsFolder()" alt="" loading="lazy" />
            <span class="text-xl">{{ data().sunrise | UnixTimestamp | date: unitsService.formatTime() }}</span>
          </div>
        </div>
        <div class="col-6">
          <div class="flex justify-content-center align-items-center h-full">
            <img class="w-5" [src]="'sunset' | IconDynamic: iconsService.iconsFolder()" alt="" loading="lazy" />
            <span class="text-xl">{{ data().sunset | UnixTimestamp | date: unitsService.formatTime() }}</span>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SunriseSunsetComponent {
  public loaderService: LoaderService = inject(LoaderService);
  public iconsService: IconsService = inject(IconsService);
  public unitsService: UnitsService = inject(UnitsService);
  public data = input.required<any>();
}
