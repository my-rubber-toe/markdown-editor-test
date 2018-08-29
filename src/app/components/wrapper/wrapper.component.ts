import { DocumentsService } from '../../services/documents/documents.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private docService: DocumentsService
  ) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav); // Set Sidenav
  }

  /**
  * @desc Create New Document
  */
  newDocument(){
    this.docService.createDocument();
  }

}
