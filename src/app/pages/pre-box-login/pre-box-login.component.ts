import { Component, OnInit } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';

@Component({
    selector: 'app-pre-box-login',
    templateUrl: './pre-box-login.component.html',
    styleUrls: ['./pre-box-login.component.scss']
})
export class PreBoxLoginComponent implements OnInit {

  constructor(private boxOAuthTokenServer: BoxOauthTokenService) {

  }
  ngOnInit(): void {
    this.showBoxLogin();
  }

  showBoxLogin() {
    let origin = window.location.origin;
    window.location.href = this.boxOAuthTokenServer.getAuthURL(`${origin}/post-login`);
  }

}
