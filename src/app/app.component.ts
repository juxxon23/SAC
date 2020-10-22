import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SAC';

  constructor(private router: Router) {}

  ngOnInit():void {
  	  this.router.navigate(['/login']);
//  	  setTimeout(() => this.router.navigate(['/signin']), 2000);
  }
}
