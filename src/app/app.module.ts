import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material/custom-material.module';
import { HttpModule } from '@angular/http';
import { CustomToolbarComponent } from './components/custom-toolbar/custom-toolbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';

import { MatIconRegistry, MatIconModule } from '@angular/material';
import { PanelsComponent } from './components/panels/panels.component';
import { MarkedParserService } from './services/marked-parser/marked-parser.service';

//Dependencies
import { AceEditorModule } from 'ng2-ace-editor';
import { SidenavService } from './services/sidenav/sidenav.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from './services/session/session.service';
import { DocumentsService } from './services/documents/documents.service';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LocationStrategy, HashLocationStrategy } from '../../node_modules/@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    CustomToolbarComponent,
    NotFoundComponent,
    PanelsComponent,
    SidenavComponent,
    DocumentsComponent,
    TruncatePipe   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    CustomMaterialModule,
    AceEditorModule,
    
    //Alwas Last
    AppRoutingModule

  ],
  providers: [
    MarkedParserService, 
    SidenavService,
    SessionService,
    DocumentsService,
    CookieService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
