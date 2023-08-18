import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MaterialsService } from '../../services/materials.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mail-sender',
  template: `
    <div
      class="container-fluid px-3 text-center"
      style="background-color: rgba(206, 244, 228, 1)"
    >
      <div class="row">
        <div class="col-10 text-center">
          <h3 mat-dialog-title class="fw-bold">Send Email</h3>
        </div>
        <div class="col-2 text-center">
          <span
            class="btn btn-sm btn-outline-success mt-3"
            (click)="cancelMail()"
            ><fa-icon [icon]="closeIcon" size="lg"></fa-icon
          ></span>
        </div>
      </div>
      <mat-dialog-content>
        <form [formGroup]="mailForm">
          <div class="row mb-3">
            <div class="col-sm-4 text-center">
              <label for="to" class="form-label">Subject:</label>
            </div>
            <div class="col-sm-8 text-center">
              <input
                type="text"
                class="form-control form-control-sm"
                formControlName="subject"
                [class.is-invalid]="subject?.invalid && subject?.touched"
              />
              <small
                *ngIf="subject?.invalid && subject?.touched"
                class="text-danger"
                >Subject field is required</small
              >
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4 text-center">
              <label for="to" class="form-label">To:</label>
            </div>
            <div class="col-sm-8 text-center">
              <input
                readonly
                type="text"
                class="form-control form-control-sm"
                formControlName="to"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4 text-center">
              <label for="to" class="form-label">Message:</label>
            </div>
            <div class="col-sm-8 text-center">
              <textarea
                cols="30"
                rows="5"
                class="form-control form-control-sm"
                placeholder="Type message here..."
                formControlName="message"
                [class.is-invalid]="message?.invalid && message?.touched"
              ></textarea>
              <small
                *ngIf="message?.invalid && message?.touched"
                class="text-danger"
                >Message field is required</small
              >
            </div>
          </div>
        </form>
        <div class="text-center">
          <button
            class="btn btn-sm btn-primary"
            (click)="sendMessage()"
            [disabled]="mailForm.invalid"
            style="--bs-btn-font-size: 0.75rem"
          >
            Send
          </button>
        </div>
      </mat-dialog-content>
    </div>
  `,
  styles: [],
})
export class MailSenderComponent implements OnInit {
  mailForm!: FormGroup;
  closeIcon = faTimes;
  sendMailSubscription!: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<MailSenderComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MaterialsService,
    private spinner: NgxUiLoaderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.mailForm = this.fb.group({
      to: [this.data.email],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  get to() {
    return this.mailForm.get(['to']);
  }
  get subject() {
    return this.mailForm.get(['subject']);
  }
  get message() {
    return this.mailForm.get(['message']);
  }

  sendMessage() {
    if (this.mailForm.invalid) {
      this.snackBar.openSnackBar('Some mail form fields are invalid', 'Ok', [
        'text-light',
        'bg-danger',
        'text-center',
      ]);
    } else {
      this.spinner.start();
      this.sendMailSubscription = this.userService
        .sendMail(this.mailForm.value)
        .subscribe({
          next: (value) => {
            this.spinner.stop();
            this.dialogRef.close('OK');
            this.snackBar.openSnackBar(value.message, 'OK', [
              'bg-success',
              'text-light',
              'text-center',
              'fw-semibold',
            ]);
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
            this.sendMailSubscription.unsubscribe();
          },
        });
    }
  }
  cancelMail() {
    this.dialogRef.close('Cancel');
  }
}
