import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { EditUserModalComponent } from 'src/app/main-components/edit-user-modal/edit-user-modal.component'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule
  ],
  declarations: [OverviewComponent, EditUserModalComponent]
})
export class AdminModule { }
