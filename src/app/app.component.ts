import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BoxOauthStatusComponent } from './components/box-oauth-status/box-oauth-status.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, RouterOutlet, BoxOauthStatusComponent,ToastComponent]
})
export class AppComponent {
  title = 'angular-box-ui-elements-cdn';

  public doLogin() {
    const popup = window.open(
      '/pre-login',
      '_blank',
      'width=600,height=700'
    )
  }
}