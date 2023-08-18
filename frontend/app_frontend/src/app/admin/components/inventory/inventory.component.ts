import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegEquipmentComponent } from 'src/app/admin/components/inventory/reg-equipment/reg-equipment.component';
import { RegSparepartComponent } from './reg-sparepart/reg-sparepart.component';
import { Equipment } from 'src/app/models/equipment/equipment';
import { AdminService } from '../../services/admin/admin.service';
import { Router } from '@angular/router';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  eyeIcon = faEye;
  penIcon = faPen;
  plusIcon = faPlus;
  isViewEquip: boolean = false;
  equipDetailData: any;
  tabs: string[] = ['Equipment', 'Spare Parts'];
  equipListSubsription!: Subscription;
  partsListSubscription!: Subscription;
  equipmentColumn = [
    'Asset Number',
    'Name',
    'Location',
    'Department',
    'Condition',
    'Manufacturer',
    'Action',
  ];
  equipmentData!: Equipment[];

  partsColumn = [
    'Serial No.',
    'Name',
    'Equipment',
    'Quantity',
    'Vendor',
    'Action',
  ];
  partsData: any = [
    {
      serial_number: '',
      part_name: '',
      asset_number: '',
      current_quantity: '',
      vendor_name: '',
    },
  ];

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MaterialsService,
    private spinner: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.updateEquipments();
    this.updateSpartPartes();
  }

  initDataTable() {
    $('#equipmentListings').DataTable().clear().destroy(false);
    setTimeout(() => {
      $('#equipmentListings').DataTable({
        pagingType: 'simple_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [10, 25, 50, 100],
        dom: 'Bfrtip',
      });

      $('.dt-buttons').addClass('text-start pt-3');
      $('.dt-button').addClass('btn btn-sm mx-2');
      $('.dt-button').removeClass('dt-button');
      $('.buttons-copy').addClass('btn-secondary');
      $('.buttons-excel').addClass('btn-success');
      $('.buttons-csv').addClass('btn-primary');
      $('.buttons-print').addClass('btn-info');
      $('.buttons-print').text(`PDF`);
    }, 1);
  }

  updateEquipments() {
    this.spinner.start();
    this.equipmentData = [];
    this.equipListSubsription = this.adminService.getEquipments().subscribe({
      next: (value) => {
        this.spinner.stop();
        value?.data?.forEach((equip: any) => {
          this.equipmentData.push(new Equipment(equip));
        });
        this.initDataTable();
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
        this.equipListSubsription.unsubscribe();
      },
    });
  }

  updateSpartPartes() {
    this.spinner.start();
    this.partsListSubscription = this.adminService.getSpareParts().subscribe({
      next: (value: any) => {
        this.spinner.stop();
        this.partsData = value?.data;
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
        this.partsListSubscription.unsubscribe();
      },
    });
  }

  editEquip(equip: any) {
    console.log(equip);
  }

  viewEquip(equip: any) {
    this.equipDetailData = equip;
    this.isViewEquip = true;
  }

  backFromEquip($event: boolean) {
    this.initDataTable();
    this.isViewEquip = $event;
  }

  editPart(part: any) {
    console.log(part);
  }

  viewPart(part: any) {
    console.log(part);
  }

  addNewPart() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    const dialogRef = this.dialog.open(RegSparepartComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      if (value == 'OK') {
        this.updateSpartPartes();
      }
    });
  }
  addNewEquip() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    const dialogRef = this.dialog.open(RegEquipmentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      if (value == 'OK') {
        this.updateEquipments();
      }
    });
  }
}
