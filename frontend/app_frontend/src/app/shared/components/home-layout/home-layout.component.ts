import { Component, HostListener, Input, OnInit,OnDestroy } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  faBell,
  faBars,
  faEllipsisV,
  faCaretDown,
  faTimes,
  faSignOutAlt,
  faFlag
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/models/current-user/current-user';

@Component({
  selector: 'home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
})
export class HomeLayoutComponent implements OnInit {
  @Input() user!: CurrentUser

  notifications: any[] = [
    // TODO: this should be a backend data
    {
      title: 'Machine',
      content:
        'uiytri reiuor dfjknsfgn uiehtigtriu fdsjkfdjk ruithuitr uirjkg uihiuio',
      flag: 'danger',
      sender:'system',
      timestamp:new Date().toLocaleDateString()+' ; '+ new Date().toLocaleTimeString()
    },
  ]; // must Contains notification objects from databse
  notificationCount = 1;
  noNewNotification = this.notificationCount == 0;

  date: Date = new Date();
  today: string = `${this.date.toDateString()}`;
  isCollapsed: boolean = false;
  isSidenavCollapsed:boolean=false
  isMobileScreen: boolean = false;
  openProfile:boolean=false;
  screenWidth: any;
  bellIcon = faBell;
  barIcon = faBars;
  moreIcon = faEllipsisV;
  caretIcon = faCaretDown;
  closeIcon = faTimes;
  logoutIcon = faSignOutAlt;
  flagIcon=faFlag

  constructor(private offcanvasService: NgbOffcanvas,  private router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 750) {
      this.isMobileScreen = true;
      this.isCollapsed = true;
      this.isSidenavCollapsed = true
    } else {
      this.isMobileScreen = false;
      this.isCollapsed = false;
      this.isSidenavCollapsed = false
    }
  }

  ngOnDestroy():void{
    if(this.offcanvasService.hasOpenOffcanvas()){
      this.offcanvasService.dismiss();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 750) {
      this.isMobileScreen = true;
      this.isCollapsed = true;
    } else {
      this.isMobileScreen = false;
      this.isCollapsed = false;
    }
  }

  handleLogOut() {
    if(this.offcanvasService.hasOpenOffcanvas()){
      this.offcanvasService.dismiss();
    }
    localStorage.clear();
    this.router.navigate(['/']);
  }

  toggleNotifications(notify: any) {
    if (this.notificationCount > 0) {
      this.notificationCount = 0;
    }
    this.offcanvasService.open(notify, {
      backdrop: false,
      scroll: true,
      position: 'end',
      panelClass: 'bg-secondary',
    });
  }
  feedbackForm(){
    this.router.navigate(['/user-feedback'])
  }
}
