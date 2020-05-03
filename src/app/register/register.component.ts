import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from '@angular/compiler/src/util';
import { AlertifyService } from '../_services/alertify.service';

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


  constructor(private authService: AuthService, private alertify: AlertifyService) { }


  ngOnInit(): void {
  }


  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('You registered!');
    }, error => {
        this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('canceled!');
  }
}
