import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Equipment } from 'src/app/models/equipment/equipment';
import { EngineerService } from '../../services/eng-service/engineer.service';
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
  getEquipSubscription!: Subscription;
  tabs = ['Equipment'];
  equipmentColumn = [
    'Asset Number',
    'Name',
    'Location',
    'Department',
    'Condition',
    'Manufacturer',
    'Action',
  ];
  equipmentData: Equipment[] = [];
  constructor(
    private engineerService: EngineerService,
    private router: Router,
    private snackBar: MaterialsService,
    private spinner: NgxUiLoaderService
  ) {}

  initDataTables() {
    $('#equipmentListings').DataTable().clear().destroy()
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

  ngOnInit(): void {
    this.getEquipList();
  }
  getEquipList() {
    this.spinner.start();
    this.getEquipSubscription = this.engineerService.getEquipments().subscribe({
      next: (value) => {
        this.spinner.stop();
        value?.data?.forEach((equip: any) => {
          this.equipmentData.push(new Equipment(equip));
        });
        this.initDataTables()
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
        this.getEquipSubscription.unsubscribe();
      },
    });
  }
  editEquip(equip: any) {
    console.log(equip);
  }

  viewEquip(equip: any) {
    console.log(equip);
  }
}
