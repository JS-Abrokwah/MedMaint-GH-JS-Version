import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  
  import {MatDialogRef } from "@angular/material/dialog"
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { UserService } from 'src/app/shared/services/user.service';
import { REGIONS } from 'src/app/shared/static-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  select2Overlay: boolean = true;
  selected: string = 'Select region';
  regions!: any[]
  registerSubscription!:Subscription

  constructor(
    private fb: FormBuilder,
    private materialService: MaterialsService,
    private dialodRef: MatDialogRef<RegisterComponent>,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.regions=REGIONS
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      otherNames: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      rank: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14),
        ],
      ],
      hospitalName: ['', Validators.required],
      cityTown: ['', Validators.required],
      region: ['', Validators.required],
      address: [''],
      logo: [''],
    });
  }

  // Getters
  get firstName() {
    return this.registrationForm.get(['firstName']);
  }
  get surname() {
    return this.registrationForm.get(['surname']);
  }
  get otherNames() {
    return this.registrationForm.get(['otherNames']);
  }
  get phone() {
    return this.registrationForm.get(['phone']);
  }
  get email() {
    return this.registrationForm.get(['email']);
  }
  get rank() {
    return this.registrationForm.get(['rank']);
  }
  get password() {
    return this.registrationForm.get(['password']);
  }
  get confirmPassword() {
    return this.registrationForm.get(['confirmPassword']);
  }
  get hospitalName() {
    return this.registrationForm.get(['hospitalName']);
  }
  get cityTown() {
    return this.registrationForm.get(['cityTown']);
  }
  get region() {
    return this.registrationForm.get(['region']);
  }
  get address() {
    return this.registrationForm.get(['address']);
  }
  get logo() {
    return this.registrationForm.get(['logo']);
  }

  registerHandler(): void {
    let formData = {
      first_name: this.firstName?.value,
      surname: this.surname?.value,
      other_name: this.otherNames?.value,
      phone: this.phone?.value,
      email: this.email?.value,
      password: this.password?.value,
      role: 'Admin',
      rank: this.rank?.value,
      profile_photo: '',
      hosp_name: this.hospitalName?.value,
      town: this.cityTown?.value,
      region: this.region?.value,
      address: this.address?.value,
      logo: this.logo?.value,
    };
    this.ngxService.start();
    this.registerSubscription=this.userService.register(formData).subscribe(
      {
        next:(response:any)=>{
          this.ngxService.stop()
          this.dialodRef.close()
          this.materialService.openSnackBar(response?.message, 'ok', [
            'bg-success',
            'text-light',
            'fw-bold',
          ]);

        },
        error:(error:any)=>{
          this.ngxService.stop()
          this.materialService.openSnackBar(error.error?.message, 'ok', [
            'bg-danger',
            'text-light',
            'fw-bold',
          ]);
        },
        complete:()=>{
          this.registerSubscription.unsubscribe()
        }
      }
    )
  }
}
