/* eslint-disable @typescript-eslint/no-explicit-any */
import { localStorageSync } from "ngrx-store-localstorage";
import { MetaReducer } from "@ngrx/store";
import { IAppState } from "../interface";

export function localStorageSyncReducer(reducer: any): any {
  return (state: any, action: any) => {
    const newState = localStorageSync({
      keys: ["weather"],
      rehydrate: true,
      checkStorageAvailability: true,
    })(reducer)(state, action);
    return newState;
  };
}

export const metaReducers: MetaReducer<IAppState>[] = [localStorageSyncReducer];
