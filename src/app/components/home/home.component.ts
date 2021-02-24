import { Component, OnInit } from '@angular/core';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  options = {}

  ngOnInit(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, this.options);
  }

}
