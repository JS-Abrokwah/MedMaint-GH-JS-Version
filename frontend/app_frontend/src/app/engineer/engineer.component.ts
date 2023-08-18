import { Component, OnInit } from '@angular/core';
import { EngineerService } from './services/eng-service/engineer.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/current-user/current-user';
import {
  faDashboard,
  faClipboardCheck,
  faBuildingUser,
  faScrewdriverWrench,
  faToolbox
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css'],
})
export class EngineerComponent implements OnInit {
  user!:CurrentUser
  dashactive: boolean = false;
  inventactive: boolean = false;
  deptactive: boolean = false;
  maintactive: boolean = false;
  personactive: boolean = false;
  currentRoute: any;

  dashboardIcon = faDashboard;
  inventoryIcon = faClipboardCheck;
  ppmIcon = faToolbox;
  cmIcon = faScrewdriverWrench;
  constructor(
    private engineerService: EngineerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.engineerService.getCurrentUser()
    this.onChangeRoute()
    this.engineerService.checktoken();
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

        case 'cm':
          this.dashactive = false;
          this.inventactive = false;
          this.deptactive = true;
          this.maintactive = false;
          this.personactive = false;
          break;

        case 'ppm':
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
