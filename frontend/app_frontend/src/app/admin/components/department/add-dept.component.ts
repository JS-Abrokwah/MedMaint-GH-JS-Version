import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../services/admin/admin.service';
import { Subscription } from 'rxjs';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-dept',
  template: `
    <div
      class="container h-100"
      style="background-color: rgba(206, 244, 228, 1);"
    >
      <mat-card class="text-center">
        <div class="row pt-1">
          <div class="col-10 text-center">
            <h3>Add Department</h3>
          </div>
          <div class="col-2 text-success text-center">
            <span
              class="btn btn-sm btn-outline-success"
              (click)="closeDialog()"
            >
              <fa-icon [icon]="closeIcon" size="lg"></fa-icon>
            </span>
          </div>
        </div>
        <div class="row text-center py-3">
          <form [formGroup]="newDept">
            <div class="row">
              <div class="col-3 text-center">
                <label for="dept_name" class="form-label">Name:</label>
              </div>
              <div class="col-9 text-start">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Type here..."
                  formControlName="dept_name"
                  [class.is-invalid]="deptName?.invalid && deptName?.touched"
                />
                <small
                  *ngIf="deptName?.invalid && deptName?.touched"
                  class="text-danger"
                  >Name field is required</small
                >
              </div>
            </div>
          </form>
        </div>
        <div class="text-center">
          <button
            class="btn btn-sm btn-primary"
            style="--bs-btn-font-size: 0.75rem"
            [disabled]="newDept.invalid"
            (click)="createDept()"
          >
            OK
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [],
})
export class AddDeptComponent {
  newDept!: FormGroup;
  closeIcon = faTimes;
  addDeptSubscription!: Subscription;
  constructor(
    private dialogRef: MatDialogRef<AddDeptComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MaterialsService,
    private router: Router,
    private spinner:NgxUiLoaderService
  ) {
    this.newDept = this.fb.group({
      dept_name: [null, Validators.required],
    });
  }

  get deptName() {
    return this.newDept.get(['dept_name']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createDept() {
    this.spinner.start()
    this.addDeptSubscription = this.adminService
      .addDepartment(this.newDept.value)
      .subscribe({
        next: (response) => {
          this.spinner.stop()
          this.dialogRef.close(this.data.ok)
          this.snackBar.openSnackBar(response.message, 'Ok', [
            'bg-success',
            'text-center',
            'text-light',
            'fw-semibold',
          ]);
        },
        error: (error) => {
          this.spinner.stop()
          this.dialogRef.close(this.data.err)
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
          this.addDeptSubscription.unsubscribe();
        },
      });
  }
}
