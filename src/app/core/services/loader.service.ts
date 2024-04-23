import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * Service responsible for managing loading and error states within the application.
 * This service provides methods to control the visibility of loading indicators and error messages.
 */
@Injectable({
  providedIn: "root",
})
export class LoaderService {
  public errorMessage = signal<string>('')
  public isErrorSig = signal<boolean>(false);
  public isLoadSig = signal<boolean>(false);
  private isLoading = new BehaviorSubject<boolean>(false);

  public readonly isLoading$ = this.isLoading.asObservable();

  public hideLoad(): void {
    this.isLoading.next(false);
  }

  public showLoad(): void {
    this.isLoading.next(true);
  }

  public hideError() {
    this.isErrorSig.set(false);
  }

  public showError() {
    this.isErrorSig.set(true);
  }
}
