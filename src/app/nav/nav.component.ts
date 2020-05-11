import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav', //USE THIS TO DISPLAY THE CONTENT OF COMPONENT ON OUR PAGE
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }
  //it has to be public becasue it all compiles to JS and in JS there is no private/public concepts 
  // it is needed to be public in html nav.com
  ngOnInit(): void {
  }


  login() {//always subscribe to observable(when it appears)
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("You logged in!")

    }, error => {
        this.alertify.error(error);
    }, () => {
        this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();

    //const token = localStorage.getItem('token');
    //return !!token; token = (token != 0) ? true : false
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('You logged out!');
    this.router.navigate(['/home']);
  }

}
