import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'msal-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private msalService: MsalService) {}

  ngOnInit(): void {}

  login() {
    this.msalService.instance.loginRedirect();
  }
}
