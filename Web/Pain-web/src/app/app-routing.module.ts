import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginPageComponent} from "./login-page/login-page.component";
import {PageSkeletonComponent} from "./page-skeleton/page-skeleton.component";

import { DashboardComponent } from "./page-skeleton/Content/dashboard/dashboard.component";
import { ClientsComponent } from "./page-skeleton/Content/clients/clients.component";
import { ConfigsComponent } from "./page-skeleton/Content/configs/configs.component";
import { UsersComponent } from "./page-skeleton/Content/users/users.component";
import { LogsComponent } from "./page-skeleton/Content/logs/logs.component";
import { ErrorPageComponent } from "./error-page/error-page.component";

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  {
    path: 'ui', component: PageSkeletonComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'logs', component: LogsComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'configs', component: ConfigsComponent},
      {path: 'users', component: UsersComponent},
    ]

  },
  {path: '**' , component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
