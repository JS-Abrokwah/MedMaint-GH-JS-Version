export class Equipment {
  public assetNumber!: string | null;
  public equipName!: string | null;
  public model!: string | null;
  public serialNumber!: string | null;
  public manufacturerId!: number | null;
  public manufacturerName!: string | null;
  public manufactureYeah!: string | null;
  public location!: string | null;
  public departmentId!: string | null;
  public departmentName!: string | null;
  public hospitalId!: string | null;
  public hospitalName!: string | null;
  public equipmentType!: string | null;
  public CountryOfOrigin!: string | null;
  public ppmInterval!: string | null;
  public lifespan!: string | null;
  public dateInstalled!: Date | null;
  public condition!: string | null;
  public remark!: string | null;
  public lastUpdated!: Date | null;
  public lastUpdatedBy!: string | null;
  public lastUpdatedById!: string | null;
  public vendorId!: string | null;
  public vendorName!: string | null;
  public vendorEmail!: string | null;
  public vendorPhone!: string | null;
  public vendorAddress!: string | null;
  public vendorCountry!: string | null;

  constructor(obj: any) {
    this.assetNumber = obj.asset_number || null;
    this.equipName = obj.equip_name || null;
    this.model = obj.model || null;
    this.serialNumber = obj.serial_number || null;
    this.manufacturerId = obj.manufacturer_id || null;
    this.manufactureYeah = obj.manufac_year || null;
    this.manufacturerName = obj.manufacturer_name || null;
    this.location = obj.location || null;
    this.departmentId = obj.dept_id || null;
    this.departmentName = obj.dept_name || null;
    this.hospitalId = obj.hosp_id || null;
    this.hospitalName = obj.hosp_name || null;
    this.equipmentType = obj.equip_type || null;
    this.CountryOfOrigin = obj.country_of_origin || null;
    this.ppmInterval = obj.ppm_interval || null;
    this.lifespan = obj.lifespan || null;
    this.dateInstalled = obj.date_installed || null;
    this.condition = obj.condition || null;
    this.remark = obj.remark || null;
    this.lastUpdated = obj.last_updated || null;
    this.lastUpdatedBy =
      `${obj.first_name} ${obj.surname} ${
        obj.other_name ? obj.other_name : ''
      }` || null;
    this.lastUpdatedById = obj.last_updated_by || null;
    this.vendorId = obj.vendor_id || null;
    this.vendorName = obj.vendor_name || null;
    this.vendorAddress = obj.address || null;
    this.vendorEmail = obj.vendor_email || null;
    this.vendorPhone = obj.vendor_phone || null;
    this.vendorCountry = obj.vendor_country || null;
  }
}
