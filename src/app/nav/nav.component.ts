import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-nav', //USE THIS TO DISPLAY THE CONTENT OF COMPONENT ON OUR PAGE
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  login() {//always subscribe to observable(when it appears)
    this.authService.login(this.model).subscribe(next => {
      console.log("success");

    }, err => {
      console.log("Failed to login");
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token; //token = (token != 0) ? true : false
  }

  logout() {
    localStorage.removeItem('token');
    console.log("logged out");
  }

}
