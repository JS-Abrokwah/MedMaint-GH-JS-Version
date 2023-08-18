import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { WarningPopupComponent } from 'src/app/shared/components/warning-popup/warning-popup.component';
import { MailSenderComponent } from 'src/app/shared/components/mail-sender/mail-sender.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminService } from '../../services/admin/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css'],
})
export class PersonnelComponent implements OnInit {
  plusIcon = faPlus;
  persons: User[] = [];
  allPersonsSubscription!: Subscription;
  removePersonSubscription!: Subscription;
  constructor(
    private dialog: MatDialog,
    private snackBar: MaterialsService,
    private adminService: AdminService,
    private spinner: NgxUiLoaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updatePersons();
  }

  updatePersons() {
    this.spinner.start();
    this.persons = [];
    this.allPersonsSubscription = this.adminService.getPersonnels().subscribe({
      next: (value) => {
        this.spinner.stop();
        value?.data?.forEach((element: any) => {
          this.persons.push(new User(element));
        });
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
        this.allPersonsSubscription.unsubscribe();
      },
    });
  }
  removePerson(person: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    dialogConfig.data = {
      ok: 'OK',
      cancel: 'Cancel',
      message:`All information about ${person.userName} will be removed from the system`
    };
    let dialogRef = this.dialog.open(WarningPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'OK') {
        this.spinner.start();
        this.removePersonSubscription = this.adminService
          .removePersonnel({
            email: person.email,
            user_id: person.userId,
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
              this.updatePersons();
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
              this.removePersonSubscription.unsubscribe();
            },
          });
      } else if (result === 'Cancel') {
        return;
      }
    });
  }
  mailPerson(person: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    dialogConfig.data = person;
    this.dialog.open(MailSenderComponent, dialogConfig);
  }
  viewPerson(person: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70vw';
    dialogConfig.maxHeight;
    dialogConfig.data = person;
    this.dialog.open(UserDetailComponent, dialogConfig);
  }
  addPerson() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth;
    dialogConfig.maxHeight;
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      if (value == 'OK') {
        this.updatePersons();
      }
    });
  }
}
