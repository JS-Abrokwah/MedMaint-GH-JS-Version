import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cli-maintenance',
  templateUrl: './cli-maintenance.component.html',
  styleUrls: ['./cli-maintenance.component.css']
})
export class CliMaintenanceComponent implements OnInit {
  @Input() equipment!: any[];
  @Input() inComingRequest!: any[];
  constructor() {}
  ngOnInit(): void {
    this.inComingRequest = [
      
    ]
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

