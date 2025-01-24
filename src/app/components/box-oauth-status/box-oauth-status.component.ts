import { Component } from '@angular/core';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';

@Component({
    selector: 'app-box-oauth-status',
    templateUrl: './box-oauth-status.component.html',
    styleUrls: ['./box-oauth-status.component.scss'],
    standalone: false
})
export class BoxOauthStatusComponent {

  boxOAuthService: BoxOauthTokenService;

  constructor(arg0: BoxOauthTokenService) {
    this.boxOAuthService = arg0;
  }

  public onLogin() {
    const popup = window.open(
      '/pre-login',
      '_blank',
      'width=600,height=700'
    )
  }
}
