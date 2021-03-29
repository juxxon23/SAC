import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { Routes } from 'src/app/constant/routes';
import { UserAlertsService } from 'src/app/services/user-alerts.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private alertsService: UserAlertsService
  ) { }

  url_signin: string = Routes.url_base_local + Routes.url_signin;
  dataEx: JSON;
  state: string;
  error: any;
  signin: FormGroup;
  editProf: boolean = false;

  ngOnInit(): void {
    this.signin = this.fb.group({
      email_inst: ['', Validators.required],
      document_u: ['', Validators.required],
      password_u: ['', Validators.required],
      password_c: ['', Validators.required],
    });
  }

  editProfile() {
    this.editProf = true;
  }
  onSubmit() {
    if (this.signin.valid) {
      if (this.signin.value['password_u'] == this.signin.value['password_c']) {
        var form = this.signin.value;
        delete form.password_c;
        if (this.editProf) {
          this.rs.postRequest(this.url_signin, form).subscribe(
            (data: any) => {
              if (data['status'] == 'ok') {
                // Falta ajustar lo que se guarda en el localstorage
                this.auth.setCurrentUser(data['id_u'])
                this.router.navigate(['/editprofile'], { relativeTo: this.route });
              }
            }, (error) => {
              this.alertsService.alertSignin(error);
            });
          form.password_c = ''
        } else {
          this.rs.postRequest(this.url_signin, form).subscribe(
            (data: any) => {
              if (data['status'] == 'ok') {
                this.router.navigate(['/login'], { relativeTo: this.route });
                alert('Register Complete');
              }
            }, (error) => {
              this.alertsService.alertSignin(error);
            });
          form.password_c = ''
        }
      } else {
        M.toast('Las contraseñas no coinciden', 4000)
      }
    } else {
      M.toast('Error en el formulario', 4000)
    }
  }
}
