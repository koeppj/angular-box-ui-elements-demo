import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeadService } from '@app/services/head.service';
import { BoxDevTokenPromptComponent } from './components/box-dev-token-prompt/box-dev-token-prompt.component';
import { BoxTokenService } from './services/box-token.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PreBoxLoginComponent } from './pages/pre-box-login/pre-box-login.component';
import { PostBoxLoginComponent } from './pages/post-box-login/post-box-login.component';
import { BoxOauthStatusComponent } from './components/box-oauth-status/box-oauth-status.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoxFolderInputComponent } from "./components/box-folder-input/box-folder-input.component";
import { BoxFileInputComponent } from './components/box-file-input/box-file-input.component';
import { ContentUploadMetadataComponent } from './pages/content-upload-metadata/content-upload-metadata.component';
import { BoxOauthTokenService } from './services/box-oauth-token.service';
import { BoxLocalToolsService } from './services/box-local-tools.service';
import { ContentExplorerComponent } from './components/content-explorer/content-explorer.component';
import { ContentExployerDemoComponent } from './pages/content-exployer-demo/content-exployer-demo.component';
import { ContentUploadComponent } from './components/content-upload/content-upload.component';
import { ContentUploadDemoComponent } from './pages/content-upload-demo/content-upload-demo.component';
import { ContentPreviewComponent } from './components/content-preview/content-preview.component';
import { ContentPreviewDemoComponent } from './pages/content-preview-demo/content-preview-demo.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentExplorerComponent,
    ContentExployerDemoComponent,
    ContentUploadMetadataComponent,
    ContentUploadComponent,
    ContentUploadDemoComponent,
    ContentPreviewComponent,
    ContentPreviewDemoComponent,
    BoxDevTokenPromptComponent,
    PreBoxLoginComponent,
    PostBoxLoginComponent,
    BoxOauthStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BoxFolderInputComponent,
    BoxFileInputComponent,
    ContractFormComponent
],
  providers: [
    HeadService,
    BoxTokenService,
    BoxOauthTokenService,
    BoxLocalToolsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
