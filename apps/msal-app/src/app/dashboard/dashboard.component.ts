import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'msal-workspace-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  account: any = null;

  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    this.account = this.msalService.instance.getActiveAccount();

    console.log(this.account);
    console.log(this.msalService.instance.getAllAccounts());
  }

  logout() {
    this.msalService.logout();
  }
}
