import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { Routes } from 'src/app/constant/routes';
import { UserAlertsService } from 'src/app/services/user-alerts.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private route: ActivatedRoute,
    private alertsService: UserAlertsService,
    public auth: AuthService
  ) { }

  url_editprofile: string = Routes.url_base_local + Routes.url_signin;
  dataEx: JSON;
  state: string;
  Error: any;
  editprofile: FormGroup;

  ngOnInit() {
    $('select').material_select();
    this.auth.isLoggedIn().subscribe((data) =>{
      if (data) {
        this.router.navigate(['/home']);
      }
    });
    
    this.editprofile = this.fb.group({
      name_u: [''],
      lastname_u: [''],
      phone_u: [''],
      city_u: [''],
      regional_u: [''],
      center_u: [''],
      bonding_type: [''],
      id_u: [this.auth.getCurrentUser()],
    });
  }

  onSubmit() {
    var select = document.getElementsByTagName("select");
    this.editprofile.value['regional_u']= select[0].value
    this.editprofile.value['center_u']= select[1].value
    this.editprofile.value['city_u']= select[2].value
    if (this.editprofile.valid) {
      this.rs.putRequest(this.url_editprofile, this.editprofile.value).subscribe((data: any) => {
        if (data['status'] == 'ok') {
          localStorage.removeItem('doc_u')
          this.router.navigate(['/home'], { relativeTo: this.route });
        }
      }, (error) => {
        this.alertsService.alertSigninExtra(error);
      });
    } else {
      M.toast('Error en el formulario', 4000)
    }

  }
}
