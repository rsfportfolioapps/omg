import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full',
    // children: [
    //   {
    //     path: 'home',
    //     loadChildren: './modules/home/home.module#HomeModule',
    //   }
    // ],
    // canActivate: [ IsLoggedInGuard ]
  },
  {
    path: 'upload',
    loadChildren: './modules/upload/upload.module#UploadModule',
    canActivate: [ IsLoggedInGuard ]
  },
  {
    path: 'inbox',
    loadChildren: './modules/inbox/inbox.module#InboxModule',
    // canActivate: [ IsLoggedInGuard ]
  },
  {
    path: 'search',
    loadChildren: './modules/search/search.module#SearchModule',
    // canActivate: [ IsLoggedInGuard ]
  },
  {
    path: 'history',
    loadChildren: './modules/history/history.module#HistoryModule',
    // canActivate: [ IsLoggedInGuard ]
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule',
    // canActivate: [ IsLoggedInGuard ]
  }
];

const materialModules = [
  MatProgressSpinnerModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [],
  imports: [
    ...materialModules,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
