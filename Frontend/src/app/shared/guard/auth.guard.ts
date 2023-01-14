import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthStateService } from 'src/app/components/login/store/login.state.service';
import { LoginStateService } from 'src/app/components/login/store/login.state.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.authUser$
      .subscribe((data) => {
        this.user = data;
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.isLoggedIn();
      if (!this.user) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
  }

  // if(this.authService.login(this.payload)) {
  //   return true;
  // } else {
  //   this.router.navigate(['/']);
  //   return false;
  // }
  
}
