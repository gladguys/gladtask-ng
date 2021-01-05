import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  private sidenav: MatSidenav;

  constructor() {}

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
