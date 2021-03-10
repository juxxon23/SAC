import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) {}


  ngOnInit(): void {
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin);
    });
    /*
    this.auth.isLoggedIn().subscribe((res) => {
      console.log(res);
      if (res) {
        $(".button-collapse").sideNav({
          menuWidth: 300, // Default is 300
          edge: 'right', // Choose the horizontal origin);
        });
        console.log('iniciado');
      }
    });
    */
  }

  logout(){
    this.auth.logout();
  }

  show() {
    
  }
}
