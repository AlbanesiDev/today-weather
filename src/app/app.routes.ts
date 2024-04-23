import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "Today's Weather",
    loadComponent: () => import("./public/pages/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "home",
    title: "Today's Weather",
    loadComponent: () => import("./public/pages/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "forecast",
    title: "Today's Weather",
    loadComponent: () => import("./public/pages/forecast/forecast.component").then((c) => c.ForecastComponent),
  },
  {
    path: "about",
    title: "Today's Weather",
    loadComponent: () => import("./public/pages/about/about.component").then((c) => c.AboutComponent),
  },
  {
    path: "**",
    title: "Today's Weather",
    loadComponent: () => import("./public/pages/home/home.component").then((c) => c.HomeComponent),
  },
];
