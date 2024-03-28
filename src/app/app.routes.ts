import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "Today's Weather",
    loadComponent: () => import("./public/pages/home/home.component").then((c) => c.HomeComponent),
  },
];
