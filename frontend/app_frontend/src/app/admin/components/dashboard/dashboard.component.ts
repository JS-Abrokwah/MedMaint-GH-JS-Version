import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { AdminService } from '../../services/admin/admin.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  serviceEquip!: any[];
  pendingApprovals!: any[];
  eyeIcon = faEye;
  deptListSubscription!: Subscription;
  equipListSubscription!: Subscription;
  piechartLabels = [
    'Faulty Equipment',
    'Equipment under repair',
    'Functional Equipment',
    'Uninstalled',
  ];
  piechartTitle = 'Equipment Condition Summary';
  pieChartData!: number[];
  piechartColors = ['#db5656', '#ec9e3f', '#3e7ae2', '#99ca36'];
  barchartTitle = 'Equipment Distribution by Department';
  barchartLabels!: string[];
  barchartData!: number[];
  constructor(
    private adminService: AdminService,
    private router: Router,
    private spinner: NgxUiLoaderService,
    private snackBar: MaterialsService
  ) {}

  ngOnInit(): void {
    this.getDeptList();
    this.getEquipList();
    this.serviceEquip = [
      {
        assetNumber: 'QTYe3289',
        name: 'Patient Monitor',
        location: 'Theater 4',
        department: 'Emergency',
      },
      {
        assetNumber: 'QTYe3289',
        name: 'Patient Monitor',
        location: 'Theater 1',
        department: 'Surgical',
      },
      {
        assetNumber: 'QTYe3289',
        name: 'Patient Monitor',
        location: 'Theater 5',
        department: 'Surgical',
      },
      {
        assetNumber: 'QTY23289',
        name: 'Patient Monitor',
        location: 'Theater 4',
        department: 'Dental',
      },
    ];
    this.pendingApprovals = [
      {
        type: 'PPM Review',
        sender: 'yuwio48',
      },
      {
        type: 'Part Request',
        sender: 'ebeirejk',
      },
      {
        type: 'PPM Review',
        sender: 'iwoeio234',
      },
    ];
  }

  getServicingDetail(equip: any) {
    console.log(equip);
  }
  getApprovalDetail(approval: any) {
    console.log(approval);
  }

  sortEquipOncondition(data: any[]): number[] {
    let functional: number = 0,
      faulty: number = 0,
      underRepair: number = 0,
      uninstalled: number = 0;
    data.forEach((equip: any) => {
      switch (equip.condition) {
        case 'Faulty':
          faulty++;
          break;
        case 'Functional':
          functional++;
          break;
        case 'Under Repair':
          underRepair++;
          break;
        case 'Uninstalled':
          uninstalled++;
          break;
      }
    });
    // console.log('piechart data',[faulty, underRepair, functional, uninstalled]);
    return [faulty, underRepair, functional, uninstalled];
  }
  sortEquipOnDepartment(equipment: any[], labels: string[]): number[] {
    const barData: number[] = [];
    labels.forEach((label) => {
      barData.push(
        equipment.filter((equip) => equip.dept_name == label).length
      );
    });
    // console.log('barchart Data',barData);
    return barData;
  }

  getDeptList() {
    this.spinner.start();
    this.deptListSubscription = this.adminService.getDepartments().subscribe({
      next: (value) => {
        this.spinner.stop();
        const labels: string[] = [];
        value?.data?.forEach((data: any) => {
          if (!labels.includes(data.dept_name)) {
            labels.push(data.dept_name);
          }
        });
        this.barchartLabels = labels;
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
        this.deptListSubscription.unsubscribe();
      },
    });
  }
  getEquipList() {
    this.spinner.start();
    this.equipListSubscription = this.adminService.getEquipments().subscribe({
      next: (value) => {
        this.spinner.stop();
        this.pieChartData = this.sortEquipOncondition(value?.data);
        this.barchartData = this.sortEquipOnDepartment(
          value?.data,
          this.barchartLabels
        );
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
        this.equipListSubscription.unsubscribe();
      },
    });
  }
}
