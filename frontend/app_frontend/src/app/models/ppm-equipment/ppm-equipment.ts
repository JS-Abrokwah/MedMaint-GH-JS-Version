import { SparePart } from '../spare-part/spare-part';

export class PpmEquipment {
  public plan_id!: string;
  public equip_id!: string;
  public activities!: string;
  public equip_name!:string;
  public spare_parts!: SparePart[];
  constructor(obj: any) {}
}
