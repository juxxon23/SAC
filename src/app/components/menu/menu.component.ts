import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { HttpToolService } from 'src/app/services/http-tool.service';
import { Routes } from 'src/app/constant/routes';

declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private rs: HttpToolService
  ) { }

  url_reqEdit: string = Routes.url_base_local + Routes.url_req_edit;
  not: boolean = false;
  header_list = ['Acta No.', 'Usuario', 'Opciones'];
  rows = [];

  ngOnInit(): void {
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin);
      closeOnClick: true, // Closes side-nav on <a> clicks
    });
    $('.collapsible').collapsible();
  }

  logout() {
    this.auth.logout();
  }

  acceptReq(doc: any, i: number) {
    let info: any = {
      'id_req': doc['id_req']
    }
    this.rs.putRequest(this.url_reqEdit, info).subscribe(
      (data: any) => {
        if (data['status'] == 'ok')
          this.rows.splice(i, 1)
      });
  }

  declineReq(doc: any, i: number) {
    let i_re: any =  doc['id_req'].toString();
    this.rs.deleteRequest(this.url_reqEdit, i_re).subscribe(
      (data: any) => {
        if (data['status'] == 'ok')
          this.rows.splice(i, 1)
      });
  }

  showNotifications() {
    this.not = !this.not;
    if (this.not) {
      this.rs.getRequest(this.url_reqEdit, this.auth.getCurrentUser()).subscribe(
        (data: any) => {
          this.rows = data['reqs_edit']
        });
    }
  }
}
