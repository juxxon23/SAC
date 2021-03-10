import { Component, OnInit } from '@angular/core';
import { HttpToolService } from '../../services/http-tool.service';
import { AuthService } from '../../services/auth.service';
import { DocumentToolService } from '../../services/document-tool.service';

declare var tinymce: any;

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent implements OnInit {

  myEditor: any = '';
  //url_doc: string = 'https://floating-falls-31326.herokuapp.com/document'
  url_doc: string = 'http://127.0.0.1:5000/document';
  header_list = ['index', '_id', 'document_u', 'get_doc'];
  rows = [];
  table_state: boolean = false;

  constructor(
    private rs: HttpToolService,
    public auth: AuthService,
    private dt: DocumentToolService
  ) {}

  ngOnInit(): void {
    this.verifyEdit();
  }


  verifyEdit() {
    try {
      let t: any = tinymce.activeEditor.initialized;
      if (t) {
        this.getDocById(this.auth.getCurrentAct());
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
      'document_u': this.auth.getCurrentUser(),
      'format_id': 1,
    };
    this.rs.postRequest(this.url_doc, data_doc).subscribe((data: any) => {
      this.insertHtml(data['format']['template']);
      this.auth.setCurrentAct(data['format']['id_acta']);
    });
  }

  getDocById(act: any) {
    this.rs.getRequest(this.url_doc, act).subscribe(
      (data: any) => {
        let content = this.dt.getAct(data);
        this.insertHtml(content['t']);
        if (content['c']) {
          this.dt.updateContent(content['c']);
        } 
      });
  }

  saveDoc() {
    let content = this.myEditor['editor']['contentDocument']['documentElement']['innerHTML'];
    let id_acta = this.auth.getCurrentAct();
    let doc_u = this.auth.getCurrentUser();
    let data_doc = {
      'id_acta': id_acta,
      'document_u': doc_u,
      'content': content
    }
    this.rs.putRequest(this.url_doc, data_doc).subscribe((data: any) => {
      console.log(data);
    });
  }
}
