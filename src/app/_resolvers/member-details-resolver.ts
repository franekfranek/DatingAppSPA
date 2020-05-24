import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberDetailsResolver implements Resolve<User>{
  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> { 
    //it observable but thanks to resoleve we dont need to subscribe to it
    return this.userService.getUser(route.params['id']).pipe(
      //pipe here to catch the error
      catchError(error => {
        this.alertify.error("Problem retrieving data" + error);
        this.router.navigate(['/members'])
        return of(null);
      }))
  }
}
