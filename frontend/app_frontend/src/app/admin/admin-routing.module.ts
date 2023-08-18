import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DepartmentComponent } from './components/department/department.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { AdminComponent } from './admin.component';
import { PersonnelComponent } from './components/personnel/personnel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'personnel', component: PersonnelComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
