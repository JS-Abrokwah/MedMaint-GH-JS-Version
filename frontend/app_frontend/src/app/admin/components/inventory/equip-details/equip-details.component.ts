import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'equip-details',
  templateUrl: './equip-details.component.html',
  styleUrls: ['./equip-details.component.css'],
})
export class EquipDetailsComponent implements OnInit {
  @Output() back: EventEmitter<boolean>= new EventEmitter();

  @Input() equipment!: any;
  tabs: string[] = ['Information', 'History Log', 'External Services'];
  backArrow=faArrowLeft
  constructor() {}
  ngOnInit() {}
  goBack(){
    this.back.emit(false)
  }
}
