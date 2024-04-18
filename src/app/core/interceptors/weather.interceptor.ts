import type { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { LoaderService } from "../services/spinner-loader.service";

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService: LoaderService = inject(LoaderService);

  loaderService.showLoad();

  return next(req).pipe(
    finalize(() => loaderService.hideLoad()),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "An unknown error occurred!";
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.status} - ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = "Error 400 - Bad Request.";
            break;
          case 401:
            errorMessage = "Error 401 - Unauthorized.";
            break;
          case 404:
            errorMessage = "Error 404 - Not Found.";
            break;
          case 429:
            errorMessage = "Error 429 - Too Many Requests.";
            break;
          default:
            errorMessage = `Error ${error.status} - ${error.statusText}`;
        }
      }
      loaderService.showError();
      return throwError(() => errorMessage);
    }),
  );
};
