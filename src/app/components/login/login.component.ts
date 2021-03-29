import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpToolService } from 'src/app/services/http-tool.service';
import { AuthService } from 'src/app/services/auth.service';
import { Routes } from 'src/app/constant/routes';

import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';
import { UserAlertsService } from 'src/app/services/user-alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rs: HttpToolService,
    public auth: AuthService,
    private alertsService: UserAlertsService
  ) { }

  url_login: string = Routes.url_base_local + Routes.url_login;
  state: string;
  login: FormGroup;

  ngOnInit(): void {
    this.login = this.fb.group({
      email_inst: ['', Validators.required],
      password_u: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.login.valid) {
      this.rs.postRequest(this.url_login, this.login.value).subscribe(
        (data: any) => {
          if (data['status'] == 'welcome') {
            this.auth.login(data['tkse']);
            this.auth.setCurrentUser(data['username']);
            this.router.navigate(['/home'], { relativeTo: this.route });
          }
        }, (error) => {
          this.alertsService.alerLogin(error);
        });
    } else {
      M.toast('Error en el formulario', 4000)
    }
  }
}
