import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./Pages/home-component/home-component.component').then(m => m.HomeComponentComponent) },
  { path: 'about', loadComponent: () => import('./Pages/about-page/about-page.component').then(m => m.AboutPageComponent) },
  { path: 'predict', loadComponent: () => import('./Pages/prediction/prediction.component').then(m => m.PredictionComponent) },
];
