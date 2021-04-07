import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentToolService } from 'src/app/services/document-tool.service';
import { Routes } from 'src/app/constant/routes';
import { ImagesToolService } from 'src/app/services/images-tool.service';

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
  url_up: string = Routes.url_base_local + Routes.url_upload;
  header_list = ['index', '_id', 'document_u', 'get_doc'];
  rows = [];
  table_state: boolean = false;
  filUser: any;
  upff: boolean = false;
  createAct = this.fb.group({
    description: ['', Validators.required],
    format_id: [''],
    id_u: [this.auth.getCurrentUser()],
  });
  uploadImg = this.fb.group({
    imgFile: ['']
  });

  constructor(
    private rs: HttpToolService,
    public auth: AuthService,
    private dt: DocumentToolService,
    private fb: FormBuilder,
    private ima: ImagesToolService
  ) { }

  ngOnInit(): void {
    let ca: any = this.auth.getTempAct();
    if (ca != null) {
      this.auth.setCurrentAct(ca);
      this.auth.deleteTempAct();
    }
    $('select').material_select();
    $('.modal').modal();
    this.verifyEdit();
  }

  showUp() {
    this.upff = !this.upff;
  }

  uploadImage() {
    this.rs.postRequest(this.url_up, this.filUser, this.auth.getCurrentUser(), this.auth.getCurrentAct()).subscribe((data: any) => {
      console.log('Success');
      this.showUp();
    });
  }

  getFiles(event) {
    let fileUser: File = event.target.files[0];
    let mime: string = this.getMimeType(fileUser.name);
    const blobUser = new Blob([fileUser], { type: mime });
    this.filUser = blobUser;

  }

  private getMimeType(filename: string): string {
    if (filename.indexOf('.docx') !== -1) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (filename.indexOf('.doc') !== -1) return 'application/msword';
    if (filename.indexOf('.pdf') !== -1) return 'application/pdf';
    if (filename.indexOf('.png') !== -1) return 'image/png';
    if (filename.indexOf('.jpeg') !== -1) return "image/jpeg";
    if (filename.indexOf('.jpg') !== -1) return "image/jpg";
    return 'text/plain';
  }


  getImg(): any {
    let framesColl = document.getElementsByTagName('iframe');
    let framDoc = framesColl[0].contentDocument;
    let imgs: any = framDoc.getElementsByTagName('img');
    return imgs;
  }

  getImgURI(): any {
    let imgs: any = this.getImg();
    let imgurl: any = {
      'b64': [],
      'static': []
    };
    for (let i = 0; i < imgs.length; i++) {
      imgurl['static'].push(imgs[i].src);
      imgurl['b64'].push(this.ima.getBase64Image(imgs[i]));
    }
    return imgurl;
  }

  exportActDocx() {
    /*let imgs: any = this.getImgURI();
    let imgsExport: any = this.getImg();
    for (let i = 0; i < imgsExport.length; i++) {
      imgsExport[i].src = imgs['b64'][i];
      console.log(imgsExport[i]);
    }*/
    let out: any = tinymce.activeEditor.getContent();
    let nameAct: string = 'Acta-' + this.auth.getCurrentAct();
    this.Export2Word(out, nameAct);
  }

  Export2Word(element, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + element + postHtml;
    var blob = new Blob(['\ufeff', html], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
    tinymce.activeEditor.setContent(htmlString);
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
