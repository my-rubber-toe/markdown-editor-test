import { DocumentsService } from '../../services/documents/documents.service';
import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';import { AceEditorComponent } from 'ng2-ace-editor';
import {  fromEvent } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators'
import { MarkedParserService } from '../../services/marked-parser/marked-parser.service';
import { DomSanitizer, SafeHtml } from '../../../../node_modules/@angular/platform-browser';


@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.css']
})
export class PanelsComponent implements OnInit {

  convertedString: SafeHtml;
  normalString: string;
  count = false;
  @ViewChild('ace') editor: AceEditorComponent;
  
  @Input() currentDocContent: any;


  //Create observable with debounceTime of 1 second, to monitor input values
  //DO NOT USE 'input', otherwise the system will onlypick up values for input keyboard and not any other type of event
  private inputObs = fromEvent( document.getElementsByTagName('textarea')  ,'keyup').pipe(debounceTime(1000)).pipe(distinctUntilChanged());
  private nameObs = fromEvent( document.getElementsByTagName('input')  ,'keyup').pipe(debounceTime(1000)).pipe(distinctUntilChanged());

  constructor(
    private docService: DocumentsService,
    private md: MarkedParserService,
    private sanitizer: DomSanitizer
  ) { 
    
  }

  ngOnInit() {
    // Observable will update changes in the database
    this.editor.setTheme("dawn");
    this.editor.setMode("markdown");
    this.editor.setOptions({});
    this.inputObs.subscribe(
      (event)=>{
        
        this.docService.editDocument('content', this.normalString)
      }
    );  

    this.nameObs.subscribe(event=>{
      var newName = document.getElementsByTagName('input')[0].value;
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if(newName.match(format) || newName.length ==0){
       this.docService.docMessage("Document Name is invalid.\nName cannot be empty or contain any special characters.", 5000) 
      }else{
        this.docService.editDocument('name', newName)
      }
    });

    if(this.docService.getCurrentDoc()){
      this.updateOutput(this.docService.getCurrentDoc().content)
    }
  }

  /**
  * @desc Update Document text based on the value in the text area
  */
  public updateOutput(mdText){
    if(mdText){
      this.normalString = mdText 
      this.convertedString = this.sanitizer.bypassSecurityTrustHtml(this.md.convert(mdText));
    }
  }

  /**
  * @desc Get Current Document name
  * @returns Current Document name
  */
  public getDocumentName(){
    return this.docService.getCurrentDoc().name;
  }

  /**
  * @desc Get markdown text
  * @returns Current Document Text
  */
  public getDocumentText(){
    return this.docService.getCurrentDoc().content
  }
 
}
