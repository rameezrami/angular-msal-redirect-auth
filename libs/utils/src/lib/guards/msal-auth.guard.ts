import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class MsalAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: MsalService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const activeAccount = this.authService.instance.getActiveAccount();
    debugger;
    if (activeAccount) {
      return true; // User is logged in, allow access to the route
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/msal']);
      return false;
    }
  }
}
