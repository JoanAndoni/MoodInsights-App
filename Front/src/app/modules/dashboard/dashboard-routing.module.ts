import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { 
  AuthGuardService as AuthGuard 
} from '../../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
