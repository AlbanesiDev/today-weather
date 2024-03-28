import { Injectable, inject, signal } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";

/**
 * A service that manages the theme settings for the application.
 * It utilizes the LocalStorageService to persist user's theme preference.
 */
@Injectable({
  providedIn: "root",
})
export class ThemesService {
  // Dependency injection
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  // The key used to store the theme preference in local storage.
  private themeKey = "themeUser";
  // The currently active theme.
  public activeThemeSig = signal<string>("");
  // The currently active mode theme.
  public activeModeSig = signal<string>("");

  /**
   * Initializes the service by attempting to retrieve the theme from local storage.
   * If found, it compares with the current browser theme scheme.
   * If they match, it sets the theme; otherwise, it defaults to the browser's value.
   */
  constructor() {
    this.getThemeLocalStorage();
  }

  /**
   * Retrieves the theme setting from local storage and sets the theme.
   * If no theme is stored, it defaults to the browser's theme setting.
   */
  private getThemeLocalStorage(): void {
    const themeStorage = this.localStorageService.getItem(this.themeKey);
    if (themeStorage !== null) {
      this.setTheme(themeStorage);
    } else {
      this.getThemeBrowser();
    }
  }

  /**
   * Determines the browser's preferred color scheme and sets the theme accordingly.
   */
  private getThemeBrowser(): void {
    const darkModeMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkModeMatcher.matches) {
      this.setTheme("lara-dark-blue");
    } else {
      this.setTheme("lara-light-blue");
    }
  }

  /**
   * Sets the application's theme and updates the local storage with the new theme.
   * @param theme The theme to be set.
   */
  public setTheme(theme: string): void {
    let themeLink = document.getElementById("app-themes") as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + ".css";
    }
    this.setActiveTheme(theme);
    this.localStorageService.setItem(this.themeKey, theme);
  }

  /**
   * Set theme active
   * @param theme The theme to be set.
   */
  private setActiveTheme(theme: string) {
    const pattern: RegExp = /(dark|light)-([a-zA-Z]+)$/;
    const matches: RegExpMatchArray | null = theme.match(pattern);
    if (matches) {
      this.activeModeSig.set(matches[1]);
      this.activeThemeSig.set(matches[2]);
    }
  }
}
