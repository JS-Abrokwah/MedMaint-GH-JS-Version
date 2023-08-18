import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUser } from 'src/app/models/current-user/current-user';
import { COUNTRY } from 'src/app/shared/static-data';
import { Router } from '@angular/router';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-reg-equipment',
  templateUrl: './reg-equipment.component.html',
  styleUrls: ['./reg-equipment.component.css'],
})
export class RegEquipmentComponent implements OnInit {
  registrationForm!: FormGroup;
  deptListSubscription!: Subscription;
  // user!: CurrentUser;
  departmentList: any[] = [
    {
      options: [],
    },
  ];
  regEquipSubscription!: Subscription;
  country!: any[];
  select2Overlay: boolean = true;
  selected: string = 'Select country';
  deptPlaceholder: string = 'Select department';
  minCountForSearch: number = 3;

  constructor(
    private formBuilder: FormBuilder,
    // private userService: UserService,
    private dialogRef: MatDialogRef<RegEquipmentComponent>,
    private router: Router,
    private snackBar: MaterialsService,
    private adminService: AdminService,
    private spinner: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    // this.user = this.userService.createCurrentUser();
    this.country = COUNTRY;
    this.deptListSubscription = this.adminService.getDepartments().subscribe({
      next: (value) => {
        value?.data?.forEach((dept: any) => {
          this.departmentList[0].options.push({
            label: dept?.dept_name,
            value: dept?.dept_name,
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
    this.registrationForm = this.formBuilder.group({
      assetNumber: [null, Validators.required],
      equipmentName: [null, Validators.required],
      serialNumber: [null],
      location: [null, Validators.required],
      department: [null, Validators.required],
      countryOfOrigin: [null, Validators.required],
      lifespanNum: [1, Validators.required],
      lifespanScale: ['Day(s)', Validators.required],
      condition: [null, Validators.required],
      vendorName: [null, Validators.required],
      vendorEmail: [null, [Validators.required, Validators.email]],
      vendorCountry: [null],
      model: [null, Validators.required],
      manufacturer: [null, Validators.required],
      manufacturingYear: [null, Validators.required],
      type: [null, Validators.required],
      ppmIntervalNum: [1, Validators.required],
      ppmIntervalScale: ['Day(s)', Validators.required],
      dateInstalled: [null, Validators.required],
      remark: [null, Validators.required],
      vendorAddress: [null],
      vendorTel: [null, Validators.required],
    });
  }

  // Form getters
  get assetNumber() {
    return this.registrationForm.get(['assetNumber']);
  }
  get equipmentName() {
    return this.registrationForm.get(['equipmentName']);
  }
  get serialNumber() {
    return this.registrationForm.get(['serialNumber']);
  }
  get location() {
    return this.registrationForm.get(['location']);
  }
  get department() {
    return this.registrationForm.get(['department']);
  }
  get countryOfOrigin() {
    return this.registrationForm.get(['countryOfOrigin']);
  }
  get lifespanNum() {
    return this.registrationForm.get(['lifespanNum']);
  }
  get lifespanScale() {
    return this.registrationForm.get(['lifespanScale']);
  }
  get condition() {
    return this.registrationForm.get(['condition']);
  }
  get vendorName() {
    return this.registrationForm.get(['vendorName']);
  }
  get vendorEmail() {
    return this.registrationForm.get(['vendorEmail']);
  }
  get vendorCountry() {
    return this.registrationForm.get(['vendorCountry']);
  }
  get model() {
    return this.registrationForm.get(['model']);
  }
  get manufacturer() {
    return this.registrationForm.get(['manufacturer']);
  }
  get manufacturingYear() {
    return this.registrationForm.get(['manufacturingYear']);
  }
  get type() {
    return this.registrationForm.get(['type']);
  }
  get ppmIntervalNum() {
    return this.registrationForm.get(['ppmIntervalNum']);
  }
  get ppmIntervalScale() {
    return this.registrationForm.get(['ppmIntervalScale']);
  }
  get dateInstalled() {
    return this.registrationForm.get(['dateInstalled']);
  }
  get remark() {
    return this.registrationForm.get(['remark']);
  }
  get vendorAddress() {
    return this.registrationForm.get(['vendorAddress']);
  }
  get vendorTel() {
    return this.registrationForm.get(['vendorTel']);
  }

  saveEquip() {
    const formData = {
      asset_number: this.assetNumber?.value,
      equip_name: this.equipmentName?.value,
      model: this.model?.value,
      serial_number: this.serialNumber?.value,
      manufacturer: this.manufacturer?.value,
      manufac_year: this.manufacturingYear?.value,
      location: this.location?.value,
      dept_name: this.department?.value,
      equip_type: this.type?.value,
      country_of_origin: this.countryOfOrigin?.value,
      ppm_interval:
        this.ppmIntervalNum?.value.toString() +
        ' ' +
        this.ppmIntervalScale?.value,
      lifespan:
        this.lifespanNum?.value.toString() + ' ' + this.lifespanScale?.value,
      date_installed: this.dateInstalled?.value,
      condition: this.condition?.value,
      remark: this.remark?.value,
      vendor_name: this.vendorName?.value,
      vendor_address: this.vendorAddress?.value,
      vendor_email: this.vendorEmail?.value,
      vendor_phone: this.vendorTel?.value,
      vendor_country: this.vendorCountry?.value,
    };
    this.spinner.start();
    this.regEquipSubscription = this.adminService
      .addEquipment(formData)
      .subscribe({
        next: (value) => {
          this.spinner.stop();
          this.dialogRef.close('OK')
          this.snackBar.openSnackBar(value.message, 'OK', [
            'bg-success',
            'text-center',
            'text-light',
            'fw-semibold',
          ]);
        },
        error: (error) => {
          this.spinner.stop()
          if (error.error.redirect) {
            this.snackBar.openSnackBar(
              error.error.message + '. Log in to continue',
              'Ok',
              ['bg-danger', 'text-light', 'text-center', 'fw-semibold']
            );
            this.router.navigate([error.error.redirect]);
          } else {
            console.log(error.error.errormsg);
            this.snackBar.openSnackBar(error.error.message, 'Ok', [
              'bg-danger',
              'text-light',
              'text-center',
              'fw-semibold',
            ]);
          }
        },
        complete:()=>{
          this.regEquipSubscription.unsubscribe()
        }
      });
  }
  cancelEquip() {
    this.dialogRef.close('Cancel');
  }
}
