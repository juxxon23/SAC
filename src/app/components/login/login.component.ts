import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpToolService } from '../../services/http-tool.service';
import { AuthService } from '../../services/auth.service';

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
  ) { }

  //url_login: string = 'https://floating-falls-31326.herokuapp.com/login';
  url_login: string = 'http://127.0.0.1:5000/login';
  state: string;
  login: FormGroup;
  stateSp: boolean = false;

  ngOnInit(): void {
    this.login = this.fb.group({
      email_inst: ['', Validators.required],
      password_u: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.login.valid) {
      this.stateSp = !this.stateSp;
      this.rs.postRequest(this.url_login, this.login.value).subscribe(
        (data: any) => {
          if (data['status'] == 'welcome') {
            this.auth.login(data['tkse']);
            this.auth.setCurrentUser(data['username']);
            this.router.navigate(['/texteditor'], { relativeTo: this.route });
          }
        }, (error) => {
          this.stateSp = !this.stateSp;
          let srv_error = error.error;
          switch (srv_error['status']) {
            case 'user':
              alert('The user doesn\'t exists');
              break;
            case 'password':
              alert('Incorrect Password');
              break;
            case 'validators':
              alert('Incorrect Data Form');
              console.log(srv_error['error']);
              break;
            case 'exception':
              alert('Exception');
              console.log(srv_error['ex']);
              break;
            case 'sqlalchemy get_by':
              alert('Sqlalchemy Exception');
              console.log(srv_error['ex']);
              break;
            case 'postgres_tool get_by':
              alert('Postgresql Exception');
              console.log(srv_error['ex']);
              break;
            default:
              alert('Unknown Error');
              break;
          }
        });
    } else {
      alert('Form Error');
    }
  }
}
