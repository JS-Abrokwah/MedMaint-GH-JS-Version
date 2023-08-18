export class User {
  userId!: string | null;
  userName!: string | null;
  email!: string | null;
  phone!: string | null;
  rank!: string | null;
  role!: string | null;
  deptId!: string | null;
  deptName!: string | null;
  vendorId!: string | null;
  vendorName!: string | null;
  vendorEmail!: string | null;
  vendorPhone!: string | null;
  vendorAddress!: string | null;
  vendorCountry!: string | null;
  dutyPost!: string | null;
  profession!: string | null;
  profilePhoto!: any;

  constructor(obj: any) {
    this.userId = obj.user_id || null;
    this.userName =
      obj.first_name + ' ' + obj.surname + ' ' + `${obj.other_name || ''}` ||
      null;
    this.email = obj.email || null;
    this.phone = obj.phone || null;
    this.rank = obj.rank || null;
    this.role = obj.role || null;
    this.deptId = obj.dept_id || null;
    this.deptName = obj.dept_name || null;
    this.vendorId = obj.vendor_id || null;
    this.vendorName = obj.vendor_name || null;
    this.vendorEmail = obj.vendor_email || null;
    this.vendorPhone = obj.vendor_phone || null;
    this.vendorAddress = obj.address || null;
    this.vendorCountry = obj.vendor_country || null;
    this.dutyPost = obj.duty_post || null;
    this.profession = obj.profession || null;
    this.profilePhoto = obj.profile_photo || null;
  }
}
