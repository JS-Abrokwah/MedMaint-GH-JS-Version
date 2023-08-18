import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/models/current-user/current-user';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class EngineerService {
  private tokenCheckSubscription!: Subscription;
  private currentUser!: CurrentUser;
  private apiUrl = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private snackBar: MaterialsService,
  ) {}

  checktoken() {
    this.currentUser = this.userService.createCurrentUser();
    this.tokenCheckSubscription;
    if (this.currentUser?.token) {
      this.tokenCheckSubscription = this.userService
        .checkToken(this.currentUser?.token)
        .subscribe({
          next: (response) => {
            if (this.currentUser.role == 'Engineer') {
              this.router.navigate(['/engineer/dashboard']);
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
            this.tokenCheckSubscription.unsubscribe();
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
  getCurrentUser(): CurrentUser {
    return this.userService.createCurrentUser();
  }

  getEquipments(): Observable<any> {
    this.currentUser = this.getCurrentUser();
    return this.httpClient
      .get(
        `${this.apiUrl}/inventory/${this.currentUser.hospId}/${this.currentUser.userId}/equipment_listings`,
        {
          headers: new HttpHeaders().set(
            'authorization',
            this.currentUser.token
          ),
        }
      )
  }
}
