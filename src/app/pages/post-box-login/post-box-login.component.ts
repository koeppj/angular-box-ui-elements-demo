import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoxOauthTokenService } from '@app/services/box-oauth-token.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-post-box-login',
    templateUrl: './post-box-login.component.html',
    styleUrls: ['./post-box-login.component.scss'],
    imports: [AsyncPipe]
})
export class PostBoxLoginComponent implements OnInit {

  private lastMesssageSubject$ = new BehaviorSubject<string>('Waiting for Redirect');
  public lastMessage$ = this.lastMesssageSubject$.asObservable();

  constructor(private boxOAthTokenService: BoxOauthTokenService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(async params => {
      const code = params.get('code');
      this.lastMesssageSubject$.next(`Processing code ${code}...`);
      if (code) {
        await this.boxOAthTokenService.validateCode(code)
              .then(() => {
                window.close()
              })
              .catch(err => {
                this.lastMesssageSubject$.next(err.message)
              });
      }
      else {
        this.lastMesssageSubject$.next("No code returned!!!")
      }
    })
  }

}
