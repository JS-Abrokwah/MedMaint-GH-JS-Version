import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'equip-card',
  templateUrl: './equip-card.component.html',
  styleUrls: ['./equip-card.component.css'],
})
export class EquipCardComponent implements OnInit {
  @Input() equipment!: any[];
  constructor() {}
  ngOnInit(): void {
    this.equipment = [
      {
        name: 'Anaethesia machine',
        location: 'Theater 4',
        assetNumber: 'yu4574',
      },
      {
        name: 'Anaethesia machine',
        location: 'Theater 4',
        assetNumber: 'yu4574',
      },
      {
        name: 'Anaethesia machine',
        location: 'Theater 4',
        assetNumber: 'yu4574',
      },
      {
        name: 'Anaethesia machine',
        location: 'Theater 4',
        assetNumber: 'yu4574',
      },
      {
        name: 'Anaethesia machine',
        location: 'Theater 4',
        assetNumber: 'yu4574',
      },
    ];
  }

  reportEquip(equip:any){
    alert('This was an equipment report event')
  }
}
