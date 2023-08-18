import { Component, OnInit } from '@angular/core';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { CurrentUser } from '../models/current-user/current-user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-clinician',
  templateUrl: './clinician.component.html',
  styleUrls: ['./clinician.component.css']
})
export class ClinicianComponent implements OnInit {

  dashIcon=faDashboard
  user!:CurrentUser
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

}
