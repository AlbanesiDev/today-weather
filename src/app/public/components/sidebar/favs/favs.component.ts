import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-favs",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div
      class="relative flex flex-column w-full h-10rem surface-ground border-1 border-200 hover:border-primary border-round-sm mt-3"
    >
      <img class="absolute w-full" src="https://www.gotokyo.org/es/plan/tokyo-outline/images/main.jpg" alt="" />
      <div
        class="absolute w-full h-full"
        [style]="{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.65))' }"
      ></div>
      <p-button
        class="absolute top-0 right-0 m-2"
        [style]="{ width: '1.5rem', height: '1.5rem' }"
        icon="pi pi-times"
        severity="danger"
      />
      <div class="absolute z-1">
        <h4 class="text-5xl">20 C</h4>
        <p>Tokyo</p>
      </div>
    </div>
  `,
  styleUrl: "./favs.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavsComponent {}
