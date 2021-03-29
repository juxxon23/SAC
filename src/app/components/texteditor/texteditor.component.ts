import { Component, OnInit } from '@angular/core';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentToolService } from 'src/app/services/document-tool.service';
import { Routes } from 'src/app/constant/routes';

declare var tinymce: any;

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent implements OnInit {

  myEditor: any = '';
  url_doc: string = Routes.url_base_local + Routes.url_document;
  url_search: string = Routes.url_base_local + Routes.url_search;
  header_list = ['index', '_id', 'document_u', 'get_doc'];
  rows = [];
  table_state: boolean = false;

  constructor(
    private rs: HttpToolService,
    public auth: AuthService,
    private dt: DocumentToolService
  ) { }

  ngOnInit(): void {
    this.verifyEdit();
  }


  exportActDocx() {
    let out: any = tinymce.activeEditor.getContent();
    this.Export2Word(out, this.auth.getCurrentAct());

  }



  Export2Word(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+element+postHtml;
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    // Specify file name
    filename = filename?filename+'.docx':'document.docx';
    // Create download link element
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        // Setting the file name
        downloadLink.download = filename;
        //triggering the function
        downloadLink.click();
    }
    document.body.removeChild(downloadLink);
}

  verifyEdit() {
    try {
      let t: any = tinymce.activeEditor.initialized;
      if (t) {
        let ca: any = this.auth.getCurrentAct();
        if (ca == null) {
          console.log('soy nulo');
        } else {
          this.getDocById(this.auth.getCurrentUser(), ca);
        }
      }
    } catch (err) {
      setTimeout(() => {
        this.verifyEdit()
      }, 2000)
    }
  }

  editorContent(tinyEditor) {
    this.myEditor = tinyEditor;
  }

  insertHtml(htmlString) {
    tinymce.execCommand('mceInsertContent', false, htmlString);
  }

  createDoc() {
    let data_doc = {
      'id_u': this.auth.getCurrentUser(),
      'format_id': 2,
    };
    this.rs.postRequest(this.url_doc, data_doc).subscribe((data: any) => {
      this.insertHtml(data['format']['template']);
      this.auth.setCurrentAct(data['format']['id_acta']);
    });
  }

  getDocById(user: string, act: string) {
    this.rs.getRequest(this.url_search, user, act).subscribe(
      (data: any) => {
        let content = this.dt.getAct(data);
        this.insertHtml(content['t']);
        if (content['c']) {
          this.dt.setContentTable(content['c']);
        }
      });
  }

  saveDoc() {
    //let content = this.myEditor['editor']['contentDocument']['documentElement']['innerHTML'];
    let content = this.dt.getContentTable();
    let id_acta = this.auth.getCurrentAct();
    let data_doc = {
      'id_a': id_acta,
      'content': content
    }
    this.rs.putRequest(this.url_doc, data_doc).subscribe((data: any) => {
      console.log(data);
    });
  }
}
