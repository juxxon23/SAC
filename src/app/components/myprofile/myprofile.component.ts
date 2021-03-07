import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public auth : AuthService
  ) { }

  url_myprofile: string = 'http://127.0.0.1:5000/signin';
  dataEx: JSON;
  state: string;
  error: any;
  myprofile: FormGroup;
  stateSp: boolean = false;
  habilitarEdit: boolean = false;
  

  ngOnInit(): void {
    this.myprofile = this.fb.group({
      password_u: [''],
      name_u: [''],
      lastname_u: [''],
      phone_u: [''],
      regional_u: [''],
      center_u: [''],
      bonding_type: [''],
      city_u:['']
    })
  }

  click : boolean = false;

  onButtonClick(){
    this.click = !this.click;
  }

  onSubmit() {
    this.stateSp = !this.stateSp;
    var form = this.myprofile.value;
    console.log(form);
    this.rs.putRequest(this.url_myprofile, form).subscribe((data: any) => {
      this.dataEx = data;
      console.log(this.dataEx);
      this.state = this.dataEx['state'];
      switch (this.state) {
        case 'ok':
          this.router.navigate(['/myprofile'], { relativeTo: this.route});
          break;
        case ' error':
          this.router.navigate(['/myprofile']);
          break;
      }
    })
  }

}
