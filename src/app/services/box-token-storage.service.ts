import { Injectable } from '@angular/core';
import { TokenStorage } from 'box-typescript-sdk-gen/lib/box/tokenStorage.generated';
import { AccessToken } from 'box-typescript-sdk-gen/lib/schemas/accessToken.generated';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BoxTokenStorageService  implements TokenStorage {

  store(token: AccessToken): Promise<undefined> {
    localStorage.setItem(environment.BoxTokenStorageKeyName,JSON.stringify(token));
    return Promise.resolve(undefined);
  }
  get(): Promise<undefined | AccessToken> {
    let tokenStr = localStorage.getItem(environment.BoxTokenStorageKeyName);
    if (tokenStr) {
      return Promise.resolve(JSON.parse(tokenStr))
    }
    else {
      return Promise.resolve(undefined);
    }
  }
  clear(): Promise<undefined> {
    localStorage.removeItem(environment.BoxTokenStorageKeyName);
    return Promise.resolve(undefined);
  }

  tokenPresent(): Promise<boolean> {
    return Promise.resolve(localStorage.getItem(environment.BoxTokenStorageKeyName) !== null);
  }

  storageKeyName(): string {
    return environment.BoxTokenStorageKeyName
  }

}
