import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreBoxLoginComponent } from './pages/pre-box-login/pre-box-login.component';
import { PostBoxLoginComponent } from './pages/post-box-login/post-box-login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContentUploadMetadataComponent } from './pages/content-upload-metadata/content-upload-metadata.component';
import { ContentExployerDemoComponent } from './pages/content-exployer-demo/content-exployer-demo.component';
import { ContentUploadDemoComponent } from './pages/content-upload-demo/content-upload-demo.component';
import { ContentPreviewDemoComponent } from './pages/content-preview-demo/content-preview-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'content-explorer', component: ContentExployerDemoComponent },
  { path: 'content-uploader', component: ContentUploadDemoComponent },
  { path: 'content-preview', component: ContentPreviewDemoComponent },
  { path: 'content-upload-metadata', component: ContentUploadMetadataComponent },
  { path: 'pre-login', component: PreBoxLoginComponent },
  { path: 'post-login', component: PostBoxLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
