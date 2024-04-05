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

export type TFormatTime = "HH:mm a" | "h:mm a";

export type TTemperature = "c" | "f";

export type TSpeed = "kmh" | "mph" | "ms" | "beaufort" | "knots";

export type TPressure = "hpa" | "kpa" | "mbar" | "inhg" | "psi" | "bar" | "mmhg";

export type TVisibility = "km"| "mi";

export type TPrecipitation = "mm" | "in";

