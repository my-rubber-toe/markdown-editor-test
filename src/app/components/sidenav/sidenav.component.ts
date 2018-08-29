import { DocumentsService } from '../../services/documents/documents.service';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend-service/backend.service';
import { saveAs } from 'file-saver/FileSaver';
import { MarkedParserService } from '../../services/marked-parser/marked-parser.service';
import { Router } from '../../../../node_modules/@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public downloading = false;

  constructor(
    private docService: DocumentsService,
    private backend: BackendService,
    private md: MarkedParserService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  /**
  * @desc Create New Document
  */
  newDocument() {
    this.docService.createDocument()
  }

  /**
  * @desc Delete Current Working Document
  */
  deleteDocument() {
    swal({
      title: 'Are you sure you want to delete:\n' + this.docService.getCurrentDoc().name,
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1A237E',
      cancelButtonColor: '#B71C1C',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.docService.removeDocument(this.docService.getCurrentDoc());
      }
    })
    
  }
  /**
  * @desc Download Document based on the parameter type
  * @param type - type of document to download.
  */
  downloadContent(type: string) {
    this.downloading = true;
    if ((this.docService.getCurrentDoc().content.length != 0 && type == 'md') || (this.docService.getCurrentDoc().content.length != 0 && type == 'html')) {
      this.docService.downloadDocument(type).then((resolve) => {
        this.downloading = !this.downloading;
      })
    }
    else if(this.docService.getCurrentDoc().content.length != 0 && type == 'pdf'){
      this.backend.convertToPdf(this.docService.getCurrentDoc()).subscribe((response: any)=>{
        var blob = new Blob([response], {type: 'application/pdf'});
        var filename = this.docService.getCurrentDoc().name + '.pdf';
        saveAs(blob, filename);
        this.downloading = !this.downloading;
      });
    
    }else{
      this.docService.docMessage('Document Empty')
      this.downloading = !this.downloading;
    }
  }

  /**
  * @desc Get Document content length
  * @param number - document length
  */
  getDocNmrs(){
    return this.docService.allDocuments.length;
  }

  /**
  * @desc Open new window and show document preview based on type
  * @param type - type of document to show
  */
  previewContent(type: string){
    this.downloading = true;
    if(this.docService.getCurrentDoc().content.length == 0){
      this.docService.docMessage('Document is empty.')
      this.downloading = !this.downloading;
    }else if(type == 'pdf'){
      this.backend.convertToPdf(this.docService.getCurrentDoc()).subscribe( (res: any)=>{
        var blob = new Blob([res], {type: 'application/pdf'});
        var fileUrl = URL.createObjectURL(blob);  
        window.open(fileUrl)
        this.downloading = !this.downloading;

      })

    }else if(type == 'html'){
      var blob = new Blob([this.md.convert(this.docService.getCurrentDoc().content)], {type: 'text/html'});
       var fileUrl = URL.createObjectURL(blob);  
      window.open(fileUrl)
      this.downloading = !this.downloading;

    }else if(type == 'md'){
      var blob = new Blob([this.docService.getCurrentDoc().content], {type: 'text/plain'});
       var fileUrl = URL.createObjectURL(blob);  
      window.open(fileUrl)
      this.downloading = !this.downloading;

    }
    
  }

}
