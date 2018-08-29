import { SessionService } from '../session/session.service';
import { BackendService } from '../backend-service/backend.service';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { MarkedParserService } from '../marked-parser/marked-parser.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';


interface Doc{
  name:string,
  content:string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
 
  
  public allDocuments: Array<Doc> = new Array<Doc>();
  private currentDoc: Doc = {} as Doc;
  

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private md: MarkedParserService,
    public snackBar: MatSnackBar
  ) { }

  docMessage(message: string, time = 2000){
    this.snackBar.open(message,'',{duration:time});
  }
  reloadDocuments(){
    if(this.session.getSession()){
      this.backend.getDocuments(this.session.getSession()).subscribe((docs: Array<Doc>)=>{
        this.allDocuments = docs;
      },
      (error) =>{alert("Error reloading documents: " + error)}
    )}
  }

  downloadDocument(type: string) {
    return new Promise((resolve, reject)=>{
      var docContent = this.currentDoc.content;
      if(type == 'html'){
        docContent = this.md.convert(this.currentDoc.content);
        const blob = new Blob([docContent], { type: 'text/plain' });
        saveAs(blob, this.currentDoc.name +'.'+ type);
        resolve(true);
      }
      else if(type =='md'){
        const blob = new Blob([docContent], { type: 'text/plain' });
        saveAs(blob, this.currentDoc.name +'.'+ type);
        resolve(true);
      }else if(type == 'pdf'){
        this.backend.convertToPdf(this.currentDoc)
      }
      
    })
  }

  getDocuments(){
    if(this.session.getSession()){
      this.backend.getDocuments(this.session.getSession()).subscribe((docs: Array<Doc>)=>{
        if(docs.length == 0){
          //set default document since new session is created
          this.createDocument();
        }else{
          
          // fill all the documents and set the most recent document as the currentDoument
          this.allDocuments = docs;
          this.currentDoc = docs[0];
        }
      },

      (error) =>{alert("Error creating document: " + error)}
    
    )

    }
  }

  setCurrentDoc(doc: Doc){
    this.currentDoc = doc;
  }

  getCurrentDoc(){
    return this.currentDoc;
  }

  createDocument(){
    this.backend.newDocument(this.session.getSession()).subscribe(
      (response: any) =>{
      
        this.allDocuments.push(response);
        this.currentDoc = response;

        this.snackBar.open('New document created!' ,'',{duration:2000});
        // console.log(this.allDocuments);
      },

      (error)=>{alert("Unable to create new Document!")}
    )
  }

  //Remove document from list, if only one document remains then this.allDocuments[0] is the currentDocument
  removeDocument(doc: Doc){
    this.backend.deleteDocument(doc).subscribe((response)=>{
      
      this.allDocuments.splice(this.allDocuments.indexOf(doc),1);
      this.currentDoc = this.allDocuments[0];
      this.snackBar.open('Deleted: ' + doc.name ,'',{duration:2000});
    })
  }

  // Edit content based on the 'prop' value
  editDocument(prop: string, val: string){
    
    this.backend.updateDocument(this.currentDoc.id, prop, val).subscribe((response: any)=>{

      if(prop == 'content'){
        this.currentDoc.content =  response.value;

      }else if(prop =='name'){
        if(response.value == 'undefined' || response.value == null || response.value == "")
          this.currentDoc.name = "Untitled Document";
        }else{
        this.currentDoc.name = response.value;
        }
      this.reloadDocuments();  
    })
  }
}
