import { isDevMode } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { WeatherEffects } from "../store/weather.effects";

export const storeConfig = [
  provideStore(),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    connectInZone: true,
  }),
  provideEffects([WeatherEffects]),
];
