// import { InternalNgModuleRef } from "@angular/core/src/linker/ng_module_factory";

export interface Roles {
  student?: boolean;
  dreamteamMember?: boolean;
  dreamteamPlatinumMember?: boolean;
}

export interface LeaderBoardUser {
  liuid: string;
  noOfPoints: number;
}

export interface AppCompetition {
  liuid: string;
  hasApp: boolean;
}

export interface User {
  uid: string;
  email: string;
  phoneNumber?: string;
  firstname: string;
  lastname: string;
  liuid: string;
  verified: boolean;
  program: string;
  year: string;
  engineerbachelor?: string;
  engineermaster?: string;
  specialfood?: string;
  nekorfek?: string;
  filfakspecialization?: string;
  roles: Roles;
  applications?: InterviewApplication;
}

export interface Offers {

}

export interface Seeking {

}

export interface Appearance {

}

export interface Interviewpackages {
  firstdaypackage1?: boolean;
  firstdaypackage2?: boolean;
  seconddaypackage1?: boolean;
  seconddaypackage2?: boolean;
}

export interface Company {
  // abbrev: string;
  name: string;
  industry: string;
  interviewpackages: Interviewpackages;
  treasurehunt?: boolean;
  treasurehuntTuesday?: boolean;
  treasurehuntWednesday?: boolean;
  about: string;
  values?: string;
  logopath: string;
  offersinterview: boolean;
  reqresume?: boolean;
  reqcl?: boolean;
  reqgrades?: boolean;
  reqmaster?: boolean;
  reqmotivation?: boolean;


  interviewinfo?: string;

  firstdayappearance?: boolean;
  seconddayappearance?: boolean;

  consulting?: boolean;
  industri?: boolean;
  logistik?: boolean;
  itteknik?: boolean;
  rekrytering?: boolean;
  bank?: boolean;
  retail?: boolean;
  fastigheter?: boolean;
  forening?: boolean;
  telekom?: boolean;
  revision?: boolean;
  companyRedovisning?: boolean;
  startup?: boolean;
  other?: boolean;

  internship?: boolean;
  masterthesis?: boolean;
  otherthesis?: boolean;
  parttime?: boolean;
  fulltime?: boolean;
  trainee?: boolean;
  summerjob?: boolean;
  abroad?: boolean;

  engineers?: boolean;
  filfakare?: boolean;
  firstyear?: boolean;
  secondyear?: boolean;
  thirdyear?: boolean;
  fourthyear?: boolean;
  fifthyear?: boolean;

  digitalMan?: boolean;
  finans?: boolean;
  industriellmarknad?: boolean;
  kvalitetVerksam?: boolean;
  logistikMaster?: boolean;
  projektInno?: boolean;
  produktionsledning?: boolean;
  strategiStyrning?: boolean;
  systemteknik?: boolean;
  maskinteknik?: boolean;
  bioteknik?: boolean;
  datateknik?: boolean;
  energiteknik?: boolean;
  redovisning?: boolean;
  ekonomistyrning?: boolean;
  strategiMarknad?: boolean;
  finansiellekonomi?: boolean;
  nationalekonomi?: boolean;
  ekonomiskanalys?: boolean;

  preTEAM?: boolean;
  totalapplicants?: number;
  seeopenapplicants?: boolean;
  pitchLecture?: boolean;
  startUpZone?: boolean;
  climateComp?: boolean;
  hemsida?: string;
  linkedIn?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  placeID?: string;

  jobTitle1?: string;
  jobInfo1?: string;
  jobProfile1?: string;
  jobBenefits1?: string;
  jobApplication1?: string;
  jobLocation1?: string;
  jobLink1?: string;

  jobTitle2?: string;
  jobInfo2?: string;
  jobProfile2?: string;
  jobBenefits2?: string;
  jobApplication2?: string;
  jobLocation2?: string;
  jobLink2?: string;
}

export interface Dreamteamer {
  fullname: string;
  primaryimagepath: string;
  secondaryimagepath?: string;
  position: string;
  linkedinurl?: string;
  about?: string;
  ordertoshow: number;
  phone: string;
  internationalphone: string;
  mail: string;
}

export interface InterviewApplication {
  applicant: string;
  company: string;
  companyname: string;
  firstname: string;
  lastname: string;
  liuid: string;
  phoneNumber: string;
  program: string;
  year: string;
  engineerbachelor?: string;
  engineermaster?: string;
  specialfood?: string;
  nekorfek?: string;
  filfakspecialization?: string;
  backup: boolean;
  backupnumber?: number;
  notselected: boolean;
  selected: boolean;
  pending: boolean;
  studentaccepted: boolean;
  studentnotanswered: boolean;
  studentdeclined: boolean;
  resumepath?: string;
  coverletterpath?: string;
  gradespath?: string;
  motivationpath?: string;
  day?: string;
  time?: string;
}

export interface Event {
  title: string;
  ingress?: string;
  about: string;
  preorunder: string;
  location: string;
  eventstarts: Date;
  eventends: Date;
  signonstarts?: Date;
  signonends?: Date;
  signoffends?: Date;
  maxattendance: number;
  foodportions: number;
  published: boolean;
  coolness: number;
  imagepath: string;
  signon: boolean;
}

export interface Blogpost {
  title: string;
  ingress?: string;
  about: string;
  primaryimagepath: string;
  priority: number;
  date: string;

}

export interface AttendEvent {
  event: string;
  eventtitle: string;
  attendant: string;
  firstname: string;
  lastname: string;
  liuid: string;
  specialfood?: string;
  getsfood: boolean;
  waitinglist: boolean;
  timestamp: Date;
  checkedin: boolean;
}

export interface Code {
  code: string;
  company: string;
  companyname: string;
}