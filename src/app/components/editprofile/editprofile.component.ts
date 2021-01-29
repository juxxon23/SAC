import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';
import { HttpToolService } from 'src/app/services/http-tool.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private rs: HttpToolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  url_editprofile: string = 'http://127.0.0.1:5000/signin';
  dataEx: JSON;
  state: string;
  Error: any;
  editprofile: FormGroup;

  ngOnInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    this.editprofile = this.fb.group({
      name_u: [''],
      lastname_u: [''],
      phone_u: [''],
      regional_u: [''],
      center_u: [''],
      bonding_type: [''],
      document_u: [localStorage.getItem('document_u')],
    });
  }

  onSubmit() {
    var form = this.editprofile.value;
    console.log(form);
    this.rs.putRequest(this.url_editprofile, form).subscribe((data: any) => {
      this.dataEx = data;
      console.log(this.dataEx);
      this.state = this.dataEx['state'];
      switch (this.state) {
        case 'ok':
          this.router.navigate(['/home'], { relativeTo: this.route });
          break;
        case 'error':
          this.router.navigate(['/editprofile']);
          break;
      }
    });
  }
}
