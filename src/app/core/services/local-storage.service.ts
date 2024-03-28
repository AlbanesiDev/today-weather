import { Injectable } from "@angular/core";

/**
 * Service for handling browser's local storage.
 * Provides methods to set, get, and remove data in localStorage.
 */
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private expirationOptions: { [key: string]: number } = {
    "30m": 1800000,
    "1hr": 3600000,
    "2hs": 7200000,
    "3hs": 10800000,
    "6hs": 21600000,
    "12hs": 43200000,
    "24hs": 86400000,
  };

  /**
   * Saves a value to localStorage with an optional expiration time from a predefined list or default 1 hour.
   * @param {string} key The key under which to store the value.
   * @param value The value to be stored. Can be any type that is JSON serializable.
   * @param {boolean} expire Optional parameter to set expiration. Defaults to 1 hour if true.
   * @param {string} expirationOption Optional parameter to set a specific expiration time from predefined options.
   */
  public setItem(key: string, value: any, expire?: boolean, expirationOption?: string): void {
    let expiryTime = this.expirationOptions["1hr"]; // Default to 1 Hour
    if (expire && expirationOption && this.expirationOptions[expirationOption]) {
      expiryTime = this.expirationOptions[expirationOption];
    }
    const data = {
      value: value,
      expiry: expire ? new Date().getTime() + expiryTime : null,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Retrieves a value from localStorage and checks if it has expired.
   * @param {string} key The key of the value to retrieve.
   * @returns The retrieved value parsed from JSON, or null if the key does not exist or the item has expired.
   */
  public getItem(key: string): any {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (item.expiry && now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  /**
   * Removes a value from localStorage.
   * @param {string} key The key of the value to remove.
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
