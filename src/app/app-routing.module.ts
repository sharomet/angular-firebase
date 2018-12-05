import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component'
import { PageLayoutComponent } from './components/layouts/page-layout/page-layout.component'
import { HomeComponent } from './components/home/home.component'
import { PageComponent } from './components/page/page.component'
import { UsersComponent } from './components/users/users.component'

const routes: Routes = [
  {
    path: '', 
    component: HomeLayoutComponent, 
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]
  },
  {
    path: '',
    component: PageLayoutComponent, 
    children: [
      { path: 'page', component: PageComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
