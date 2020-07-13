import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './main-components/page-not-found/page-not-found.component';
import { HomeComponent } from './main-components/home/home.component';
import { QualityComponent } from './main-components/quality/quality.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quality', component: QualityComponent },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule'
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
