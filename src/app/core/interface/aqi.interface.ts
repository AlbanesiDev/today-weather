export interface IAqi {
  coord: Coord;
  list: List[];
}

interface Coord {
  lon: number;
  lat: number;
}

export interface List {
  main: MainClass;
  components: { [key: string]: number };
  dt: number;
}

export interface MainClass {
  aqi: TAqi;
}

export type TAqi = 1 | 2 | 3 | 4 | 5;
