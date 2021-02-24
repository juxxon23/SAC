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
      document_u: ['', Validators.required],
      password_u: ['', Validators.required]
    })
  }

  changeState(data: boolean) {
    return !data;
  }

  onSubmit() {
    if (this.login.valid) {
      this.changeState(this.stateSp);
      this.rs.postRequest(this.url_login, this.login.value).subscribe(
        (data: any) => {
          if (data['status'] == 'welcome') {
            this.auth.login(data['tkse']);
            this.auth.setCurrentUser(data['username']);
            this.router.navigate(['/texteditor'], { relativeTo: this.route });
          }
        }, (error) => {
          let server_error = error.error
          switch (server_error['status']) {
            case 'document':
              alert('Incorrect Document');
              break;
            case 'password':
              alert('Incorrect Password');
              break;
            case 'validators':
              alert('Incorrect Data Form');
              console.log(server_error['error']);
              break;
            case 'exception':
              alert('Exception');
              console.log(server_error['ex']);
              break;
            case 'sqlalchemy get_by':
              alert('Sqlalchemy Exception');
              console.log(server_error['ex']);
              break;
            case 'postgres_tool get_by':
              alert('Postgresql Exception');
              console.log(server_error['ex']);
              break;
            default:
              alert('Unknown Error');
              break;
          }
          this.changeState(this.stateSp);
        });
    } else {
      alert('Form Error');
    }
  }
}
