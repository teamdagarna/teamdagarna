import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { RegisteredComponent } from './components/registered/registered.component';
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
import { FilterPipe } from './shared/filter.pipe';
import { StoragePipe } from './shared/storage.pipe';
import { AboutComponent } from './components/about/about.component';
import { AboutenglishComponent } from './components/aboutenglish/aboutenglish.component';
import { FaqComponent } from './components/faq/faq.component';
import { WeofferComponent } from './components/weoffer/weoffer.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { InterviewComponent } from './components/interview/interview.component';
import { AddeventComponent } from './components/admincomponents/addevent/addevent.component';
import { InterviewsComponent } from './components/admincomponents/interviews/interviews.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EventsComponent } from './components/events/events.component';

import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import { EventComponent } from './components/event/event.component';
import { AdmineventsComponent } from './components/admincomponents/adminevents/adminevents.component';
import { AdmineventComponent } from './components/admincomponents/adminevent/adminevent.component';

import { DatePipe } from '@angular/common';


registerLocaleData(localeSv, 'sv');

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
    RegisteredComponent,
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
    InterviewapplicationComponent,
    FilterPipe,
    StoragePipe,
    AboutComponent,
    AboutenglishComponent,
    FaqComponent,
    WeofferComponent,
    VolunteerComponent,
    InterviewComponent,
    AddeventComponent,
    InterviewsComponent,
    EventsComponent,
    EventComponent,
    AdmineventsComponent,
    AdmineventComponent
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
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
        { path: 'addstaff', component: AddstaffComponent },
        { path: 'addevent', component: AddeventComponent },
        { path: 'interviews', component: InterviewsComponent },
        { path: 'events/:id', component: AdmineventComponent },
        { path: 'events', component: AdmineventsComponent },
      ] },
    { path: 'dreamteam', component: TeamComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'registered', component: RegisteredComponent },
    { path: 'forgotpass', component: ForgotComponent },
    { path: 'about', component: AboutComponent },
    { path: 'about-english', component: AboutenglishComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'weoffer', component: WeofferComponent },
    { path: 'sokvard', component: VolunteerComponent },
    { path: 'interview', component: InterviewComponent },
    { path: 'events/:id', component: EventComponent },
    { path: 'events', component: EventsComponent }
    ])
  ],
  providers: [AuthService,AngularFireAuth,ThirdapiService,AdminGuard, PlatinumadminGuard, FirestoreService,DatePipe, { provide: LOCALE_ID, useValue: 'sv' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
