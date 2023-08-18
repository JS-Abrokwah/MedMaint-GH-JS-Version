import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin/admin.service';
import { Department } from 'src/app/models/department/department';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { COUNTRY, NEWUSERROLE } from 'src/app/shared/static-data';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [],
})
export class AddUserComponent implements OnInit, AfterViewInit, OnDestroy {
  newUserForm!: FormGroup;
  roleSubscription!: Subscription | undefined;
  savePersonSubscription!: Subscription;
  deptListSubscription!:Subscription
  // department!: Department[];
  departmentList: any[] = [
    {
      options: [],
    },
  ];
  countries!: any[];
  newUserRoles!: any[];
  select2Overlay: boolean = true;
  countryPlaceHolder: string = 'Select country';
  rolePlaceholder: string = 'Select Role';
  deptPlaceholder:string='Select Department'
  minCountForSearch: number = 3;
  disabled: boolean = true;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private snackBar: MaterialsService,
    private spinner: NgxUiLoaderService,
    private adminService: AdminService,
    private router: Router
  ) {}
  ngOnInit(): void {

    this.deptListSubscription = this.adminService.getDepartments().subscribe({
      next: (value) => {
        value?.data?.forEach((dept: any) => {
          this.departmentList[0].options.push({
            label: dept?.dept_name,
            value: dept?.dept_id,
          });
        });
      },
      error: (error) => {
        if (error.error.redirect) {
          this.snackBar.openSnackBar(
            error.error.message + '. Log in to continue',
            'Ok',
            ['bg-danger', 'text-light', 'text-center', 'fw-semibold']
          );
          this.router.navigate([error.error.redirect]);
        } else {
          this.snackBar.openSnackBar(error.error.message, 'Ok', [
            'bg-danger',
            'text-light',
            'text-center',
            'fw-semibold',
          ]);
        }
      },
      complete: () => {
        this.deptListSubscription.unsubscribe();
      },
    });
    this.newUserForm = this.fb.group({
      first_name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      other_name: [null],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      role: [null, [Validators.required]],
      rank: [null],
      dept_id: [null],
      vendor_name: [null],
      vendor_email: [null],
      vendor_address: [null],
      vendor_phone: [null],
      vendor_country: [null],
    });
    this.countries = COUNTRY;
    this.newUserRoles = NEWUSERROLE;
  }

  //form getters
  get firstName() {
    return this.newUserForm.get(['first_name']);
  }
  get surname() {
    return this.newUserForm.get(['surname']);
  }
  get otherName() {
    return this.newUserForm.get(['other_name']);
  }
  get email() {
    return this.newUserForm.get(['email']);
  }
  get phone() {
    return this.newUserForm.get(['phone']);
  }
  get role() {
    return this.newUserForm.get(['role']);
  }
  get rank() {
    return this.newUserForm.get(['rank']);
  }
  get deptId() {
    return this.newUserForm.get(['dept_id']);
  }
  get vendorName() {
    return this.newUserForm.get(['vendor_name']);
  }
  get vendorEmail() {
    return this.newUserForm.get(['vendor_email']);
  }
  get vendorAddress() {
    return this.newUserForm.get(['vendor_address']);
  }
  get vendorPhone() {
    return this.newUserForm.get(['vendor_phone']);
  }
  get vendorCountry() {
    return this.newUserForm.get(['vendor_country']);
  }
  ngAfterViewInit(): void {
    this.roleSubscription = this.role?.valueChanges.subscribe((value) => {
      if (value == 'Engineer') {
        this.deptId?.addValidators(Validators.required);
        this.rank?.addValidators(Validators.required);

        this.vendorName?.removeValidators(Validators.required);
        this.vendorEmail?.removeValidators([
          Validators.required,
          Validators.email,
        ]);
        this.vendorPhone?.removeValidators([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ]);
        this.vendorCountry?.removeValidators(Validators.required);

        this.vendorName?.patchValue(null);
        this.vendorEmail?.patchValue(null);
        this.vendorPhone?.patchValue(null);
        this.vendorCountry?.patchValue(null);
      } else if (value == 'ESP') {
        this.deptId?.removeValidators(Validators.required);
        this.rank?.removeValidators(Validators.required);

        this.vendorName?.addValidators(Validators.required);
        this.vendorEmail?.addValidators([
          Validators.required,
          Validators.email,
        ]);
        this.vendorPhone?.addValidators([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ]);
        this.vendorCountry?.addValidators(Validators.required);

        this.deptId?.patchValue(null);
        this.rank?.patchValue(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription?.unsubscribe();
  }

  saveUser() {
    if (this.newUserForm.invalid) {
      this.snackBar.openSnackBar(
        'Some form fields are invalid. Kindly do the neccessary correction',
        'Ok',
        ['bg-danger', 'text-center', 'text-light']
      );
      return;
    } else {
      this.spinner.start();
      this.savePersonSubscription = this.adminService
        .addPersonnel(this.newUserForm.value)
        .subscribe({
          next: (value) => {
            this.spinner.stop();
            this.dialogRef.close('OK');
            this.snackBar.openSnackBar(value.message, 'OK', [
              'bg-success',
              'text-light',
              'text-center',
              'fw-semibold',
            ]);
          },
          error: (error) => {
            this.spinner.stop();
            if (error.error.redirect) {
              this.snackBar.openSnackBar(
                error.error.message + '. Log in to continue',
                'Ok',
                ['bg-danger', 'text-light', 'text-center', 'fw-semibold']
              );
              this.router.navigate([error.error.redirect]);
            } else {
              this.snackBar.openSnackBar(error.error.message, 'Ok', [
                'bg-danger',
                'text-light',
                'text-center',
                'fw-semibold',
              ]);
            }
          },
          complete: () => {
            this.savePersonSubscription.unsubscribe();
          },
        });
    }
  }
  onCancel() {
    this.dialogRef.close('Cancel');
  }
}
