import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'equip-detail',
  templateUrl: './equip-detail.component.html',
  styleUrls: ['./equip-detail.component.css'],
})
export class EquipDetailComponent implements OnInit {
  registrationForm!: FormGroup;
  country!: any[];
  select2Overlay: boolean = true;
  selected: string = 'Select country';
  minCountForSearch: number = 3;
  currentDateTime: string;

  constructor(private formBuilder: FormBuilder) {
    const currentDate = new Date();
    this.currentDateTime = new Date().toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    console.log(this.currentDateTime)
    this.registrationForm = this.formBuilder.group({
      assetNumber: [null, Validators.required],
      expectedLifespan: [null, Validators.required],
      equipmentName: [null, Validators.required],
      name: [null, Validators.required],
      serialNumber: [null],
      location: [null, Validators.required],
      department: [null, Validators.required],
      countryOfOrigin: [null, Validators.required],
      lifespanNum: [1, Validators.required],
      lifespanScale: ['Day(s)', Validators.required],
      condition: [null, Validators.required],
      lastUpdatedBy: [null, Validators.required],
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
      lastUpdated: [null, Validators.required],
    });
  }
  

  
  get assetNumber() {
    return this.registrationForm.get('assetNumber');
  }
  get equipmentName() {
    return this.registrationForm.get('equipmentName');
  }
  get serialNumber() {
    return this.registrationForm.get('serialNumber');
  }
  get lastUpdatedBy() {
    return this.registrationForm.get('lastUpdatedBy');
  }
  get lastUpdated() {
    return this.registrationForm.get('lastUpdated');
  }
  get location() {
    return this.registrationForm.get('location');
  }
  get name() {
    return this.registrationForm.get('name');
  }
  get expectedLifespan() {
    return this.registrationForm.get('expectedLifespan');
  }
  get department() {
    return this.registrationForm.get('department');
  }
  get countryOfOrigin() {
    return this.registrationForm.get('countryOfOrigin');
  }
  get lifespanNum() {
    return this.registrationForm.get('lifespanNum');
  }
  get lifespanScale() {
    return this.registrationForm.get('lifespanScale');
  }
  get condition() {
    return this.registrationForm.get('condition');
  }
  get vendorName() {
    return this.registrationForm.get('vendorName');
  }
  get vendorEmail() {
    return this.registrationForm.get('vendorEmail');
  }
  get vendorCountry() {
    return this.registrationForm.get('vendorCountry');
  }
  get model() {
    return this.registrationForm.get('model');
  }
  get manufacturer() {
    return this.registrationForm.get('manufacturer');
  }
  get manufacturingYear() {
    return this.registrationForm.get('manufacturingYear');
  }
  get type() {
    return this.registrationForm.get('type');
  }
  get ppmIntervalNum() {
    return this.registrationForm.get('ppmIntervalNum');
  }
  get ppmIntervalScale() {
    return this.registrationForm.get('ppmIntervalScale');
  }
  get dateInstalled() {
    return this.registrationForm.get('dateInstalled');
  }
  get remark() {
    return this.registrationForm.get('remark');
  }
  get vendorAddress() {
    return this.registrationForm.get('vendorAddress');
  }
  get vendorTel() {
    return this.registrationForm.get('vendorTel');
  }

  saveEquip() {
    const formData = {
      asset_number: this.assetNumber?.value,
      equip_name: this.equipmentName?.value,
      model: this.model?.value,
      name: this.name?.value,
      lastUpdatedBy: this.lastUpdatedBy?.value,
      lastUpdated: this.lastUpdated?.value,
      serial_number: this.serialNumber?.value,
      expected_lifespan: this.expectedLifespan?.value,
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
      lifespan: this.lifespanNum?.value.toString() + ' ' + this.lifespanScale?.value,
      date_installed: this.dateInstalled?.value,
      condition: this.condition?.value,
      remark: this.remark?.value,
      vendor_name: this.vendorName?.value,
      vendor_address: this.vendorAddress?.value,
      vendor_email: this.vendorEmail?.value,
      vendor_phone: this.vendorTel?.value,
      vendor_country: this.vendorCountry?.value,
    };

    console.log(formData);
  }
  
  editEquip() {
    
  }

}
