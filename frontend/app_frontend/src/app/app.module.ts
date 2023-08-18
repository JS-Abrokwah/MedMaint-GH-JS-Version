import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './shared/material/material.module';
import { LandingPageComponent } from './root-components/landing-page/landing-page.component';
import { LoginComponent } from './root-components/login/login.component';
import { RegisterComponent } from './root-components/register/register.component';
import { ForgotPasswordComponent } from './root-components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './root-components/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {Select2Module} from 'ng-select2-component';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';
import { DataTablesModule } from 'angular-datatables';
import { RegClinicianComponent } from './root-components/reg-clinician/reg-clinician.component';
import { UserFeedbackComponent } from './root-components/user-feedback/user-feedback.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  logoUrl: '../../assets/logo/logo.png',
  logoSize: 100,
  logoPosition: 'center-center',
  textColor: '#08b93a',
  textPosition: 'center-center',
  pbColor: 'green',
  bgsColor: 'green',
  fgsColor: 'green',
  fgsType: SPINNER.threeBounce,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    RegClinicianComponent,
    UserFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    MaterialModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    DataTablesModule.forRoot(),
    NgxUiLoaderRouterModule,
    ReactiveFormsModule,
    Select2Module,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
