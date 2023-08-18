import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { DepartmentComponent } from './components/department/department.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { EquipDetailsComponent } from './components/inventory/equip-details/equip-details.component';
import { AddDeptComponent } from './components/department/add-dept.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentDetailsComponent } from './components/department/department-details/department-details.component';
import { PersonCardComponent } from './components/personnel/person-card/person-card.component';
import { AddUserComponent } from './components/personnel/add-user/add-user.component';
import { UserDetailComponent } from './components/personnel/user-detail/user-detail.component';
import { Select2Module } from 'ng-select2-component';
import { AdminService } from './services/admin/admin.service';
import { RegEquipmentComponent } from './components/inventory/reg-equipment/reg-equipment.component';
import { RegSparepartComponent } from './components/inventory/reg-sparepart/reg-sparepart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InventoryComponent,
    PersonnelComponent,
    MaintenanceComponent,
    DepartmentComponent,
    AdminComponent,
    EquipDetailsComponent,
    AddDeptComponent,
    DepartmentDetailsComponent,
    PersonCardComponent,
    AddUserComponent,
    UserDetailComponent,
    RegEquipmentComponent,
    RegSparepartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    FontAwesomeModule,
    DataTablesModule,
    Select2Module,
    ReactiveFormsModule
  ],
  providers: [AdminService],
})
export class AdminModule {}
