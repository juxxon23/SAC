import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { Routes } from 'src/app/constant/routes';
import { HomeAlertsService } from 'src/app/services/home-alerts.service'


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: HomeAlertsService
  ) { }

  url_doc: string = Routes.url_base_local + Routes.url_document;
  url_search: string = Routes.url_base_local + Routes.url_search;
  url_reqEdit: string = Routes.url_base_local + Routes.url_req_edit;
  header_list = ['Acta No.', 'Creador', 'Descripcion', 'Formato', 'Editar', 'Descargar'];
  rows = [];
  table_state: boolean = false;
  options = {}
  filterOpt: FormGroup;

  ngOnInit() {
    $('select').material_select();
    this.filterOpt = this.fb.group({
      dataOpt: [''],
      opt: [''],
      currUser: [this.auth.getCurrentUser()]
    });
  }

  exportActDocx(doc: any) {
    let us: string = this.auth.getCurrentUser();
    let ida: string = doc['id_a'].toString();
    this.rs.getRequest(this.url_search, us, ida).subscribe(
      (data: any) => {
        let out: any = data['h_temp']
        let nameAct: string = 'Acta-' + ida;
        this.Export2Word(out, nameAct);
      });
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

  convertOptions(options: any) {
    for (let i = 0; i < options.length; i++) {
      if (options[i]['edit']) {
        this.options[i] = 'edit';
      } else {
        this.options[i] = 'schedule_send';
      }
    }
  }

  actBrowser() {
    this.getSelect();
    this.rs.postRequest(this.url_search, this.filterOpt.value).subscribe((data: any) => {
      this.rows = data['u'];
      this.convertOptions(data['u']);
      this.table_state = !this.table_state;
      this.alerts.AlertSearchActa(data)
    }, (error) => {
      this.alerts.AlertSearchActa(error)
    });
  }

  searchAct() {
    this.rs.getRequest(this.url_search, this.auth.getCurrentUser(), this.auth.getCurrentAct()).subscribe(
      (data: any) => {
        console.log(data);
      });
  }

  getSelect() {
    let selElem: any = document.getElementsByTagName('select')[0].value;
    this.filterOpt.value['opt'] = selElem;
  }
  findActs() {
    let id_u: string = this.auth.getCurrentUser();
    this.rs.getRequest(this.url_doc, id_u).subscribe(
      (data: any) => {
        this.rows = data['docs'];
        this.table_state = !this.table_state;
      });
  }

  actBy(doc: any) {
    let id_a: string = doc['id_a'].toString();
    let id_u: any = this.auth.getCurrentUser();
    let edit: boolean = doc['edit'];
    if (edit) {
      this.rs.getRequest(this.url_search, id_u, id_a).subscribe(
        (data: any) => {
          this.auth.setCurrentAct(id_a)
          this.router.navigate(['/texteditor'], { relativeTo: this.route });
        });
    } else {
      let reqE: any = {
        'id_u': this.auth.getCurrentUser(),
        'id_a': id_a
      }
      this.rs.postRequest(this.url_reqEdit, reqE).subscribe((data: any) => {
        this.alerts.AlertEditRequest(data)
      }, (error) => {
        this.alerts.AlertEditRequest(error)
      });
    }
  }
}

