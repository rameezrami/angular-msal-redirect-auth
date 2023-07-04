import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MsalComponent } from './msal/msal.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

//msal stuff start
import {
  MsalModule,
  MSAL_INSTANCE,
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
// import { MsalAuthGuard } from '@msal-workspace/utils';

import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';

const TEMP_REDIRECT_URL =
  'http://stborrowerincomedv1tvkv.z5.web.core.windows.net/msal';

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.appSettings.CLIENT_ID,
      authority: `https://login.microsoftonline.com/${environment.appSettings.TENANT_ID}`,
      redirectUri: environment.appSettings.REDIRECT_URL,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: true,
    },
    system: {
      loggerOptions: {
        loggerCallback: (l: any) => {
          console.log('L:', l);
        },
        piiLoggingEnabled: false,
      },
    },
  });
}
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,

    authRequest: {
      scopes: ['user.read'],
    },
  };
}
//msal stuff ends

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'hhdmsal', component: MsalComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'index.html', component: MsalRedirectComponent },
  { path: 'dsdsmsal', component: MsalRedirectComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MsalComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(APP_ROUTES), MsalModule],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory,
    },
    MsalService,
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
