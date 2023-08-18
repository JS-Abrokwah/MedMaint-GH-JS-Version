import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { RegisterComponent } from '../register/register.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/shared/services/user.service';
import { USERROLE } from 'src/app/shared/static-data';
import { Subscription } from 'rxjs';
import { RegClinicianComponent } from '../reg-clinician/reg-clinician.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  select2Overlay: boolean = true;
  selected: string = 'Select your role';
  minCountForSearch: number = 3;
  loginSubscription!: Subscription;
  userRole!: any[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private dialodRef: MatDialogRef<LoginComponent>,
    private materialService: MaterialsService,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnDestroy(): void {
    // this.loginSubscription.unsubscribe()
    this.dialodRef.close();
  }

  ngOnInit(): void {
    this.userRole = USERROLE;
    this.loginForm = this.fb.group({
      role: [null, [Validators.required]],
      dept_key: [null],
      email: [null, [Validators.email, Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  //Form field getters
  get role() {
    return this.loginForm.get(['role']);
  }
  get deptKey() {
    return this.loginForm.get(['dept_key']);
  }
  get email() {
    return this.loginForm.get(['email']);
  }
  get password() {
    return this.loginForm.get(['password']);
  }

  // Registration Trigger
  onRegisterBtnClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    this.dialodRef.close();
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  onClinicianBtnClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    this.dialodRef.close();
    this.dialog.open(RegClinicianComponent, dialogConfig);
  }

  // Forgot Password Trigger
  onForgotBtnClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    this.dialodRef.close();
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  //Login Handler
  handleLogin() {
    this.ngxService.start();
    const loginData = this.loginForm.value;
    this.loginSubscription = this.userService.login(loginData).subscribe({
      next: (response: any) => {
        this.dialodRef.close();
        const userData = Object.entries(response.data);
        localStorage.clear();
        localStorage.setItem('token', response.token);
        userData.forEach((data) => {
          let key: string = data[0];
          let value: string = `${data[1]}`;
          localStorage.setItem(key, value);
        });
        if (response.success) {
          if (response.data.role == 'Admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (response.data.role == 'Engineer') {
            this.router.navigate(['/engineer/dashboard']);
          } else if (response.data.role == 'Clinician') {
            this.router.navigate(['/clinician/dashboard']);
          } else if (response.data.role == 'ESP') {
            this.router.navigate(['/esp/dashboard']);
          }
        }
        this.ngxService.stop();
      },
      error: (error) => {
        this.ngxService.stop();
        setTimeout(() => {
          this.materialService.openSnackBar(error.error?.message, 'ok', [
            'bg-danger',
            'text-light',
            'fw-bold',
          ]);
        }, 1000);
      },
      complete: () => {
        this.loginSubscription.unsubscribe();
      },
    });
  }
}
