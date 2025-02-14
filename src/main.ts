/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { HeadService } from '@app/services/head.service';
import { BoxTokenService } from './app/services/box-token.service';
import { BoxOauthTokenService } from './app/services/box-oauth-token.service';
import { BoxLocalToolsService } from './app/services/box-local-tools.service';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule, NgbModule, NgbModalModule),
        HeadService,
        BoxTokenService,
        BoxOauthTokenService,
        BoxLocalToolsService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
