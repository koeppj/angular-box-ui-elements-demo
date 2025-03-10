import { Routes } from '@angular/router';
import { PreBoxLoginComponent } from './pages/pre-box-login/pre-box-login.component';
import { PostBoxLoginComponent } from './pages/post-box-login/post-box-login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContentExployerDemoComponent } from './pages/content-exployer-demo/content-exployer-demo.component';
import { ContentUploadDemoComponent } from './pages/content-upload-demo/content-upload-demo.component';
import { ContentPreviewDemoComponent } from './pages/content-preview-demo/content-preview-demo.component';
import { ContractListPageComponent } from './pages/contract-list-page/contract-list-page.component';
import { BoxSignDemoComponent } from './pages/box-sign-demo/box-sign-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'content-explorer', component: ContentExployerDemoComponent },
  { path: 'content-uploader', component: ContentUploadDemoComponent },
  { path: 'content-preview', component: ContentPreviewDemoComponent },
  { path: 'list-contract', component: ContractListPageComponent},
  { path: 'pre-login', component: PreBoxLoginComponent },
  { path: 'post-login', component: PostBoxLoginComponent },
  { path: 'list-signature-requests', component: BoxSignDemoComponent }
];

