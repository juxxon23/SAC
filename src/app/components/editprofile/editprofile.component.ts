import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { Routes } from 'src/app/constant/routes';

declare var $: any;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  url_editprofile: string = Routes.url_base_local + Routes.url_signin;
  dataEx: JSON;
  state: string;
  Error: any;
  editprofile: FormGroup;

  ngOnInit() {
    $('select').material_select();
    this.editprofile = this.fb.group({
      name_u: [''],
      lastname_u: [''],
      phone_u: [''],
      city_u: [''],
      regional_u: [''],
      center_u: [''],
      bonding_type: [''],
      document_u: [localStorage.getItem('currentUser')],
    });
  }

  onSubmit() {
    var form = this.editprofile.value;
    this.rs.putRequest(this.url_editprofile, form).subscribe((data: any) => {
      this.dataEx = data;
      console.log(this.dataEx);
      this.state = this.dataEx['status'];
      switch (this.state) {
        case 'ok':
          localStorage.removeItem('doc_u')
          this.router.navigate(['/home'], { relativeTo: this.route });
          break;
        case 'error':
          this.router.navigate(['/editprofile']);
          break;
      }
    }, (error) => {
      let srv_error = error.error;
      switch (srv_error) {
        case 'exception':
          alert('Exception');
          console.log(srv_error['error']);
          break
        case 'sqlalchemy get_by':
          alert('Sqlalchemy Exception');
          console.log(srv_error['ex']);
          break;
        case 'postgres_tool get_by':
          alert('Postgresql Exception');
          console.log(srv_error['ex']);
          break;
        default:
          alert('Debe ingresar todos los datos');
          console.log(srv_error['ex']);
          break;
      }
    });
  }
}
