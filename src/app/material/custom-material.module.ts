import { NgModule } from '@angular/core';

import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
})
export class CustomMaterialModule { 
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/mdi.svg')); 
  }
}
