import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) { }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    // instead of next.data we need to use next.firstChild.data
    // because our AuthGuard for child routes
    // roles are from the routes not the token
    const roles = next.firstChild.data["roles"] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      }
      else {
        this.router.navigate(["members"]);
        this.alertify.error("You are not authorised")
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!');
    this.router.navigate(['/home']);
  }
  
}
