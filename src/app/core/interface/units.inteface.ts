import { UNITS_DICTIONARY } from "../utils";

export interface IUnitsConfig {
  name: string;
  buttons: Buttons[];
}

export interface Buttons {
  label: string;
  state: string;
  stateCurrent: () => string;
  action: () => void;
}

export type TFormatTime = (typeof UNITS_DICTIONARY.FORMAT_TIME)[keyof typeof UNITS_DICTIONARY.FORMAT_TIME];
export type TTemperature = (typeof UNITS_DICTIONARY.TEMPERATURE)[keyof typeof UNITS_DICTIONARY.TEMPERATURE];
export type TSpeed = (typeof UNITS_DICTIONARY.SPEED)[keyof typeof UNITS_DICTIONARY.SPEED];
export type TPressure = (typeof UNITS_DICTIONARY.PRESSURE)[keyof typeof UNITS_DICTIONARY.PRESSURE];
export type TVisibility = (typeof UNITS_DICTIONARY.VISIBILITY)[keyof typeof UNITS_DICTIONARY.VISIBILITY];
export type TPrecipitation = (typeof UNITS_DICTIONARY.PRECIPITATION)[keyof typeof UNITS_DICTIONARY.PRECIPITATION];
