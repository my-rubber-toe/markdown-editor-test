import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
    
  public sessionObs: Observable<Object>;
  public docsObs: Observable<Object>;
  private customHeaders = new HttpHeaders();
    

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
  ) {  
    this.customHeaders.append('Content-Type','application/json');
   }
   
  
  getDocuments(sessionId: string){
   
    return this.http.post('/api/get-documents',{sId: sessionId},{headers: this.customHeaders});
  }

  newDocument(sessionId: string){
    return this.http.post('/api/new-document',{sId: sessionId}, {headers: this.customHeaders});
  }

  updateDocument(docId: string, prop: string, value: string){
    var body = {
      id: docId,
      docData:  value,
      property: prop
    }
    return this.http.put('/api/update-document',body,{headers: this.customHeaders})
  }

  deleteDocument(doc: any){
    return this.http.post('/api/delete-document', doc,{headers: this.customHeaders})
  }

  convertToPdf(currDoc: any){
    return this.http.post('/api/convert-pdf',{id: currDoc.id},{headers: this.customHeaders, responseType:'arraybuffer'});
  }

  previewDoc(docType: string, docId: string) {
    return this.http.post('/api/preview-document',{id: docId, type: docType},{headers: this.customHeaders})
  }

  newSession(){
    return  this.http.post('/api/new-session',{}, {headers: this.customHeaders});
  }
  

}
