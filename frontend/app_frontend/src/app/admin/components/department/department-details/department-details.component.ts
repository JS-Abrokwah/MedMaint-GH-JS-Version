import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Department } from 'src/app/models/department/department';
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/admin/services/admin/admin.service';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WarningPopupComponent } from 'src/app/shared/components/warning-popup/warning-popup.component';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
})
export class DepartmentDetailsComponent implements OnInit {
  backArrow = faArrowLeft;
  deleteIcon = faTrashCan;
  eyeIcon = faEye;
  removeDeptSubscription!: Subscription;
  resetKeySubsription!: Subscription;
  @Input() department!: Department;
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() deleted: EventEmitter<boolean> = new EventEmitter();
  @Output() deptResetKey: EventEmitter<boolean> = new EventEmitter();

  pageTitle!: string;
  activities!: any[];
  equipments!: any[];
  persons!: User[];
  piechartLabels = [
    'Faulty Equipment',
    'Equipment under repair',
    'Functional Equipment',
    'Uninstalled',
  ];
  piechartTitle = 'Equipment Condition Summary';
  pieChartData = [12, 21, 38, 14];
  piechartColors = ['#db5656', '#ec9e3f', '#3e7ae2', '#99ca36'];
  constructor(
    private adminService: AdminService,
    private snackBar: MaterialsService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxUiLoaderService
  ) {}
  ngOnInit() {
    this.pageTitle = `Department > ${this.department?.dept_name}`;
    this.initDataTable();
    this.activities = [
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'Repair',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'Repair',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'Repair',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'Repair',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
    ];
    this.equipments = [
      //This should be equipment model
      {
        asset_number: 'DJ247DH',
        equip_name: 'Ventilator',
        location: 'Theater 4',
        condition: 'Functional',
      },
      {
        asset_number: 'DJ247DH',
        equip_name: 'Ventilator',
        location: 'Theater 4',
        condition: 'Under Repair',
      },
      {
        asset_number: 'DJ247DH',
        equip_name: 'Ventilator',
        location: 'Theater 4',
        condition: 'Functional',
      },
      {
        asset_number: 'DJ247DH',
        equip_name: 'Ventilator',
        location: 'Theater 4',
        condition: 'Functional',
      },
      {
        asset_number: 'DJ247DH',
        equip_name: 'Ventilator',
        location: 'Theater 4',
        condition: 'Faulty',
      },
    ];
    this.persons = [
      new User({
        first_name: 'Kofi',
        surname: 'Mensah',
        role: 'Engineer',
      }),
      new User({
        first_name: 'Sarah',
        surname: 'Boaz',
        role: 'Clinician',
      }),
      new User({
        first_name: 'Kwame',
        surname: 'Mensah',
        role: 'ESP',
      }),
      new User({
        first_name: 'Peter',
        surname: 'Bentsil',
        role: 'Clinician',
      }),
    ];
  }
  initDataTable() {
    setTimeout(() => {
      $('#deptTable').DataTable({
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
  showActivity(activity: any) {
    console.log(activity);
  }
  showEquipment(equip: any) {
    console.log(equip);
  }
  showPerson(person: User) {
    console.log(person);
  }
  goBack() {
    this.back.emit(false);
  }
  removeDept() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight,
      dialogConfig.maxWidth,
      (dialogConfig.data = {
        ok: 'OK',
        cancel: 'Cancel',
        message:
          'All data about this department, including equipment and personnel information, will be removed.',
      });
    const dialogRef = this.dialog.open(WarningPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      if (value == 'OK') {
        this.spinner.start();
        this.removeDeptSubscription = this.adminService
          .removeDepartment({
            dept_id: this.department.dept_id,
            dept_name: this.department.dept_name,
          })
          .subscribe({
            next: (value) => {
              this.spinner.stop();
              this.snackBar.openSnackBar(value.message, 'OK', [
                'text-light',
                'bg-success',
                'text-center',
                'fw-semibold',
              ]);
              this.deleted.emit(true);
              this.goBack();
            },
            error: (error) => {
              console.log(error);
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
              this.removeDeptSubscription.unsubscribe();
            },
          });
      }
    });
  }
  resetDeptKey() {
    this.spinner.start();
    this.resetKeySubsription = this.adminService
      .resetDeptKey({
        dept_id: this.department.dept_id,
      })
      .subscribe({
        next: (value) => {
          this.spinner.stop();
          this.snackBar.openSnackBar(value.message, 'OK', [
            'bg-success',
            'text-light',
            'text-center',
            'fw-semibold',
          ]);
          this.deptResetKey.emit(true)
        },
        error: (error) => {
          this.spinner.stop();
          console.log(error);
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
          this.resetKeySubsription.unsubscribe();
        },
      });
  }
}
