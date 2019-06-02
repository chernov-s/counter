import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // TODO add PreloadAllModules
  exports: [RouterModule]
})
export class AppRoutingModule { }
