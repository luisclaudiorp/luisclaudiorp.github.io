import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class Auth {
  constructor(public authService: AuthService, public router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(Auth).canActivateChild(childRoute, state);
};
