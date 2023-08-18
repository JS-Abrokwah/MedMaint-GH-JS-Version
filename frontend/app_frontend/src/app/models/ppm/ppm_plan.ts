import { PpmEquipment } from '../ppm-equipment/ppm-equipment';

export class PpmPlan {
  public plan_id!: string;
  public dept_name!: string;
  public due_date!: Date;
  public status!: string;
  public planner_id!: string;
  public equipments!: PpmEquipment[];
  constructor(obj: any) {}
}
