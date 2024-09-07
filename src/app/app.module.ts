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
import { EducationsComponent } from './components/educations/educations.component';
import { FaqComponent } from './components/faq/faq.component';
import { WeofferComponent } from './components/weoffer/weoffer.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';
import { InterviewComponent } from './components/interview/interview.component';
import { AddeventComponent } from './components/admincomponents/addevent/addevent.component';
import { AddblogpostsComponent } from './components/admincomponents/addblogposts/addblogposts.component';
import { BlogpostsComponent } from './components/blogposts/blogposts.component';
import { InterviewsComponent } from './components/admincomponents/interviews/interviews.component';
import { ProductportfolioComponent } from './components/productportfolio/productportfolio.component';
import { JobOpportunitiesComponent } from './components/jobopportunities/jobopportunities.component';
import { GoldpiecesComponent } from './components/goldpieces/goldpieces.component';
import { exsiteccompetitionComponent } from './components/exsiteccompetition/exsiteccompetition.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EventsComponent } from './components/events/events.component';

import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import { EventComponent } from './components/event/event.component';
import { AdmineventsComponent } from './components/admincomponents/adminevents/adminevents.component';
import { AdmineventComponent } from './components/admincomponents/adminevent/adminevent.component';

import { DatePipe } from '@angular/common';

