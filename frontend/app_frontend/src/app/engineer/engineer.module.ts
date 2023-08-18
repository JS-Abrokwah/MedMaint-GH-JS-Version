import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineerRoutingModule } from './engineer-routing.module';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CmComponent } from './components/cm/cm.component';
import { PpmComponent } from './components/ppm/ppm.component';
import { EngineerComponent } from './engineer.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EquipDetailComponent } from './components/inventory/equip-detail/equip-detail.component';
import { EngineerService } from './services/eng-service/engineer.service';
import { DataTablesModule } from 'angular-datatables';
import { PpmPgOneComponent } from './components/ppm/ppm-pg-one/ppm-pg-one.component';
import { PpmPgTwoComponent } from './components/ppm/ppm-pg-two/ppm-pg-two.component';
import { DueppmComponent } from './components/ppm/children/dueppm/dueppm.component';

@NgModule({
  declarations: [
    InventoryComponent,
    DashboardComponent,
    CmComponent,
    PpmComponent,
    EngineerComponent,
    EquipDetailComponent,
    PpmPgOneComponent,
    PpmPgTwoComponent,
    DueppmComponent,
  ],
  imports: [
    CommonModule,
    EngineerRoutingModule,
    SharedModule,
    MaterialModule,
    FontAwesomeModule,
    DataTablesModule
  ],
  providers: [EngineerService],
})
export class EngineerModule {}
