import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentToolService } from 'src/app/services/document-tool.service';
import { Routes } from 'src/app/constant/routes';

declare var tinymce: any;
declare var $: any;

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
  createAct = this.fb.group({
    description: ['', Validators.required],
    format_id: [''],
    id_u: [this.auth.getCurrentUser()],
  });

  constructor(
    private rs: HttpToolService,
    public auth: AuthService,
    private dt: DocumentToolService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    $('select').material_select();
    $('.modal').modal();
    this.verifyEdit();
  }


  exportActDocx() {
    let out: any = tinymce.activeEditor.getContent();
    let nameAct: string = 'Acta-' + this.auth.getCurrentAct();
    this.Export2Word(out, nameAct);
  }

  Export2Word(element, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + element + postHtml;
    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    // Specify file name
    filename = filename ? filename + '.docx' : 'Acta.docx';
    // Create download link element
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
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
        if (ca != null) {
          this.getDocById(this.auth.getCurrentUser(), ca);
        } else {
          $('#modal1').modal('open');
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

  onSubmit() {
    this.setSelectValues();
    if (this.createAct.valid) {
      this.rs.postRequest(this.url_doc, this.createAct.value).subscribe((data: any) => {
        this.insertHtml(data['format']['template']);
        this.auth.setCurrentAct(data['format']['id_acta']);
        if (data['format']['content']) {
          this.dt.setContentTable(data['format']['content']);
        }
      });
    }
  }

  setSelectValues() {
    let select = document.getElementsByTagName("select");
    this.createAct.value['format_id'] = parseInt(select[0].value);
  }

  openMod() {
    $('#modal1').modal('open');
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
      'content': content,
      'html_content': tinymce.activeEditor.getContent()
    }
    this.rs.putRequest(this.url_doc, data_doc).subscribe((data: any) => {
      console.log(data);
    });
  }
}
