import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { LangService } from "../../../../../core/lang/lang.service";
import { TranslateModule } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-lang",
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule],
  template: `
    <div class="flex flex-column gap-3">
      @for (item of langList; track $index) {
        <p-button
          label="{{ 'lang_settings.' + item.lang | translate }}"
          styleClass="w-full"
          [outlined]="true"
          (click)="setLangClick(item.lang_iso)"
        >
          <img alt="dropdown icon" width="25" [src]="'https://flagcdn.com/' + item.flag_iso + '.svg'" />
        </p-button>
      }
    </div>
  `,
  styleUrl: "./lang.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangComponent {
  private langService: LangService = inject(LangService);
  public langList: any[] = [
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
      lang: "France",
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

  public setLangClick(lang: string): void {
    this.langService.setLang(lang);
  }
}
