import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { JoinComponent } from './pages/join/join.component';
import { AddToQueueComponent } from './pages/add-to-queue/add-to-queue.component';
import { CreateComponent } from './pages/create/create.component';
import { MediaComponent } from './pages/media/media.component';

const routes: Routes = [
  { path: '',   redirectTo: '/app/home', pathMatch: 'full' },
  {
    path: 'app',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'join',
        component: JoinComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'party',
        children: [
          {
            path: 'listen',
            component: MediaComponent
          }, {
            path: 'vote',
            component: AddToQueueComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
