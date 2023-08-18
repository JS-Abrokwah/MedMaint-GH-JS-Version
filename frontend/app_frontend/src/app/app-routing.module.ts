import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './root-components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './root-components/page-not-found/page-not-found.component';
import { UserFeedbackComponent } from './root-components/user-feedback/user-feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: LandingPageComponent },
  {path:'user-feedback',component:UserFeedbackComponent},
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'clinician',
    loadChildren: () =>
      import('./clinician/clinician.module').then((mod) => mod.ClinicianModule),
  },
  {
    path: 'engineer',
    loadChildren: () =>
      import('./engineer/engineer.module').then((mod) => mod.EngineerModule),
  },
  {
    path: 'esp',
    loadChildren: () => import('./esp/esp.module').then((mod) => mod.EspModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
