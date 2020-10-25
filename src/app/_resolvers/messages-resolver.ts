import { Injectable } from "@angular/core";
import { Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
  pageNumber = 1;
  pageSize = 5;
  messageContainter = "Unread";

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService
              ) { }

  resolve(): Observable<Message[]> { 
    //it observable but thanks to resoleve we dont need to subscribe to it
    return this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pageNumber, this.pageSize, this.messageContainter)
      //pipe here to catch the error
      .pipe(
        catchError(error => {
        this.alertify.error("Problem retrieving messages");
        this.alertify.error("Problem retrieving messages");
        this.router.navigate(['/home'])
        return of(null);
      }))
  }
}
