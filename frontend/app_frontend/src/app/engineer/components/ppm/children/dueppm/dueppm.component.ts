import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dueppm',
  templateUrl: './dueppm.component.html',
  styles: [],
})
export class DueppmComponent implements OnInit {
  
  @Input() ppmPlan: any = {};
  constructor() {}
  ngOnInit(): void {}
}
