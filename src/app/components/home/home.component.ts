import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { Routes } from 'src/app/constant/routes';


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
    private route: ActivatedRoute
  ) { }

  url_doc: string = Routes.url_base_local + Routes.url_document;
  url_search: string = Routes.url_base_local + Routes.url_search;
  header_list = ['Acta No.', 'Creador', 'Formato', 'Opciones'];
  rows = [];
  table_state: boolean = false;
  options = {}
  filterOpt: FormGroup;

  ngOnInit() {
    $('select').material_select();
    this.filterOpt = this.fb.group({
      dataOpt: [''],
      opt: ['']
    });
  }

  actBrowser() {
    this.getSelect();
    this.rs.postRequest(this.url_search, this.filterOpt.value).subscribe((data: any) => {
      this.rows = data['u'];
      this.table_state = !this.table_state;
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
    this.rs.getRequest(this.url_search, id_u, id_a).subscribe(
      (data: any) => {
        this.auth.setCurrentAct(id_a)
        this.router.navigate(['/texteditor'], { relativeTo: this.route });
      });
  }
}

