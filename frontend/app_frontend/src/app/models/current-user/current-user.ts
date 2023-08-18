export class CurrentUser {
  public userInitials: any;
  public hospInitials: any;
  constructor(
    public token: any,
    public userId: string | null,
    public username: string | null,
    public hospId: string | null,
    public hospName: string | null,
    public deptId: string | null,
    public deptName: string | null,
    public vendorId: string | null,
    public vendorName: string | null,
    public email: string | null,
    public role: string | null
  ) {
    this.token = 'Bearer_'+this.token
    if (this.username !== 'null null') {
      this.userInitials = this.username
        ?.split(' ')
        .map((word: any) => word.charAt(0).toUpperCase())
        .join('');
    } else {
      this.username = null;
    }
    if (this.hospName !== 'null') {
      this.hospInitials =this.hospName?.split(' ')
      .map((word: any) => word.charAt(0).toUpperCase())
      .join('');
    }
  }
}
