import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpToolService } from '../../services/http-tool.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  url_login: string = 'http://127.0.0.1:5000/login';
  dataEx: JSON;
  state: string;
  login: FormGroup;

  ngOnInit(): void {
    this.login = this.fb.group({
      document_u: ['', Validators.required],
      password_u: ['', Validators.required]
    })
  }

  onSubmit() {
    this.rs.postRequest(this.url_login, this.login.value).subscribe((data: any) => {
      this.dataEx = data;
      this.state = this.dataEx['status'];
      switch (this.state) {
        case 'welcome':
          localStorage.setItem("token", this.dataEx['token']);
          this.router.navigate(['/texteditor'], { relativeTo: this.route });
          console.log('Welcome');
          break;
        case 'document':
          console.log('Incorrect Password');
          break;
        case 'password':
          console.log('Incorrect Document');
          break;
        case 'validators':
          console.log('Incorrect Data Form');
          console.log(this.dataEx['error']);
          break;
        case 'exception':
          console.log('Exception');
          console.log(this.dataEx['ex']);
          break;
        case 'sqlalchemy get_by':
          console.log('Sqlalchemy Exception');
          console.log(this.dataEx['ex']);
          break;
        case 'postgres_tool get_by':
          console.log('Postgresql Exception');
          console.log(this.dataEx['ex']);
          break;
        default:
          console.log('Unknown Error');
          break;
      }
    });
  }
}