import { QuillModule } from 'ngx-quill';
import { CompanysigninComponent } from './components/companycomponents/companysignin/companysignin.component';
import { CompanycodesComponent } from './components/admincomponents/companycodes/companycodes.component';
import { SelectComponent } from './components/companycomponents/select/select.component';
import { CodeComponent } from './components/companycomponents/code/code.component';
import { CheckinComponent } from './components/admincomponents/checkin/checkin.component';
import { CompanymapComponent } from './components/companymap/companymap.component';
import { AllinterviewsComponent } from './components/admincomponents/allinterviews/allinterviews.component';
import { DreamteamsComponent } from './components/admincomponents/dreamteams/dreamteams.component';
import { BlogpostComponent } from './components/admincomponents/blogpost/blogpost.component';
import { MapComponent } from './components/map/map.component';
import { InterviewscheduleComponent } from './components/admincomponents/interviewschedule/interviewschedule.component';
import { TreasurehuntComponent } from './components/treasurehunt/treasurehunt.component';
import { ApplyComponent } from './components/apply/apply.component';
import { CompanyapplicationComponent } from './components/companyapplication/companyapplication.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SustainabilityComponent } from './components/sustainability/sustainability.component';
import { SponsorComponent } from './components/sponsors/sponsors.component';
import { FavouritecompaniesComponent } from './components/favouritecompanies/favouritecompanies.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { RegistertreasurehuntComponent } from './components/registertreasurehunt/registertreasurehunt.component';
import { TreasurecodesComponent } from './components/admincomponents/treasurecodes/treasurecodes.component';
import { TreasurescoreComponent } from './components/admincomponents/treasurescore/treasurescore.component';
import { AppcompetitionComponent } from './components/appcompetition/appcompetition.component';
import { CompanysignsComponent } from './components/companysigns/companysigns.component';
import { LeaderboardComponent} from './components/leaderboard/leaderboard.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { SpecialEventComponent } from './components/specialevent/specialevent.component';
import { VRComponent } from './components/vr/vr.component';
import { FairscheduleComponent } from './components/fairschedule/fairschedule.component';
import { ExhibitorsPreRegistrationComponent } from './components/exhibitors-pre-registration/exhibitors-pre-registration.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplicationComponent } from './components/application/application.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ExhibitorComponent } from './components/exhibitor/exhibitor.component';
import { CasecompComponent } from './components/casecomp/casecomp.component';
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
    EducationsComponent,
    FaqComponent,
    WeofferComponent,
    VolunteerComponent,
    InterviewComponent,
    AddeventComponent,
    AddblogpostsComponent,
    BlogpostsComponent,
    InterviewsComponent,
    EventsComponent,
    EventComponent,
    AdmineventsComponent,
    AdmineventComponent,
    CompanysigninComponent,
    CompanycodesComponent,
    SelectComponent,
    CodeComponent,
    CheckinComponent,
    CompanymapComponent,
    AllinterviewsComponent,
    DreamteamsComponent,
    BlogpostComponent,
    MapComponent,
    InterviewscheduleComponent,
    TreasurehuntComponent,
    ApplyComponent,
    CompanyapplicationComponent,
    SignoutComponent,
    SustainabilityComponent,
    FavouritecompaniesComponent,
    PrivacypolicyComponent,
    RegistertreasurehuntComponent,
    TreasurecodesComponent,
    TreasurescoreComponent,
    AppcompetitionComponent,
    CompanysignsComponent,
    LeaderboardComponent,
    QuizComponent,
    SpecialEventComponent,
    VRComponent,
    ProductportfolioComponent,
    JobOpportunitiesComponent,
    GoldpiecesComponent,
    exsiteccompetitionComponent,
    FairscheduleComponent,
    ExhibitorsPreRegistrationComponent,
    RegisterComponent,
    ApplicationComponent,
    CandidateComponent,
    ExhibitorComponent,
    CasecompComponent,
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
        { path: 'users', component: UsersComponent, canActivate: [PlatinumadminGuard]},
        { path: 'modifyuser/:id', component: UserComponent, canActivate: [PlatinumadminGuard] },
        { path: 'companies', component: AdmincompaniesComponent },
        { path: 'modifycompany/:id', component: CompanyComponent },
        { path: 'addcompany', component: AddcompanyComponent },
        { path: 'addstaff', component: AddstaffComponent },
        { path: 'addevent', component: AddeventComponent },
        { path: 'addblogposts', component: AddblogpostsComponent },
        { path: 'interviews', component: InterviewsComponent, canActivate: [PlatinumadminGuard] },
        { path: 'events/:id', component: AdmineventComponent },
        { path: 'events', component: AdmineventsComponent },
        { path: 'companycodes', component: CompanycodesComponent, canActivate: [PlatinumadminGuard] },
        { path: 'treasurecodes', component: TreasurecodesComponent, canActivate: [PlatinumadminGuard] },
        { path: 'allinterviews', component: AllinterviewsComponent, canActivate: [PlatinumadminGuard] },
        { path: 'interviewschedule', component: InterviewscheduleComponent, canActivate: [PlatinumadminGuard] },
        { path: 'checkin', component: CheckinComponent },
        { path: 'dreamteam', component: DreamteamsComponent },
        { path: 'blogpost', component: BlogpostComponent },
        { path: 'treasurescore', component: TreasurescoreComponent }
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
    //{ path: 'sokvard', component: VolunteerComponent },
    { path: 'sokdreamteam', component: ApplyComponent },
    //{ path: 'interview', component: InterviewComponent },
    { path: 'events/:id', component: EventComponent },
    { path: 'events', component: EventsComponent },
    { path: 'blogposts', component: BlogpostsComponent },
    //{ path: 'masskarta', component: CompanymapComponent },
    { path: 'companysignin', component: CompanysigninComponent },
    //{ path: 'companyapplication', component: CompanyapplicationComponent},
    { path: 'pre-registration', component: ExhibitorsPreRegistrationComponent},
    { path: 'hallbarhet', component: SustainabilityComponent},
    //{ path: 'kontaktsamtaltest', component: InterviewapplicationComponent},
    { path: 'integritetspolicy', component: PrivacypolicyComponent},
    { path: 'find', component: MapComponent },
    //{ path: 'massjakt', component: TreasurehuntComponent },
    //{ path: 'favoritforetag', component: FavouritecompaniesComponent},
    { path: 'pusseljakten', component: RegistertreasurehuntComponent},
    { path: 'foretagsskyltar', component: CompanysignsComponent},
    { path: 'companyguest', component: SelectComponent, canActivate: [CompanyGuard] },
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'quiz', component: QuizComponent},
    { path: 'specialevent', component: SpecialEventComponent},
    { path: 'vr', component: VRComponent},
    { path: 'productportfolio', component: ProductportfolioComponent},
    { path: 'jobopportunities', component: JobOpportunitiesComponent},
    { path: 'framtidschansen', component: GoldpiecesComponent},
    { path: 'exsitecsignup', component: exsiteccompetitionComponent},
    { path: 'fairschedule', component: FairscheduleComponent},
    { path: 'registration', component: RegisterComponent},
    { path: 'interviewapplication', component: ApplicationComponent},
    { path: 'candidate', component: CandidateComponent},
    { path: 'exhibitor', component: ExhibitorComponent},
    { path: 'casetavling', component: CasecompComponent},
    { path: 'jobcatalogue', component: JobcatalogueComponent},
    { path: 'infordagarna', component: InforComponent},
    { path: 'hosts', component: HostsComponent}
    ])
  ],
  providers: [AuthService,AngularFireAuth,ThirdapiService,AdminGuard, PlatinumadminGuard, CompanyGuard, FirestoreService,DatePipe, { provide: LOCALE_ID, useValue: 'sv' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
