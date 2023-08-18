import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tabs-renderer',
  templateUrl: './tabs-renderer.component.html',
  styleUrls: ['./tabs-renderer.component.css'],
})
export class TabsRendererComponent implements OnInit {
  activeTab!: string;
  @Input() tabs!: string[];

  isMobileScreen: boolean = false;
  screenWidth: any;

  constructor() {}

  ngOnInit() {
    this.activeTab = 'tab-0';
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 750) {
      this.isMobileScreen = true;
    } else {
      this.isMobileScreen = false;
    }
  }

  switchTab(index: any) {
    this.activeTab = `tab-${index}`;
  }
}
