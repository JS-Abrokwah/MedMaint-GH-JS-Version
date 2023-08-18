import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { AEDashboardComponent } from './components/a-e-dashboard/a-e-dashboard.component';
import { TableRendererComponent } from './components/table-renderer/table-renderer.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { EditEquipmentComponent } from './components/edit-equipment/edit-equipment.component';
import { TabsRendererComponent } from './components/tabs-renderer/tabs-renderer.component';
import { SparePartListingsComponent } from './components/spare-part-listings/spare-part-listings.component';
import { EquipCardComponent } from './components/equip-card/equip-card.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { CliPersonnelComponent } from './components/cli-personnel/cli-personnel.component';
import { CliMaintenanceComponent } from './components/cli-maintenance/cli-maintenance.component';
import { MailSenderComponent } from './components/mail-sender/mail-sender.component';
import { WarningPopupComponent } from './components/warning-popup/warning-popup.component';

const sharedComponents = [
  HomeLayoutComponent,
  AEDashboardComponent,
  TableRendererComponent,
  EditEquipmentComponent,
  TabsRendererComponent,
  SparePartListingsComponent,
  EquipCardComponent,
  CliPersonnelComponent,
  PiechartComponent,
  BarchartComponent,
  CliMaintenanceComponent,
  MailSenderComponent,
  WarningPopupComponent,
];

@NgModule({
  declarations: sharedComponents,
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    NgbCollapseModule,
    FontAwesomeModule,
    DataTablesModule,
    NgbOffcanvasModule,
    NgChartsModule,
    ReactiveFormsModule,
    Select2Module,
  ],
  providers: [],
  exports: [sharedComponents],
})
export class SharedModule {}
