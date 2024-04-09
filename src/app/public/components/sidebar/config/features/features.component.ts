import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { DragDropModule } from "primeng/dragdrop";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { PickListModule } from "primeng/picklist";
import { FeaturesService } from "../../../../../core/services/features.service";

/**
 * The FeaturesComponent is responsible for displaying and managing the order of features.
 */
@Component({
  selector: "app-features",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MultiSelectModule,
    OrderListModule,
    DragDropModule,
    PickListModule,
  ],
  template: `
    <div class="flex flex-column gap-5">
      <p-orderList
        controlsPosition="right"
        [header]="'orden' | translate"
        [value]="featuresService.featureList()"
        [dragdrop]="true"
        [metaKeySelection]="false"
      >
        <ng-template let-item pTemplate="item">
          <span>{{ item.title }}</span>
        </ng-template>
      </p-orderList>
    </div>
  `,
  styles: `
    p-orderList .p-orderlist-controls {
      display: none !important;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
  featuresService: FeaturesService = inject(FeaturesService);
}
