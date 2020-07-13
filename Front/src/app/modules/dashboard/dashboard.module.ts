import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {NgApexchartsModule} from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    TranslateModule,
    NgApexchartsModule,
  ],
  declarations: [OverviewComponent]
})
export class DashboardModule { }
