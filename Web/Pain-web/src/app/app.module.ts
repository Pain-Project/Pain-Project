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
import { NavBarComponent } from './page-skeleton/nav-bar/nav-bar.component';
import { DashboardComponent } from './page-skeleton/Content/dashboard/dashboard.component';
import { LogsComponent } from './page-skeleton/Content/logs/logs.component';
import { ConfigsComponent } from './page-skeleton/Content/configs/configs.component';
import { ClientsComponent } from './page-skeleton/Content/clients/clients.component';
import { UsersComponent } from './page-skeleton/Content/users/users.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import { DialogElementsExampleDialog} from "./page-skeleton/Content/configs/configs.component";
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';


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
    UsersComponent,
    DialogElementsExampleDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    ScrollingModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
