import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { HttpToolService } from 'src/app/services/http-tool.service';
import { Routes } from 'src/app/constant/routes';
import { UserAlertsService } from 'src/app/services/user-alerts.service';

declare var $: any;

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private alertsService: UserAlertsService
  ) { }

  url_myprofile: string = Routes.url_base_local + Routes.url_signin;
  dataEx: JSON;
  state: string;
  error: any;
  myprofile: FormGroup;
  estado: boolean = false;

  ngOnInit(): void {
    this.auth.isAct().subscribe((data) => {
      if (data) {
        if (this.router.url != '/texteditor') {
          this.auth.deleteCurrentAct();
        }
      }
    });
    this.getDataUser(this.auth.getCurrentUser());
    $('select').material_select();
    this.myprofile = this.fb.group({
      password_u: [''],
      name_u: [''],
      lastname_u: [''],
      phone_u: [''],
      regional_u: [''],
      center_u: [''],
      bonding_type: [''],
      city_u: [''],
      id_u: [this.auth.getCurrentUser()]
    });
    
  }

  newPass() {
    this.estado = true;
  }

  name: any
  lastname: any
  phone: any

  getDataUser(user_id: string) {
    this.rs.getRequest(this.url_myprofile,  user_id).subscribe((data:any) => {
      this.dataEx = data;
      this.name = this.dataEx['data'][0]
      this.lastname = this.dataEx['data'][1]
      this.phone = this.dataEx['data'][2]
    })
  }

  onSubmit() {
    var select = document.getElementsByTagName("select");
    this.myprofile.value['regional_u']= select[0].value
    this.myprofile.value['center_u']= select[1].value
    this.myprofile.value['city_u']= select[2].value
    this.estado = false;
    if (this.estado) {
      this.newPass();
    } else {
      var form = this.myprofile.value;
      console.log(form['name_u']);

      if (form['name_u'] == "") {
        this.myprofile.value['name_u']= this.name
      } if (form['lastname_u'] == "") {
          this.myprofile.value['lastname_u'] = this.lastname
      } if (form['phone_u'] == "") {
          this.myprofile.value['phone_u'] = this.phone
      }
      this.rs.putRequest(this.url_myprofile, form).subscribe((data: any) => {
        this.dataEx = data;
        console.log(this.dataEx);
        this.state = this.dataEx['state'];
        switch (this.state) {
          case 'ok':
            this.router.navigate(['/myprofile'], { relativeTo: this.route });
            break;
          case ' error':
            this.router.navigate(['/myprofile']);
            break;
        }
      }, (error) => {
        this.alertsService.alertSigninExtra(error);
      })
    }
  }
}
