import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav', //USE THIS TO DISPLAY THE CONTENT OF COMPONENT ON OUR PAGE
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }


  login() {//always subscribe to observable(when it appears)
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("You logged in!")

    }, error => {
        this.alertify.error(error);
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
  }

}
