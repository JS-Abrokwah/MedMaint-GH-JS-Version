import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'warning-popup',
  template: `
    <div
      class="container-fluid py-3 text-center"
      style="background-color: rgba(206, 244, 228, 1)"
    >
      <div mat-dialog-content>
        <span class="text-warning">
          <fa-icon [icon]="warnIcon" size="4x"></fa-icon>
        </span>
        <p class="fw-semibold  mt-3">This action cannot be reversed !!!</p>
        <p class="fw-semibold text-danger  mt-3">{{data.message}}</p>
        <p class="fw-semibold  mt-1 mb-3">Do you want to proceed?</p>
      </div>
      <div class="text-center">
        <button
          class="btn btn-sm btn-success mx-3"
          [mat-dialog-close]="data.ok"
          style="bs-btn-font-size: 0.85rem"
        >
          OK
        </button>
        <button
          class="btn btn-sm btn-secondary mx-3"
          [mat-dialog-close]="data.cancel"
          style="--bs-btn-font-size: 0.85rem"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class WarningPopupComponent {
  warnIcon = faTriangleExclamation;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {} 
}
