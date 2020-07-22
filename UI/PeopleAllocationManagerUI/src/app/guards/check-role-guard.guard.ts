import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleGuardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Retrieve the allowed roles from `route.data`.
    const allowedRoles = route.data.allowedRoles;
    const userRole = JSON.parse(localStorage.getItem('NowUser')).userRoleId;
    const userRoles = new Array<any>();

    const index = allowedRoles.findIndex(elem => elem === userRole);

    if (index !== - 1) {
      return true;
    } else {
      return this.router.navigate(['']);
    }

  }

  public findCommonElements(allowedRoles, userRole) {
    const index = allowedRoles.findIndex(elem => elem === userRole);
    return userRole.some(role => allowedRoles.includes(role));
  }

}
