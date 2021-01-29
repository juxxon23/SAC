import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpToolService } from '../../services/http-tool.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

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
    private spinner: SpinnerService
  ) {}

  url_signin: string = 'http://127.0.0.1:5000/signin';
  dataEx: JSON;
  state: string;
  error: any;
  signin: FormGroup;

  ngOnInit(): void {
    this.signin = this.fb.group({
      email_inst: ['', Validators.required],
      document_u: ['', Validators.required],
      password_u: ['', Validators.required],
      password_c: ['', Validators.required],
    });
  }

  editprofile(event) {
    if (this.signin.value['password_u'] == this.signin.value['password_c']) {
      var form = this.signin.value;
      delete form.password_c;
      this.rs.postRequest(this.url_signin, form).subscribe((data: any) => {
        this.dataEx = data;
        console.log(this.dataEx);
        this.state = this.dataEx['state'];
        switch (this.state) {
          case 'ok':
            localStorage.setItem('document_u', this.signin.value['document_u'])
            this.spinner.llamarSpinner();
            this.router.navigate(['/editprofile'], { relativeTo: this.route });
            console.log('Register Complete');
            break;
          case 'error':
            console.log('Error in the form');
            this.router.navigate(['/signin']);
            break;
        }
      });
    } else {
      console.log('Passwords do not match');
    }
  }

  onSubmit() {
    if (this.signin.value['password_u'] == this.signin.value['password_c']) {
      var form = this.signin.value;
      delete form.password_c;
      this.rs.postRequest(this.url_signin, form).subscribe((data: any) => {
        this.dataEx = data;
        console.log(this.dataEx);
        this.state = this.dataEx['state'];
        switch (this.state) {
          case 'ok':
            this.spinner.llamarSpinner();
            this.router.navigate(['/login'], { relativeTo: this.route });
            console.log('Register Complete');
            break;
          case 'error':
            console.log('Error in the form');
            this.router.navigate(['/signin']);
            break;
        }
      });
    } else {
      console.log('Passwords do not match');
    }
  }
}
