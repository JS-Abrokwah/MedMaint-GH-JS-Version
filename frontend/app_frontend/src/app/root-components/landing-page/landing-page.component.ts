import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  keyboard: boolean = false;
  pauseOnHover: boolean = false;
  pauseOnFocus: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  getStarted() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.panelClass = ['dailogBg'];
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
