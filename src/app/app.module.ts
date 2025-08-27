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
import { CompanyGuard } from './services/company.guard';

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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddstaffComponent } from './components/admincomponents/addstaff/addstaff.component';
import { FilterPipe } from './shared/filter.pipe';
import { StoragePipe } from './shared/storage.pipe';
import { AboutComponent } from './components/about/about.component';
import { AboutenglishComponent } from './components/aboutenglish/aboutenglish.component';
import { EducationsComponent } from './components/educations/educations.component';
import { FaqComponent } from './components/faq/faq.component';
import { WeofferComponent } from './components/weoffer/weoffer.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { AddeventComponent } from './components/admincomponents/addevent/addevent.component';
import { ProductportfolioComponent } from './components/productportfolio/productportfolio.component';
import { FramtidschansenComponent } from './components/framtidschansen/framtidschansen.component';
import { exsiteccompetitionComponent } from './components/exsiteccompetition/exsiteccompetition.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './components/events/events.component';

import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import { AdmineventsComponent } from './components/admincomponents/adminevents/adminevents.component';
import { AdmineventComponent } from './components/admincomponents/adminevent/adminevent.component';

import { DatePipe } from '@angular/common';

import { QuillModule } from 'ngx-quill';
import { CompanysigninComponent } from './components/companycomponents/companysignin/companysignin.component';
import { CheckinComponent } from './components/admincomponents/checkin/checkin.component';
import { CompanymapComponent } from './components/companymap/companymap.component';
import { DreamteamsComponent } from './components/admincomponents/dreamteams/dreamteams.component';
import { MapComponent } from './components/map/map.component';
import { ApplyComponent } from './components/apply/apply.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SustainabilityComponent } from './components/sustainability/sustainability.component';
import { SponsorComponent } from './components/sponsors/sponsors.component';
import { FavouritecompaniesComponent } from './components/favouritecompanies/favouritecompanies.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { CompanysignsComponent } from './components/companysigns/companysigns.component';
import { FairscheduleComponent } from './components/fairschedule/fairschedule.component';
import { ExhibitorsPreRegistrationComponent } from './components/exhibitors-pre-registration/exhibitors-pre-registration.component';
import { ApplicationComponent } from './components/application/application.component';
import { ExhibitorComponent } from './components/exhibitor/exhibitor.component';
import { CasecompComponent } from './components/casecomp/casecomp.component';
import { CvReviewComponent } from './components/cv-review/cv-review.component';
import { BusinessBattleComponent } from './components/businessbattle/businessbattle.component';
import { JobcatalogueComponent } from './components/jobcatalogue/jobcatalogue.component';
import { CompaniescatalogueComponent } from './components/companiescatalogue/companiescatalogue.component';
import { InforComponent } from './components/infor/infor.component';
import { HostsComponent } from './components/hosts/hosts.component';



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
    SponsorComponent,
    SpinnerComponent,
    AddstaffComponent,
    FilterPipe,
    StoragePipe,
    AboutComponent,
    AboutenglishComponent,
    EducationsComponent,
    FaqComponent,
    WeofferComponent,
    VolunteerComponent,
    AddeventComponent,
    EventsComponent,
    AdmineventsComponent,
    AdmineventComponent,
    CompanysigninComponent,
    CheckinComponent,
    CompanymapComponent,
    DreamteamsComponent,
    MapComponent,
    ApplyComponent,
    SignoutComponent,
    SustainabilityComponent,
    FavouritecompaniesComponent,
    PrivacypolicyComponent,
    CompanysignsComponent,
    ProductportfolioComponent,
    FramtidschansenComponent,
    exsiteccompetitionComponent,
    FairscheduleComponent,
    ExhibitorsPreRegistrationComponent,
    ApplicationComponent,
    ExhibitorComponent,
    CasecompComponent,
    CvReviewComponent,
    BusinessBattleComponent,
    JobcatalogueComponent,
    InforComponent,
    HostsComponent
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
    QuillModule,
    RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'dreamteamadmin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
        { path: '', component: DashboardComponent },
        { path: 'addstaff', component: AddstaffComponent },
        { path: 'addevent', component: AddeventComponent },
        { path: 'events/:id', component: AdmineventComponent },
        { path: 'events', component: AdmineventsComponent },
        { path: 'checkin', component: CheckinComponent },
        { path: 'dreamteam', component: DreamteamsComponent },
      ] },
    { path: 'dreamteam', component: TeamComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signout', component: SignoutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'registered', component: RegisteredComponent },
    { path: 'forgotpass', component: ForgotComponent },
    { path: 'sponsors', component: SponsorComponent },
    { path: 'arbetsmarknadsmassa', component: AboutComponent },
    { path: 'career-fair', component: AboutenglishComponent },
    { path: 'companies', component: CompaniescatalogueComponent },
    { path: 'educations', component: EducationsComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'weoffer', component: WeofferComponent },
    { path: 'sokvard', component: VolunteerComponent },
    // { path: 'sokdreamteam', component: ApplyComponent },
    { path: 'events', component: EventsComponent },
    { path: 'fairmap', component: CompanymapComponent },
    { path: 'companysignin', component: CompanysigninComponent },
    { path: 'pre-registration', component: ExhibitorsPreRegistrationComponent},
    { path: 'hallbarhet', component: SustainabilityComponent},
    { path: 'integritetspolicy', component: PrivacypolicyComponent},
    { path: 'find', component: MapComponent },
    // { path: 'foretagsskyltar', component: CompanysignsComponent},
    { path: 'productportfolio', component: ProductportfolioComponent},
    { path: 'framtidschansen', component: FramtidschansenComponent},
    // { path: 'exsitecsignup', component: exsiteccompetitionComponent},
    { path: 'fairschedule', component: FairscheduleComponent},
    { path: 'interviewapplication', component: ApplicationComponent},
    { path: 'exhibitor', component: ExhibitorComponent},
    { path: 'casetavling', component: CasecompComponent},
    { path: 'cv-review', component: CvReviewComponent},
    { path: 'businessbattle', component: BusinessBattleComponent},
    { path: 'jobcatalogue', component: JobcatalogueComponent},
    { path: 'infordagarna', component: InforComponent},
    { path: 'hosts', component: HostsComponent}
    ])
  ],
  providers: [AuthService,AngularFireAuth,ThirdapiService,AdminGuard, PlatinumadminGuard, CompanyGuard, FirestoreService,DatePipe, { provide: LOCALE_ID, useValue: 'sv' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
