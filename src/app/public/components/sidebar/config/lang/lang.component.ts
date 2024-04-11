import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "primeng/button";
import { LangService } from "../../../../../core/lang/lang.service";

/**
 * A component to handle language settings and selection.
 * Utilizes `LangService` for language management and `TranslateModule` for localization.
 */
@Component({
  selector: "app-lang",
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
  template: `
    <div class="flex flex-column gap-3">
      @for (item of langList; track $index) {
        <p-button
          label="{{ 'lang_settings.' + item.lang | translate }}"
          styleClass="w-full"
          [outlined]="true"
          [class.active]="item.lang_iso === langService.currentLangSig()"
          (click)="setLangClick(item.lang_iso)"
        >
          <img alt="dropdown icon" width="25" [src]="'https://flagcdn.com/' + item.flag_iso + '.svg'" />
        </p-button>
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
    img {
      filter: drop-shadow(0 0 0.15rem rgba(0, 0, 0, 0.25));
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangComponent {
  /**
   * Injects the `LangService` to manage language settings.
   */
  public langService: LangService = inject(LangService);
  /**
   * An array of language options for the user to select from.
   */
  public langList: Array<{ lang: string; lang_iso: string; flag_iso: string }> = [
    {
      lang: "Spanish",
      lang_iso: "es",
      flag_iso: "es",
    },
    {
      lang: "English",
      lang_iso: "en",
      flag_iso: "gb",
    },
    {
      lang: "French",
      lang_iso: "fr",
      flag_iso: "fr",
    },
    {
      lang: "German",
      lang_iso: "de",
      flag_iso: "de",
    },
    {
      lang: "Italian",
      lang_iso: "it",
      flag_iso: "it",
    },
    {
      lang: "Japanese",
      lang_iso: "ja",
      flag_iso: "jp",
    },
    {
      lang: "Korean",
      lang_iso: "ko",
      flag_iso: "kr",
    },
    {
      lang: "Portuguese",
      lang_iso: "pt",
      flag_iso: "pt",
    },
    {
      lang: "Russian",
      lang_iso: "ru",
      flag_iso: "ru",
    },
    {
      lang: "Ukrainian",
      lang_iso: "uk",
      flag_iso: "ua",
    },
    {
      lang: "Chinese",
      lang_iso: "zh",
      flag_iso: "cn",
    },
  ];

  /**
   * Handles the click event to set the application language.
   * @param lang The ISO code of the selected language.
   */
  public setLangClick(lang: string): void {
    this.langService.setLang(lang);
  }
}
