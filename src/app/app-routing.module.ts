import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './components/layouts/home-layout/home-layout.component'
import { PageLayoutComponent } from './components/layouts/page-layout/page-layout.component'
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component'

import { HomeComponent } from './components/home/home.component'

import { PageComponent } from './components/page/page.component'
import { UsersComponent } from './components/users/users.component'

import { CategoriesComponent } from './components/admin/categories/categories.component'
import { DashboardComponent } from './components/admin/dashboard/dashboard.component'

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
  {
    path: '', 
    component: AdminLayoutComponent, 
    children: [
      { path: 'admin/dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'admin/categories', component: CategoriesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
