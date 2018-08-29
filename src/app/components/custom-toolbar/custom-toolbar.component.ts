import { SidenavService } from '../../services/sidenav/sidenav.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.css']
})
export class CustomToolbarComponent implements OnInit {

  constructor( private sidenavService: SidenavService) {
  }
  /**
  * @desc Toggle SideNav
  */
  toggleSideNav(){
    this.sidenavService.toggle();
  }
  
  sideNavOpened(){
    return this.sidenavService.getSidenav().opened;
  }
  ngOnInit() {
  }

}
