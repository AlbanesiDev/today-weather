import { LocalStorageService } from "./../services/local-storage.service";
import { Injectable, inject, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

/**
 * A service that manages language settings for the application.
 * It utilizes the LocalStorageService to persist user's language preference
 * and the TranslateService to apply the language across the app.
 */
@Injectable({
  providedIn: "root",
})
export class LangService {
  /**
   * Service responsible for managing the translation and localization.
   */
  private translateService: TranslateService = inject(TranslateService);

  /**
   * Service responsible for interacting with the browser's local storage.
   */
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  /**
   * The key used to store the language setting in local storage.
   */
  private langKeyStorage: string = "userLangStorage";

  /**
   * Signal storing the active language.
   */
  public currentLangSig = signal<string>("");

  /**
   * Initializes the default language for the application.
   * It checks the local storage for an existing language setting,
   * and uses it if available. Otherwise, it defaults to English ('en').
   */
  public initializeLang() {
    const langStorage = this.localStorageService.getItem(this.langKeyStorage);
    if (langStorage !== null) {
      this.translateService.setDefaultLang(langStorage);
      this.currentLangSig.set(langStorage);
    } else {
      this.translateService.setDefaultLang("en");
      this.currentLangSig.set("en");
    }
  }

  /**
   * Sets the application's language and stores the preference in local storage.
   * @param lang The language code to set as the current language.
   */
  public setLang(lang: string): void {
    const langStorage = this.localStorageService.getItem(this.langKeyStorage);
    if (lang !== langStorage) {
      this.translateService.use(lang);
      this.currentLangSig.set(lang);
      this.localStorageService.setItem(this.langKeyStorage, lang);
    }
  }
}
