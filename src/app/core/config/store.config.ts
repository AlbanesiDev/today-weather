import { isDevMode } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideStore, StoreConfig } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { WeatherEffects } from "../state";
import { weatherReducer } from "../state";
import { metaReducers } from "../utils";
import { IAppState } from "../interface";

export const storeConfig = [
  provideStore(
    {
      weather: weatherReducer,
    },
    // {
    //   metaReducers,
    // } as StoreConfig<IAppState>,
  ),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    connectInZone: true,
  }),
  provideEffects([WeatherEffects]),
];
