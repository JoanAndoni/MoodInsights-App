import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [OverviewComponent]
})
export class ProfileModule { }
