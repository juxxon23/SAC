import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpToolService } from '../../services/http-tool.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    public auth: AuthService
  ) { }

  //url_signin: string = 'https://floating-falls-31326.herokuapp.com/signin';
  url_signin: string = 'http://127.0.0.1:5000/signin';
  dataEx: JSON;
  state: string;
  error: any;
  signin: FormGroup;
  stateSp: boolean = false;
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
      this.stateSp = !this.stateSp;
      if (this.signin.value['password_u'] == this.signin.value['password_c']) {
        var form = this.signin.value;
        delete form.password_c;
        if (this.editProf) {
          this.rs.postRequest(this.url_signin, form).subscribe(
            (data: any) => {
              if (data['status'] == 'ok') {
                // Falta ajustar lo que se guarda en el localstorage
                localStorage.setItem('doc_u', this.signin.value['document_u'])
                this.router.navigate(['/editprofile'], { relativeTo: this.route });
              }
            }, (error) => {
              this.stateSp = !this.stateSp;
              let srv_error = error.error;
              switch (srv_error['status']) {
                case 'validators':
                  alert('Incorrect Data Form');
                  console.log(srv_error['error']);
                  break;
                case 'exception':
                  alert('Exception')
                  console.log(srv_error['ex']);
                  this.router.navigate(['/signin']);
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
          form.password_c = ''
        } else {
          this.rs.postRequest(this.url_signin, form).subscribe(
            (data: any) => {
              if (data['status'] == 'ok') {
                this.router.navigate(['/login'], { relativeTo: this.route });
                alert('Register Complete');
              }
            }, (error) => {
              this.stateSp = !this.stateSp;
              let srv_error = error.error;
              switch (srv_error['status']) {
                case 'user':
                  alert('The user doesn\'t exists');
                  console.log(srv_error['msg']);
                case 'validators':
                  alert('Incorrect Data Form');
                  console.log(srv_error['error']);
                  break;
                case 'exception':
                  alert('Exception')
                  console.log(srv_error['ex']);
                  this.router.navigate(['/signin']);
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
          form.password_c = ''
        }
      } else {
        this.stateSp = !this.stateSp;
        console.log('Passwords do not match');
      }
    } else {
      this.stateSp = !this.stateSp;
      console.log('Form Error');
    }
  }
}
