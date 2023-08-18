import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClinicianRoutingModule } from './clinician-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClinicianComponent } from './clinician.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ClinicianComponent,
  ],
  imports: [
    CommonModule,
    ClinicianRoutingModule,
    FontAwesomeModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClinicianModule { }
