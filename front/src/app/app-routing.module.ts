import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { JoinComponent } from './pages/join/join.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
