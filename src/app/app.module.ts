import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';

// SERVICES
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { ThirdapiService } from './services/thirdapi.service';
import { AdminGuard } from './services/admin.guard';
import { PlatinumadminGuard } from './services/platinumadmin.guard';

import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NgAisModule } from 'angular-instantsearch';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegistratedComponent } from './components/registrated/registrated.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/admincomponents/dashboard/dashboard.component';
import { UsersComponent } from './components/admincomponents/users/users.component';
import { UserComponent } from './components/admincomponents/user/user.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AdmincompaniesComponent } from './components/admincomponents/admincompanies/admincompanies.component';
import { CompanyComponent } from './components/admincomponents/company/company.component';
import { AddcompanyComponent } from './components/admincomponents/addcompany/addcompany.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddstaffComponent } from './components/admincomponents/addstaff/addstaff.component';
import { InterviewapplicationComponent } from './components/interviewapplication/interviewapplication.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    AdminComponent,
    TeamComponent,
    FooterComponent,
    HeaderComponent,
    SignupComponent,
    RegistratedComponent,
    NotificationComponent,
    ForgotComponent,
    ProfileComponent,
    DashboardComponent,
    UsersComponent,
    UserComponent,
    CompaniesComponent,
    AdmincompaniesComponent,
    CompanyComponent,
    AddcompanyComponent,
    SpinnerComponent,
    AddstaffComponent,
    InterviewapplicationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    NgAisModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'dreamteamadmin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
        { path: '', component: DashboardComponent },
        { path: 'users', component: UsersComponent },
        { path: 'modifyuser/:id', component: UserComponent },
        { path: 'companies', component: AdmincompaniesComponent },
        { path: 'modifycompany/:id', component: CompanyComponent },
        { path: 'addcompany', component: AddcompanyComponent },
        { path: 'addstaff', component: AddstaffComponent }
      ] },
    { path: 'dreamteam', component: TeamComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'registrated', component: RegistratedComponent },
    { path: 'forgotpass', component: ForgotComponent },
    { path: 'companies', component: CompaniesComponent }
    ])

  ],
  providers: [AuthService,AngularFireAuth,ThirdapiService,AdminGuard, PlatinumadminGuard, FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
