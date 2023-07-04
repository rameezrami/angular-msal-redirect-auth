/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { StorageService, STORAGE_KEYS } from '@msal-workspace/utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'msal-workspace-msal',
  templateUrl: './msal.component.html',
})
export class MsalComponent implements OnInit, OnDestroy {
  handleRedirectSub$: Subscription = Subscription.EMPTY;
  loginResponse: any = null;
  showRedirect = false;
  constructor(
    private storageService: StorageService,
    private authService: MsalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.handleRedirect();
    this.setActiveAccountOrLogin();
  }
  ngOnDestroy() {}

  private setActiveAccountOrLogin(): void {
    const accounts = this.authService.instance.getAllAccounts();
    debugger;
    if (accounts.length > 0) {
      this.authService.instance.setActiveAccount(accounts[0]);
      this.redirectToLoanPage();
    } else {
      this.login();
    }
  }

  public login(): void {
    const loginRequest = {
      scopes: ['user.read', 'profile'],
    };

    this.authService.loginRedirect(loginRequest);
  }

  public redirectToLoanPage(): void {
    debugger;
    // const loanNumber = this.storageService
    //   .getSessionStorageValue(STORAGE_KEYS.LOAN_NUMBER)
    //   ?.trim();
    // this.router.navigate(['/app/', loanNumber]);
    setTimeout(() => {
      debugger;
      this.router.navigate(['/dashboard']);
    }, 3000);
  }
  public handleRedirect(): void {
    this.handleRedirectSub$ = this.authService
      .handleRedirectObservable()
      .subscribe((response: AuthenticationResult) => {
        this.loginResponse = response;
        console.log('MSAL RESPONSE', response);
        debugger;

        if (response !== null && response.account !== null) {
          this.authService.instance.setActiveAccount(response.account);
          const userName = response.account.username.replace(
            '@loandepot.com',
            ''
          );
          this.storageService.setSessionStorageValue(
            STORAGE_KEYS.USER_NAME,
            userName
          );
          // Authentication successful
          console.log('User successfully logged in!');
          this.showRedirect = true;
          debugger;
          this.redirectToLoanPage();
        } else {
          // Authentication failed
          console.log('User login failed!');
          debugger;
        }
      });
  }
}
