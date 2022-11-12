import { Component, OnInit } from '@angular/core';

interface Menu {
  label: string,
  icon: string,
  routerLink: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menus: Menu[] = [];
  collapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.menus = [
      {
        label: 'Dashboard',
        icon: 'assets/home.png',
        routerLink: 'dashboard'
      },
      {
        label: 'Collection',
        icon: 'assets/briefcase.png',
        routerLink: 'collection'
      },
      {
        label: 'Dates',
        icon: 'assets/calendar.png',
        routerLink: 'dates'
      },
    ]
  }

}
