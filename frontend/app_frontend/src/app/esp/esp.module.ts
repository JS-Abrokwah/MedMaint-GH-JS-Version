import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspRoutingModule } from './esp-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EspComponent } from './esp.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    EspComponent
  ],
  imports: [
    CommonModule,
    EspRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class EspModule { }
