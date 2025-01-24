import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
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