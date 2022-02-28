import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from "@angular/material/radio";
import { LoginPageComponent } from './login-page/login-page.component';
import { PageSkeletonComponent } from './page-skeleton/page-skeleton.component';
import { NavBarComponent } from './page-skeleton/nav-bar/nav-bar.component';
import { DashboardComponent } from './page-skeleton/Content/dashboard/dashboard.component';
import { LogsComponent } from './page-skeleton/Content/logs/logs.component';
import { ConfigsComponent } from './page-skeleton/Content/configs/configs.component';
import { ClientsComponent } from './page-skeleton/Content/clients/clients.component';
import { UsersComponent } from './page-skeleton/Content/users/users.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { DialogElementsExampleDialog } from "./page-skeleton/Content/configs/configs.component";
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { ErrorPageComponent } from './error-page/error-page.component';

import { SettingsComponent } from './components/dialogs/settings-dialog/settings.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatRippleModule } from "@angular/material/core";
import { RemoveDialogComponent } from './components/dialogs/remove-dialog/remove-dialog.component';
import { AddUserDialogComponent } from './components/dialogs/add-user-dialog/add-user-dialog.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { Stats1dayComponent } from './page-skeleton/Content/dashboard/stats1day/stats1day.component';
import { Stats7dayComponent } from './page-skeleton/Content/dashboard/stats7day/stats7day.component';
import { ProblemsComponent } from './page-skeleton/Content/dashboard/problems/problems.component';
import { AddconfigbuttonComponent } from './page-skeleton/Content/dashboard/addconfigbutton/addconfigbutton.component';
import { GrafComponent } from './page-skeleton/Content/dashboard/graf/graf.component';
import { CompletedComponent } from './page-skeleton/Content/dashboard/completed/completed.component';
import { AwaitsComponent } from './page-skeleton/Content/dashboard/awaits/awaits.component';
import { BackupsizeComponent } from './page-skeleton/content/dashboard/backupsize/backupsize.component';
import { AddConfigComponent } from './page-skeleton/Content/add-config/add-config.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { EditConfigComponent } from './page-skeleton/Content/edit-config/edit-config.component';

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
    SettingsComponent,
    RemoveDialogComponent,
    ErrorPageComponent,
    AddUserDialogComponent,
    AddUserFormComponent,
    Stats1dayComponent,
    Stats7dayComponent,
    ProblemsComponent,
    AddconfigbuttonComponent,
    GrafComponent,
    CompletedComponent,
    AwaitsComponent,
    BackupsizeComponent,
    AddConfigComponent,
    StepperComponent,
    EditConfigComponent,
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
    MatDividerModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    NgSelectModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
