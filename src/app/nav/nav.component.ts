import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav', //USE THIS TO DISPLAY THE CONTENT OF COMPONENT ON OUR PAGE
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  constructor() { }

  ngOnInit(): void {
  }


  login() {
    console.log(this.model);
  }

}
