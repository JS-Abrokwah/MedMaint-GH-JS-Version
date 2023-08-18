import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineerComponent } from './engineer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CmComponent } from './components/cm/cm.component';
import { PpmComponent } from './components/ppm/ppm.component';

const routes: Routes = [
  {path:'',component:EngineerComponent,children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'inventory',component:InventoryComponent},
    {path:'cm',component:CmComponent},
    {path:'ppm',component:PpmComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule { }
