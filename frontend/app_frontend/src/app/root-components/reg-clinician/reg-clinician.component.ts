import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-reg-clinician',
  templateUrl: './reg-clinician.component.html',
  styles: [],
})
export class RegClinicianComponent implements OnInit {
  registrationForm!: FormGroup;
  registerSubscription!: Subscription;
  registrationError!: string
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegClinicianComponent>,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbar:MaterialsService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      dept_key: [null, Validators.required],
      first_name: [null, Validators.required],
      surname: [null, Validators.required],
      other_name: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14),
        ],
      ],
      confirm_password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      profession: [null, Validators.required],
      rank: [null],
      duty_post: [null, Validators.required],
    });
  }

  //Form getters
  get deptKey() {
    return this.registrationForm.get(['dept_key']);
  }
  get firstName() {
    return this.registrationForm.get(['first_name']);
  }
  get surname() {
    return this.registrationForm.get(['surname']);
  }
  get otherName() {
    return this.registrationForm.get(['other_name']);
  }
  get email() {
    return this.registrationForm.get(['email']);
  }
  get password() {
    return this.registrationForm.get(['password']);
  }
  get confirmPassword() {
    return this.registrationForm.get(['confirm_password']);
  }
  get phone() {
    return this.registrationForm.get(['phone']);
  }
  get profession() {
    return this.registrationForm.get(['profession']);
  }
  get rank() {
    return this.registrationForm.get(['rank']);
  }
  get dutyPost() {
    return this.registrationForm.get(['duty_post']);
  }

  handleSubmit() {
    this.ngxService.start();
    this.registerSubscription = this.userService.newClinician(this.registrationForm.value).subscribe({
      next: (response)=>{
        this.ngxService.stop()
          this.dialogRef.close()
          this.snackbar.openSnackBar(response?.message+' '+'Login to continue', 'ok', [
            'bg-success',
            'text-light',
            'fw-bold',
          ]);
    },
    error:(error)=>{
      this.ngxService.stop()
      this.registrationError = error.error.message
    },
    complete: ()=>{
      this.registerSubscription.unsubscribe()
    }
    })
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
