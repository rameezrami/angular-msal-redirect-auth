import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MsalAuthGuard } from './msal-auth.guard';

@Injectable({
  providedIn: 'root',
})
export class MsalNotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: MsalService,
    private msalAuthGuard: MsalAuthGuard
  ) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount) {
      return true; // User is logged in, allow access to the route
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/msal']);
      return false;
    }
  }
}
