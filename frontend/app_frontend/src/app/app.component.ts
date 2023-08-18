import { Component } from '@angular/core';
import { NgbCollapseConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_frontend';
  constructor(private collapsService:NgbCollapseConfig){
    this.collapsService.animation
  }
}
