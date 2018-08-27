export interface Roles {
    student?: boolean;
    dreamteamMember?: boolean;
    dreamteamPlatinumMember?: boolean;
 }

export interface User {
  uid: string;
  email: string;
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
  about: string;
  values: string;
  logopath: string;
  offersinterview: boolean;

  firstdayappearance?: boolean;
  seconddayappearance?: boolean;

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
  applicant: User;
  companyabbrev: string;
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
  gradepath?: string;
  day?: string;
  time?: string;
}
