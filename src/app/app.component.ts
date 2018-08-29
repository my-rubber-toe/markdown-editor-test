import { SessionService } from './services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './services/documents/documents.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private docService: DocumentsService,
    private cookies: CookieService,

  ) {
  }

  ngOnInit() {

    this.sessionService.verifySession().subscribe((res: any)=>{
      this.cookies.set('markdown-session', res.id);
      this.sessionService.setSessionId(res.id);
      this.docService.getDocuments();
    }); 
  
 
  }
}
