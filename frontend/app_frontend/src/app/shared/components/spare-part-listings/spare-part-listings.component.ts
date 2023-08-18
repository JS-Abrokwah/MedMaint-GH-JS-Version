import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'spare-part-listings',
  templateUrl: './spare-part-listings.component.html',
  styleUrls: ['./spare-part-listings.component.css']
})
export class SparePartListingsComponent {
  @Input() tableColumn!: string[]
  @Input() tableData!: any[]
 


  @Output() onView!: EventEmitter<any>;

  @Output() onEdit!: EventEmitter<any>;

  constructor() {
   
  }

  ngOnInit(): void {
    setTimeout(() => {
      $('#sparepartListings').DataTable({
        pagingType: 'simple_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [10, 25, 50, 100],
        dom: 'Bfrtip',
      });
      
      $('.dt-buttons').addClass('text-start pt-3')
      $('.dt-button').addClass('btn btn-sm mx-2')
      $('.dt-button').removeClass('dt-button')
      $('.buttons-copy').addClass('btn-secondary')
      $('.buttons-excel').addClass('btn-success')
      $('.buttons-csv').addClass('btn-primary')
      $('.buttons-print').addClass('btn-info')
      $('.buttons-print').text(`PDF`)
    }, 10);

    this.onEdit = new EventEmitter();
    this.onView = new EventEmitter();

  }

  viewDetailEvent(equip: any) {
    this.onView.emit(equip);
  }
  editEvent(equip: any) {
    this.onEdit.emit(equip);
  }

}
