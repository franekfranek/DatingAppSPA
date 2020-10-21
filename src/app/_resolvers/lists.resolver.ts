import { Injectable } from "@angular/core";
import { Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ListResolver implements Resolve<User[]>{
  pageNumber = 1;
  pageSize = 5;
  likesParams = "Likers";

  constructor(private userService: UserService,
    private router: Router,
    private alertify: AlertifyService) { }

  resolve(): Observable<User[]> {
    //it observable but thanks to resoleve we dont need to subscribe to it
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParams).pipe(
      //pipe here to catch the error
      catchError(error => {
        this.alertify.error("Problem retrieving data" + error);
        this.router.navigate(['/home'])
        return of(null);
      }))
  }
}
