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

export type TWeatherIconsType = "fill" | "outline";
export type TWeatherIconsAnimations = "on" | "off";
export type TWeatherIconsFolder = TWeatherIconsType | "fill-static" | "outline-static";
