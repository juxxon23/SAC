import { Component, OnInit } from '@angular/core';
import * as M from 'node_modules/materialize-css/dist/js/materialize.min.js';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor() { }

  options = {}

  ngOnInit(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, this.options);
  }

}
