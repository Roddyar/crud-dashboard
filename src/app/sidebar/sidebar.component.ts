import {Component, OnInit} from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/table', title: 'Personas', icon: 'nc-badge', class: ''},
  {path: '/dashboard', title: 'Estadísticas', icon: 'nc-bank', class: ''},
  // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
