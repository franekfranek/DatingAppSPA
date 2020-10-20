import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Route } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    @Output() cancelRegister = new EventEmitter();
    user: User;
    registerForm: FormGroup;
    bsConfig: Partial<BsDatepickerConfig>;


  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder) { }


    ngOnInit(): void {
        this.registerForm = new FormGroup({
          username: new FormControl("", Validators.required),
          //state(first arg) here means what is the
          //initial state(value of input) of the form
          password: new FormControl("", [Validators.required,
                          Validators.minLength(4), Validators.maxLength(8)]),
          confirmPassword: new FormControl("", Validators.required)
        }, this.passwordMatchValidator);
      this.bsConfig = {
        containerClass: "theme-red"
      }
      this.createRegisterForm();
  }


  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender:["male"],
      username: ["", Validators.required],
      knownAs: ["", Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4),
                        Validators.maxLength(8)]],
      confirmPassword: ["", Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

    passwordMatchValidator(g: FormGroup){
        return g.get("password").value === g.get("confirmPassword").value ? null : { "mismacht": true };
    }


  register() {
    if (this.registerForm.valid) {
      //this copy registerform to empty object and then assigned it to user 
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successfull');
      }, error => {
          this.alertify.error(error);
      }, () => {
          this.authService.login(this.user).subscribe(() => {
            //this.router.navigate(["members"]);
            console.log("bug");
          });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('canceled!');
  }
}
