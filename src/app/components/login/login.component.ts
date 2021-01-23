import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonManagerService } from '../../services/json-manager.service';
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
    private rs: JsonManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  url_login: string= 'http://127.0.0.1:5000/login';
  dataEx: JSON;
  state: string;
  error: any;
  login: FormGroup

  ngOnInit(): void {
    this.login = this.fb.group({
      document_u: ['', Validators.required],
      password_u: ['', Validators.required]
    })
  }

  onSubmit() {
    this.rs.postData(this.url_login, this.login.value).subscribe((data: any) => {
      this.dataEx = data;
      localStorage.setItem("token",this.dataEx['token'])
      this.state = this.dataEx['state'];
      this.error = this.dataEx['error'];
      switch (this.state) {
        case 'welcome':
          this.router.navigate(['/home'], {relativeTo: this.route});
          console.log('Welcome')
          break;
        case 'document':
            console.log('Incorrect Password')
          break;
        case 'password_u':
          console.log('Incorrect Document')
          break;
        case 'error':
          console.log('Error')
        default:
          console.log('Error')
          break;
      }
    })
  }

}
