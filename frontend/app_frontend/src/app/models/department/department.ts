export class Department {
  public dept_id!: string |null;
  public dept_name!: string|null;
  public dept_key!: string|null;

  constructor(obj: any) {
    this.dept_id = obj?.dept_id || null
    this.dept_name = obj?.dept_name || null
    this.dept_key = obj?.dept_key || null

  }
}
