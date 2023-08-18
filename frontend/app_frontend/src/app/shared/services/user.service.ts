import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentUser } from 'src/app/models/current-user/current-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;
  private currentUser!: CurrentUser;
  constructor(private httpClient: HttpClient) {}

  register(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/users/register`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  newClinician(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/users/new-clinician`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}/users/login`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  checkToken(token: any): Observable<any> {
    return this.httpClient.get(`${this.url}/users/check_token`, {
      headers: new HttpHeaders().set('authorization', token),
    });
  }

  sendMail(data: any): Observable<any> {
    this.currentUser = this.createCurrentUser();
    data.sender_name = this.currentUser.username;
    data.sender_role = this.currentUser.role;
    data.hospital_initials = this.currentUser.hospInitials;
    data.sender_email = this.currentUser.email;
    return this.httpClient.post(`${this.url}/users/${this.currentUser.hospId}/${this.currentUser.userId}/custom_mail`, data, {
      headers: new HttpHeaders().set('authorization', this.currentUser.token),
    });
  }

  createCurrentUser(): CurrentUser {
    return new CurrentUser(
      localStorage.getItem('token'),
      localStorage.getItem('user_id'),
      `${localStorage.getItem('first_name')} ${localStorage.getItem(
        'surname'
      )}`,
      localStorage.getItem('hosp_id'),
      localStorage.getItem('hosp_name'),
      localStorage.getItem('dept_id'),
      localStorage.getItem('dept_name'),
      localStorage.getItem('vendor_id'),
      localStorage.getItem('vendor_name'),
      localStorage.getItem('email'),
      localStorage.getItem('role')
    );
  }
}
