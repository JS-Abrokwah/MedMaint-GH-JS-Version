import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/current-user/current-user';
import { UserService } from '../shared/services/user.service';
import {
  faDashboard,
  faClipboardCheck,
  faBuildingUser,
  faScrewdriverWrench,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { MaterialsService } from '../shared/services/materials.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  dashactive: boolean = false;
  inventactive: boolean = false;
  deptactive: boolean = false;
  maintactive: boolean = false;
  personactive: boolean = false;
  currentRoute: any;
  dashboardIcon = faDashboard;
  inventoryIcon = faClipboardCheck;
  departmentIcon = faBuildingUser;
  maintenanceIcon = faScrewdriverWrench;
  personnelIcon = faUserGroup;

  tokenSubscription!: Subscription;
  user!: CurrentUser;
  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MaterialsService
  ) {}

  ngOnInit(): void {
    this.onChangeRoute();
    this.user = this.userService.createCurrentUser();
    if (this.user?.token) {
      this.tokenSubscription = this.userService
        .checkToken(this.user?.token)
        .subscribe({
          next: (response) => {
            if (this.user.role == 'Admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/welcome']);
            }
          },
          error: (error) => {
            if (error.status == 302 && error.error.redirect) {
              this.router.navigate(['/welcome']);
              setTimeout(() => {
                this.snackBar.openSnackBar(
                  `${error.error.message}  Login to continue`,
                  'OK',
                  ['bg-danger', 'text-light', 'fw-semibold']
                );
              }, 1000);
            }
          },
          complete: () => {
            this.tokenSubscription.unsubscribe();
          },
        });
    } else {
      this.router.navigate(['/welcome']);
      setTimeout(() => {
        this.snackBar.openSnackBar('Please login to continue', 'OK', [
          'text-light',
          'bg-danger',
          'fw-semibold',
        ]);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    // this.tokenSubscription.unsubscribe();
  }
  onChangeRoute() {
    setTimeout(() => {
      this.currentRoute = this.router.url.split('/');

      switch (this.currentRoute[this.currentRoute?.length - 1]) {
        case 'dashboard':
          this.dashactive = true;
          this.inventactive = false;
          this.deptactive = false;
          this.maintactive = false;
          this.personactive = false;
          break;

        case 'inventory':
          this.dashactive = false;
          this.inventactive = true;
          this.deptactive = false;
          this.maintactive = false;
          this.personactive = false;
          break;

        case 'department':
          this.dashactive = false;
          this.inventactive = false;
          this.deptactive = true;
          this.maintactive = false;
          this.personactive = false;
          break;

        case 'maintenance':
          this.dashactive = false;
          this.inventactive = false;
          this.deptactive = false;
          this.maintactive = true;
          this.personactive = false;
          break;

        case 'personnel':
          this.dashactive = false;
          this.inventactive = false;
          this.deptactive = false;
          this.maintactive = false;
          this.personactive = true;
          break;
      }
    }, 100);
  }
}
