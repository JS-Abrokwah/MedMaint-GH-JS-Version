import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ae-dashboard',
  templateUrl: './a-e-dashboard.component.html',
  styleUrls: ['./a-e-dashboard.component.css'],
})
export class AEDashboardComponent implements OnInit {
  @Input() title!: string;
  constructor() {}

  ngOnInit(): void {}
}
