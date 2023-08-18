import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/models/current-user/current-user';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  private apiUrl = environment.apiUrl;
  private currentUser!: CurrentUser;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {this.getCurrentUser()}
  private getCurrentUser(){
    this.currentUser = this.userService.createCurrentUser();
  }
  addDepartment(data: any): Observable<any> {
    this.getCurrentUser()
    return this.httpClient.post(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/add-dept`,
      data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  getDepartments():Observable<any> {
    this.getCurrentUser()
    return this.httpClient.get(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/department_listings`,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }
  removeDepartment(data: any): Observable<any> {
    this.getCurrentUser()
    return this.httpClient.post(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/remove_dept`,
      data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  resetDeptKey(data:any):Observable<any>{
    this.getCurrentUser()
    return this.httpClient.patch(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/reset-deptKey`,
      data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  addEquipment(data:any):Observable<any>{
    this.getCurrentUser()
    return this.httpClient.post(
      `${this.apiUrl}/inventory/${this.currentUser.hospId}/${this.currentUser.userId}/add_equipment`,
      data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  editEquipment(data:any):Observable<any>{
    this.getCurrentUser()
    return this.httpClient.patch(
      `${this.apiUrl}/inventory/${this.currentUser.hospId}/${this.currentUser.userId}/update_equipment_info`,
      data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }
  getEquipments():Observable<any>{
    this.getCurrentUser()
    return this.httpClient.get(
      `${this.apiUrl}/inventory/${this.currentUser.hospId}/${this.currentUser.userId}/equipment_listings`,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  addSparePart(data:any){
    this.getCurrentUser()
    return this.httpClient.post(
      `${this.apiUrl}/inventory/${this.currentUser.hospId}/${this.currentUser.userId}/new_spare-part`,data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  getSpareParts(){
    this.getCurrentUser()
    return this.httpClient.get(
      `${this.apiUrl}/inventory/${this.currentUser.hospId}/${this.currentUser.userId}/spare-part_listings`,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  getPersonnels():Observable<any>{
    return this.httpClient.get(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/all_users`,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }

  addPersonnel(data:any):Observable<any>{
    data.admin_email=this.currentUser.email;
    return this.httpClient.post(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/add-user`,data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }
  removePersonnel(data:any):Observable<any>{
    data.admin_email=this.currentUser.email;
    return this.httpClient.post(
      `${this.apiUrl}/users/${this.currentUser.hospId}/${this.currentUser.userId}/remove-user`,data,
      {
        headers: new HttpHeaders().set('authorization', this.currentUser.token),
      }
    );
  }
}
