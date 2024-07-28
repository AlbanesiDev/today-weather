import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideServiceWorker } from "@angular/service-worker";

import { routes } from "./app.routes";

import { weatherInterceptor } from "./core/interceptors/weather.interceptor";

import { MessageService } from "primeng/api";

import { translateConfig, storeConfig, firebaseConfig } from "./core/config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([weatherInterceptor]), withFetch()),
    provideAnimationsAsync(),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    MessageService,
    translateConfig,
    firebaseConfig,
    storeConfig,
  ],
};
