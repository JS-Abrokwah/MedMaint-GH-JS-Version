import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddDeptComponent } from './add-dept.component';
import { Department } from 'src/app/models/department/department';
import { AdminService } from '../../services/admin/admin.service';
import { Subscription } from 'rxjs';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  deptListSubscription!: Subscription;
  plusIcon = faPlus;

  isDeptDetails: boolean = false;
  viewDepartment!: Department;
  constructor(private dialog: MatDialog, private adminService: AdminService,private snackbar:MaterialsService,private router:Router) {}

  ngOnInit(): void {
    this.updateDepartments();
  }
  ngOnDestroy(): void {
    this.deptListSubscription.unsubscribe();
  }
  addDept() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '165px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      ok: 'OK',
      err: 'Error',
    };
    const addDeptDialog = this.dialog.open(AddDeptComponent, dialogConfig);
    addDeptDialog.afterClosed().subscribe((result) => {
      if (result == 'OK') {
        this.updateDepartments();
      } else if (result == 'Error') {
        console.log(result);
      }
    });
  }

  updateDepartments() {
    this.departments = [];
    this.deptListSubscription = this.adminService.getDepartments().subscribe({
      next: (value) => {
        this.createDeptArray(value);
      },
      error: (error) => {
        if (error.error.redirect){
          this.router.navigate([error.error.redirect])
          this.snackbar.openSnackBar(error.error.message+'. Login to continue','OK',['bg-danger','text-light','text-center','fw-semibold'])
        }else{
          this.snackbar.openSnackBar(error.error.message,'OK',['bg-danger','text-light','text-center','fw-semibold'])
        }
      }
    });
  }
  createDeptArray(obj: any) {
    obj?.data?.forEach((value: any) => {
      this.departments.push(new Department(value));
    });
  }
  viewDeptDetails(dept: Department) {
    this.viewDepartment = dept;
    this.isDeptDetails = true;
  }

  onBack($event: boolean) {
    this.isDeptDetails = $event;
  }
  deptDeleted($event:boolean){
    if($event){
      this.updateDepartments()
    }
  }
  deptKeyReset($event:boolean){
    if($event){
      this.updateDepartments()
    }
  }
}
