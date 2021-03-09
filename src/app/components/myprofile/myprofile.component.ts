import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpToolService } from 'src/app/services/http-tool.service';



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
    public auth: AuthService
  ) { }

  url_myprofile: string = 'http://127.0.0.1:5000/signin';
  dataEx: JSON;
  state: string;
  error: any;
  myprofile: FormGroup;
  estado: boolean = false;

  ngOnInit(): void {
    this.myprofile = this.fb.group({
      password_u: [''],
      name_u: [''],
      lastname_u: [''],
      phone_u: [''],
      regional_u: [''],
      center_u: [''],
      bonding_type: [''],
      city_u: [''],
      document_u: [localStorage.getItem('currentUser')]
    })
  }

  newPass() {
    this.estado = true;
  }

  onSubmit() {
    this.estado = false;
    if (this.estado) {
      this.newPass();
    } else {
      var form = this.myprofile.value;
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
        let srv_error = error.error;
        switch (srv_error['status']) {
          case 'exception':
            alert('Exception');
            console.log(srv_error['error']);
            break
          case 'sqlalchemy get_by':
            alert('Sqlalchemy Exception');
            console.log(srv_error['ex']);
            break;
          case 'postgres_tool get_by':
            alert('Postgresql Exception');
            console.log(srv_error['ex']);
            break;
          default:
            alert('Debe ingresar todos los datos');
            console.log(srv_error['ex']);
            break;
        }
      })
    }
  }
}
