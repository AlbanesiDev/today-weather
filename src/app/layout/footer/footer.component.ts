import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <footer class="flex justify-content-center align-items-center my-7 h-3rem">
      <div class="text-xl font-medium">
        {{ "footer.copyright" | translate }} 2024 |
        <a class="p-0 text-primary no-underline hover:underline" [href]="gitHubLink" target="_blank">AlbanesiDev</a>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public readonly gitHubLink = "https://github.com/AlbanesiDev";
}
