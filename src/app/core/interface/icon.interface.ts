import { ICONS_DICTIONARY } from "../utils";

export interface IListIcons {
  code: number;
  icon_code: string;
  icon: string;
  icon_day: string;
  icon_night: string;
}
export interface IconConfig {
  [key: string]: {
    type: TWeatherIconsType;
    animation: TWeatherIconsAnimations;
    folder: TWeatherIconsFolder;
  };
}

export type TWeatherIconsType = (typeof ICONS_DICTIONARY.ICONS_TYPE)[keyof typeof ICONS_DICTIONARY.ICONS_TYPE];
export type TWeatherIconsAnimations =
  (typeof ICONS_DICTIONARY.ICONS_ANIMATIONS)[keyof typeof ICONS_DICTIONARY.ICONS_ANIMATIONS];
export type TWeatherIconsFolder = (typeof ICONS_DICTIONARY.ICONS_FOLDER)[keyof typeof ICONS_DICTIONARY.ICONS_FOLDER];
