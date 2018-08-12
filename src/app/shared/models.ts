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
  roles: Roles;
  applications?: InterviewApplication;
}

export interface Offers {
  internship?: boolean;
  masterthesis?: boolean;
  otherthesis?: boolean;
  parttime?: boolean;
  fulltime?: boolean;
  trainee?: boolean;
  summerjob?: boolean;
  abroad?: boolean;
}

export interface Seeking {
  engineers?: boolean;
  filfakare?: boolean;
  firstyear?: boolean;
  secondyear?: boolean;
  thirdyear?: boolean;
  fourthyear?: boolean;
  fifthyear?: boolean;
}

export interface Appearance {
  firstdayappearance?: boolean;
  seconddayappearance?: boolean;
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
  offers: Offers;
  seeking: Seeking;
  appearance: Appearance;
  interviewpackages: Interviewpackages;
  treasurehunt?: boolean;
  about: string;
  values: string;
  logopath: string;
  offersinterview: boolean;
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
