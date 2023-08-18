import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { EngineerService } from '../../services/eng-service/engineer.service';
import { Equipment } from 'src/app/models/equipment/equipment';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MaterialsService } from 'src/app/shared/services/materials.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  eyeIcon = faEye;
  getEquipSubscription!:Subscription
  equipments: Equipment[]=[];
  activities!: any[];
  events: any[] = [
    {
      ppm_id: '',
      due_date: '',
    },
  ];
  piechartLabels = [
    'Faulty Equipment',
    'Equipment under repair',
    'Functional Equipment',
    'Uninstalled',
  ];
  piechartTitle = 'Equipment Condition Summary';
  pieChartData!: number[];
  piechartColors = ['#db5656', '#ec9e3f', '#3e7ae2', '#99ca36'];
  constructor(private engneerService: EngineerService,private router:Router,private spinner:NgxUiLoaderService,private snackBar:MaterialsService) {}

  ngOnInit(): void {
    this.getEquipList();
    this.activities = [
      {
        title: 'PPM',
        // equipment should be equipment type
        equipment: {
          asset_number: 'qyu34u3',
        },
        // user should be a user type
        user: {
          userName: 'Kofi Boat',
        },
        start_date: new Date().toLocaleDateString(),
        status: 'Pending parts approval',
      },
    ];
  }

  getEquipList() {
    this.getEquipSubscription=this.engneerService.getEquipments().subscribe({
      next: (value:any) => {
        this.spinner.stop();
        value?.data?.forEach((equip:any)=>{this.equipments.push(new Equipment(equip))})
        this.pieChartData = this.sortEquipOncondition(this.equipments)
        this.initDataTable()
      },
      error: (error) => {
        this.spinner.stop();
        if (error.error.redirect) {
          this.snackBar.openSnackBar(
            error.error.message + '. Log in to continue',
            'Ok',
            ['bg-danger', 'text-light', 'text-center', 'fw-semibold']
          );
          this.router.navigate([error.error.redirect]);
        } else {
          this.snackBar.openSnackBar(error.error.message, 'Ok', [
            'bg-danger',
            'text-light',
            'text-center',
            'fw-semibold',
          ]);
        }
      },
      complete: () => {
        this.getEquipSubscription.unsubscribe();
      },
    });
    
  }

  initDataTable() {
    $('#dataTable').DataTable().clear().destroy(false);
    setTimeout(() => {
      $('#deptTable').DataTable({
        pagingType: 'simple_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [10, 25, 50, 100],
        dom: 'Bfrtip',
      });

      $('.dt-buttons').addClass('text-start pt-3');
      $('.dt-button').addClass('btn btn-sm mx-2');
      $('.dt-button').removeClass('dt-button');
      $('.buttons-copy').addClass('btn-secondary');
      $('.buttons-excel').addClass('btn-success');
      $('.buttons-csv').addClass('btn-primary');
      $('.buttons-print').addClass('btn-info');
      $('.buttons-print').text(`PDF`);
    }, 1);
  }
  sortEquipOncondition(data: any[]): number[] {
    let functional: number = 0,
      faulty: number = 0,
      underRepair: number = 0,
      uninstalled: number = 0;
    data.forEach((equip: any) => {
      switch (equip.condition) {
        case 'Faulty':
          faulty++;
          break;
        case 'Functional':
          functional++;
          break;
        case 'Under Repair':
          underRepair++;
          break;
        case 'Uninstalled':
          uninstalled++;
          break;
      }
    });
    // console.log('piechart data',[faulty, underRepair, functional, uninstalled]);
    return [faulty, underRepair, functional, uninstalled];
  }
  showActivity(activity: any) {
    console.log(activity);
  }
  showEquipment(equipment: any) {
    console.log(equipment);
  }
  showEvent(event: any) {
    console.log(event);
  }
}
