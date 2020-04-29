import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  //output properties emit new event 


  model: any = {};


  constructor(private authService: AuthService) { }


  ngOnInit(): void {
  }


  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log("registration successful");
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log("canceled");
  }
}
