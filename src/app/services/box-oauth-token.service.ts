import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { BoxTokenStorageService } from './box-token-storage.service';
import { BoxClient, BoxDeveloperTokenAuth, BoxOAuth, OAuthConfig } from 'box-typescript-sdk-gen';
import { environment } from '@environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BoxOauthTokenService {

  private isAuthenticatedSubect$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubect$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  private accessTokenSubject$ = new BehaviorSubject<string | undefined>(undefined);
  public accessToken$ = this.accessTokenSubject$.asObservable();

  private authMessageSubject$ = new BehaviorSubject<string>('');
  public authMessage$ = this.authMessageSubject$.asObservable();

  public boxClient!: BoxClient;
  boxOAuth: BoxOAuth;
  private refreshTokenInterval: any;

  constructor(private router: Router, 
              private boxTokenStorage: BoxTokenStorageService) {
    const oAuthConfig = new OAuthConfig({
      clientId: environment.BoxClientID,
      clientSecret: environment.BoxClientSecret,
      tokenStorage: boxTokenStorage
    })
    this.boxOAuth = new BoxOAuth({config: oAuthConfig});
    this.boxClient = new BoxClient({auth: this.boxOAuth});

    this.boxTokenStorage.tokenPresent().then(present => {
      if (present) {
        console.log("Refeshing on Init");
        this.refreshToken()     
      }
    })

    window.addEventListener('storage', (event) => {
      if (event.key !== boxTokenStorage.storageKeyName() && event.key !== null) {
        return;
      }
      if (event.key === undefined) {
        return;
      }
      if (event.newValue === null && event.oldValue !== null) {
        this.setStatusToLoggedOff("Logged off...");
      } else if (event.newValue === null && event.oldValue === null) {
        this.setStatusToLoggedOff("Logged off...");
      } else if (event.newValue !== null && event.oldValue !== null) {
        this.authMessageSubject$.next("Token refreshed...");
      } else {
        console.log("Refreshing Token after Event!");
        this.refreshToken();
      }
    })

    this.refreshTokenInterval = setInterval(() => {
      /*
       Only try to refesh of the token if a login cookie is 
       is present
      */
      this.boxTokenStorage.tokenPresent().then(present => {
        console.debug("Starting Token Refresh...");
        if (present) {
          console.log("Refreshing Token!");
          this.refreshToken();
        }        
      }).catch(err => {
        this.authMessageSubject$.next(`Error checking for token:${err.message}`);
      });
    }, environment.BoxAccessTokenRefreshInterval * 60 * 1000); // 40 minutes in milliseconds  
  }

  public getAuthURL(redirectUri: string): string {
    let url = this.boxOAuth.getAuthorizeUrl({redirectUri: redirectUri});
    console.log(url);
    return url;
  }

  public async validateCode(code: string)  {
    await this.boxOAuth.getTokensAuthorizationCodeGrant(code).then(token => {
      if (token.accessToken) {
        let devToken = new BoxDeveloperTokenAuth({token: token.accessToken});
        this.boxClient = new BoxClient({auth: devToken});
        this.authMessageSubject$.next("Authenticated...");
        this.accessTokenSubject$.next(token.accessToken);
        this.isAuthenticatedSubect$.next(true);
      } else {
        this.setStatusToLoggedOff("Missing Access Token");
      }
    }).catch(error => {
      this.setStatusToLoggedOff(error.message)
    });
  }

  private refreshToken() {
    this.boxOAuth.refreshToken().then(token => {
      if (token.accessToken) {
        let devToken = new BoxDeveloperTokenAuth({token: token.accessToken});
        this.boxClient = new BoxClient({auth: devToken});
        this.authMessageSubject$.next("Token Refreshed");
        this.accessTokenSubject$.next(token.accessToken);
        this.isAuthenticatedSubect$.next(true);
      } else {
        this.setStatusToLoggedOff("Missing Access Token");
      }
    }).catch(error => {
      this.setStatusToLoggedOff(error.message);
    })
  }

  private setStatusToLoggedOff(authMessage: string) {
    this.isAuthenticatedSubect$.next(false);
    this.accessTokenSubject$.next(undefined);
    this.authMessageSubject$.next(authMessage)
  }
}
