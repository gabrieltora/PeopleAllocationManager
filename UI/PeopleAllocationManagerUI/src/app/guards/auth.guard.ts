
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';
import { TokenModel } from 'src/app/shared/models/TokenModel';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn()) {
      return this.notAuthenticated(state);
    }

    const payload = jwt_decode(this.authService.getJwtToken()) as TokenModel;

    if (!payload) {
      return this.notAuthenticated(state);
    }

    const isValid = moment().isBefore(payload.exp * 1000);
    if (!isValid) {
      return this.notAuthenticated(state);
    }

    return true;
  }

  private notAuthenticated(state: RouterStateSnapshot): false {
    this.authService.doLogoutUser();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}


