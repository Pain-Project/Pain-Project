import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from "@angular/material/radio";
import { LoginPageComponent } from './login-page/login-page.component';
import { PageSkeletonComponent } from './page-skeleton/page-skeleton.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from '../Content/dashboard/dashboard.component';
import { LogsComponent } from '../Content/logs/logs.component';
import { ConfigsComponent } from '../Content/configs/configs.component';
import { ClientsComponent } from '../Content/clients/clients.component';
import { UsersComponent } from '../Content/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageSkeletonComponent,
    NavBarComponent,
    DashboardComponent,
    LogsComponent,
    ConfigsComponent,
    ClientsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
