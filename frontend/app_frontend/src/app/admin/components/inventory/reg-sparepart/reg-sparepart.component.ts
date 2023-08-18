import { Component, OnInit } from '@angular/core';
// import { CurrentUser } from 'src/app/models/current-user/current-user';
// import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRY } from 'src/app/shared/static-data';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/services/admin/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-sparepart',
  templateUrl: './reg-sparepart.component.html',
  styleUrls: ['./reg-sparepart.component.css'],
})
export class RegSparepartComponent implements OnInit {
  // user!:CurrentUser
  sparePartForm!: FormGroup;
  select2Overlay: boolean = true;
  selected: string = 'Select country';
  minCountForSearch: number = 3;
  country!: any[];
  regPartSubscription!:Subscription
  constructor(
    // private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegSparepartComponent>,
    private adminService:AdminService,
    private spinner:NgxUiLoaderService,
    private snackBar:MaterialsService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.country = COUNTRY;
    // this.user=this.userService.createCurrentUser()
    this.sparePartForm = this.fb.group({
      part_name: [null, Validators.required],
      serial_number: [null, Validators.required],
      quantity: [1, Validators.required],
      asset_number: [null, Validators.required],
      expiry_date: [null, Validators.required],
      vendor_name: [null, Validators.required],
      vendor_email: [null, [Validators.required, Validators.email]],
      vendor_phone: [
        null,
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      vendor_address: [null],
      vendor_country: [null],
    });
  }

  // getters
  get partName() {
    return this.sparePartForm.get(['part_name']);
  }
  get serialNumber() {
    return this.sparePartForm.get(['serial_number']);
  }
  get quantity() {
    return this.sparePartForm.get(['quantity']);
  }
  get assetNumber() {
    return this.sparePartForm.get(['asset_number']);
  }
  get expiryDate() {
    return this.sparePartForm.get(['expiry_date']);
  }
  get vendorName() {
    return this.sparePartForm.get(['vendor_name']);
  }
  get vendorEmail() {
    return this.sparePartForm.get(['vendor_email']);
  }
  get vendorPhone() {
    return this.sparePartForm.get(['vendor_phone']);
  }
  get vendorAddress() {
    return this.sparePartForm.get(['vendor_address']);
  }
  get vendorCountry() {
    return this.sparePartForm.get(['vendor_country']);
  }

  saveSparePart() {
    // console.log(this.sparePartForm.value);
    this.spinner.start()
    this.regPartSubscription= this.adminService.addSparePart(this.sparePartForm.value).subscribe({
      next:(value:any)=>{
        this.dialogRef.close('OK')
        this.spinner.stop();
        this.snackBar.openSnackBar(value.message, 'OK', [
          'bg-success',
          'text-center',
          'text-light',
          'fw-semibold',
        ]);
      },
      error:(error)=>{
        this.spinner.stop()
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
      complete:()=>{
        this.regPartSubscription.unsubscribe()
      }
    })
  }

  cancelSparePart() {
    this.dialogRef.close('Cancel');
  }
}
