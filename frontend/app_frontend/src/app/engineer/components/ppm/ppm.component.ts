import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ppm',
  templateUrl: './ppm.component.html',
  styleUrls: ['./ppm.component.css'],
})
export class PpmComponent implements OnInit {
  isPageOne: boolean = true;
  backIcon = faArrowLeft;
  pageName: string="Dashboard"
  constructor() {}

  ngOnInit(): void {}
  changeToPage(page: any) {
    this.isPageOne = page == 'one' ? true : false;
    this.pageName = page == 'one' ? 'Dashboard' : 'Tracker';
  }
}
