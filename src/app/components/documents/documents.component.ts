import { DocumentsService } from '../../services/documents/documents.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  public docs;

  constructor(
    private docService: DocumentsService
  ) { 
  }

  ngOnInit() {
  }

  /**
  * @desc Get User Documents
  * @returns User Documents
  */
  userDocs(){
    return this.docService.allDocuments;
  }

  /**
  * @desc Get User Documents
  * @returns User Documents
  */
  setCurrentDocument(doc: any){
    this.docService.setCurrentDoc(doc);
    document.getElementsByTagName('input')[0].setAttribute('value',doc.name)
  }

  /**
  * @desc Get Current working Document
  * @returns Current Document
  */
  getCurrentDocument(){
    return this.docService.getCurrentDoc();
  }

  /**
  * @desc Delete Selected Document
  */
  deleteDocument(doc){
       
    swal({
      title: 'Are you sure you want to delete:\n' + doc.name,
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006064',
      cancelButtonColor: '#B71C1C',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.docService.removeDocument(doc);
      }
    })
    
  }
}
