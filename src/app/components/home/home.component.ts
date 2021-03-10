import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

import { HttpToolService } from '../../services/http-tool.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  url_doc: string = 'http://127.0.0.1:5000/document';
  header_list = ['index', '_id', 'document_u', 'content', 'get_doc'];
  rows = [];
  table_state: boolean = false;
  options = {}

  ngOnInit() {
    //var elems = document.querySelectorAll('select');
    //var instances = M.FormSelect.init(elems, this.options);
  }

  findActs() {
    this.rs.getRequest(this.url_doc).subscribe(
      (data: any) => {
        this.rows = data['docs'];
        this.table_state = !this.table_state;
      });
  }

  actBy(doc: any) {
    this.auth.setCurrentAct(doc['_id']);
    this.router.navigate(['/texteditor'], { relativeTo: this.route });
  }
}
