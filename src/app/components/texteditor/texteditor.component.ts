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
    public dt: DocumentToolService
    ) { }

  ngOnInit(): void {
  }

  editorContent(tinyEditor) {
    this.myEditor = tinyEditor;
  }

  insertHtml(htmlString) {
    tinymce.execCommand('mceInsertContent', false, htmlString);
  }

  createDoc() {
    let data_doc = {
      'document_u': '1094999999',
      'format_id': 1,
      'opts': [
        1,
        2
      ]
    };
    this.rs.postRequest(this.url_doc, data_doc).subscribe((data: any) => {
      this.insertHtml(data['format']['template']);
      localStorage.setItem("id_acta", data['format']['id_acta']);
    });
  }

  getDocById(doc: any, index: number) {
    this.rs.getRequest(this.url_doc, doc['_id']).subscribe((data: any) => {
      localStorage.setItem("id_acta", doc['_id']);
      this.insertHtml(data['template']);
      this.dt.updateContent(data['us']['content']);
    });
  }

  getAllDocs() {
    this.rs.getRequest(this.url_doc).subscribe((data: any) => {
      this.rows = data['docs'];
      this.table_state = true;
    });
  }

  saveDoc() {
    let content = this.myEditor['editor']['contentDocument']['documentElement']['innerHTML'];
    let id_acta = localStorage.getItem('id_acta');
    //let doc_u = localStorage.getItem('doc_u');
    let data_doc = {
      'id_acta': id_acta,
      'document_u': '1094972662', //doc_u
      'content': content
    }
    this.rs.putRequest(this.url_doc, data_doc).subscribe((data: any) => {
      console.log(data);
    });
  }
}
