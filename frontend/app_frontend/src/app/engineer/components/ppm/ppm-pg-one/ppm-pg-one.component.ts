import { Component } from '@angular/core';

@Component({
  selector: 'ppm-page-one',
  templateUrl: './ppm-pg-one.component.html',
  styleUrls: ['./ppm-pg-one.component.css'],
})
export class PpmPgOneComponent {
  tabs: string[] = ['Catalog', 'Planning', 'Schedule', 'Reports'];

  overduePPM: any[] = [{ plan_id: 's123sfg', due_date: new Date().toLocaleDateString() }];
  duePPM: any[] = [
    {
      plan_id: 's123sfg',
      dept_name: 'Mental Health',
      due_date: new Date(),
      status: 'pending approval',
      planner: 'KSaderm-ff',
      equipments: [
        {
          plan_id: 's123sfg',
          equip_id: 'euyeiro',
          equip_name: 'Patient Monitor',
          activities: 'uieyuier eriio eio uiefuif i fuifiueruiiore ioerfiofd ',
          spare_parts: [
            {
              plan_id: 's123sfg',
              part_name: 'Battery',
              quantity: 2,
              unit_cost: 12.5,
              equip_id: 'euyeiro',
            },
          ],
        },
        {
          plan_id: 's123sfg',
          equip_id: 'euyeiro',
          equip_name: 'Ventilator',
          activities: 'uieyuier eriio eio uiefuif i fuifiueruiiore ioerfiofd ',
          spare_parts: [
            {
              plan_id: 's123sfg',
              part_name: 'Battery',
              quantity: 3,
              unit_cost: 12.5,
              equip_id: 'euyeiro',
            },
            {
              plan_id: 's123sfg',
              part_name: 'Battery',
              quantity: 2,
              unit_cost: 12.5,
              equip_id: 'euyeiro',
            },
          ],
        },
      ],
    },
  ];
}
