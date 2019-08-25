import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company, InterviewApplication } from '../../shared/models';
import * as _ from 'lodash';
import { AuthService } from '../../services/auth.service';
import { switchMap, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  interviewForm: FormGroup;

  loading = false;
  success = false;
  notsuccess = false;

  user;

  clfile: any;
  clpath: any = null;
  cltask: AngularFireUploadTask;
  clpercentage: Observable<number>;
  clsnapshot: Observable<any>;
  cldownloadURL: Observable<string>;
  cluploaded: boolean = false;
  clerror: boolean = false;

  cvfile: any;
  cvpath: any = null;
  cvtask: AngularFireUploadTask;
  cvpercentage: Observable<number>;
  cvsnapshot: Observable<any>;
  cvdownloadURL: Observable<string>;
  cvuploaded: boolean = false;
  cverror: boolean = false;

  gradesfile: any;
  gradespath: any = null;
  gradestask: AngularFireUploadTask;
  gradespercentage: Observable<number>;
  gradessnapshot: Observable<any>;
  gradesdownloadURL: Observable<string>;
  gradesuploaded: boolean = false;
  gradeserror: boolean = false;

  companies: any;
  filteredCompanies: any;
  private companiesCollection: AngularFirestoreCollection<Company>;

  private interviewCollection: AngularFirestoreCollection<InterviewApplication>;

  selectedCompanyID: any;
  company: any;

  applied: any;
  appliedID: any;
  applicationsMade: any;
  appliedOpen: any;

  preselected;

  constructor(public auth: AuthService, private storage: AngularFireStorage, private db: AngularFirestore, public fb: FormBuilder, private readonly afs: AngularFirestore, private route: ActivatedRoute,
    private router: Router) {
    this.auth.user$.subscribe(user => {
      this.user = user
      this.setValues();
      this.getInterviews().subscribe(interviews => {
          this.applied = interviews;
          this.applicationsMade = _.size(interviews);
          this.appliedOpen = _.find(interviews, function(o) { return o.companyname == 'Öppen anmälan kontaktsamtal'; });
          if (this.appliedOpen) {
            this.applicationsMade = this.applicationsMade-1;
          }
          // console.log(this.applicationsMade);
        });
      });

    this.interviewCollection = afs.collection<InterviewApplication>('interviews');
    this.companiesCollection = afs.collection<Company>('companies');

    this.getCompanies().subscribe(companies => {
        this.companies = _.filter(companies, function(company) {
         if (company.offersinterview) {
          return true;
         } else {
          return false;
         }
         });
         this.companies = _.orderBy(this.companies, ['name'])
        this.getCompany(this.preselected);
    });

  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.preselected = params['preselected'];
      });
      if(!this.preselected) {
        this.preselected = -1;
      }
    this.interviewForm = this.fb.group({
      'selectedCompany': [this.preselected, [
        Validators.required
        ]
      ],
      'phoneNumber': ['', [
        Validators.pattern('[0-9]{9}$'),
        Validators.required
        ]
      ]
    });
  }

  get selectedCompany() { return this.interviewForm.get('selectedCompany') }
  get phoneNumber() { return this.interviewForm.get('phoneNumber') }

  setValues() {
    this.interviewForm.patchValue(this.user);
  }

  getCompanies() {
    return this.afs.collection<Company>('companies').snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Company;
       const id = a.payload.doc.id;
       return { id, ...data };
     }))
   );
  }

  getCompany(company) {
    this.company = _.find(this.companies, ['id', company]);
  }

  getInterviews() {
    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('applicant', '==', this.user.uid);
    }).valueChanges();
  }

  hasApplied(company) {
    if (_.find(this.applied, function(o) { return o.company == company; }) !== undefined) {
    return true;
    } else {
      return false;
    }
  }

  async submit() {
    if (navigator.userAgent.indexOf('gonative') > -1) {
      var tags = {
        appliedInterview: 'yes'
      };

      window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(tags));
    }
    const formValue = this.interviewForm.value;
    const phone = {phoneNumber: formValue.phoneNumber}
    this.auth.updateUser(this.user, phone);
    this.loading = true;
    const newInterview: InterviewApplication = {
      applicant: this.user.uid,
      company: this.company.id,
      companyname: this.company.name,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      liuid: this.user.liuid,
      phoneNumber: formValue.phoneNumber,
      program: this.user.program,
      year: this.user.year,
      engineerbachelor: this.user.engineerbachelor,
      engineermaster: this.user.engineermaster,
      nekorfek: this.user.nekorfek,
      filfakspecialization: this.user.filfakspecialization,
      backup: false,
      notselected: false,
      selected: false,
      pending: true,
      studentaccepted: false,
      studentnotanswered: true,
      studentdeclined: false,
      resumepath: this.cvpath,
      coverletterpath: this.clpath,
      gradespath: this.gradespath
    }

    try {
      await this.afs.collection<InterviewApplication>('interviews').add(newInterview);
      this.success = true;
    } catch(err) {
      this.notsuccess = true;
    }

    if(this.company.name == 'Öppen anmälan kontaktsamtal') {
      if (navigator.userAgent.indexOf('gonative') > -1) {
        var tags2 = {
          appliedOpenInterview: 'yes'
        };

        window.location.href = 'gonative://onesignal/tags/set?tags=' + encodeURIComponent(JSON.stringify(tags2));
      }
      for (let index = 0; index < this.companies.length; ++index) {
        if(this.companies[index].seeopenapplicants) {
          const newInterview: InterviewApplication = {
            applicant: this.user.uid,
            company: this.companies[index].id,
            companyname: this.companies[index].name,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            liuid: this.user.liuid,
            phoneNumber: formValue.phoneNumber,
            program: this.user.program,
            year: this.user.year,
            engineerbachelor: this.user.engineerbachelor,
            engineermaster: this.user.engineermaster,
            nekorfek: this.user.nekorfek,
            filfakspecialization: this.user.filfakspecialization,
            backup: false,
            notselected: false,
            selected: false,
            pending: true,
            studentaccepted: false,
            studentnotanswered: true,
            studentdeclined: false,
            resumepath: this.cvpath,
            coverletterpath: this.clpath,
            gradespath: this.gradespath
          }

          try {
            await this.afs.collection<InterviewApplication>('openinterviews').add(newInterview);
            this.success = true;
          } catch(err) {
            this.notsuccess = true;
          }
        }
      }
    }
    this.loading = false;
  }

  okToSubmit() {
    if ((this.company.reqcl && (!this.cluploaded || this.clerror)) || (this.company.reqresume && (!this.cvuploaded || this.cverror)) || (this.company.reqgrades && (!this.gradesuploaded || this.gradeserror)) || !this.interviewForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  async startUploadCoverLetter(event: FileList) {
    this.clpath = `coverletters/${this.user.liuid}_${new Date().getTime()}`;
    this.clfile = event.item(0)
    if (this.clfile.type !== 'application/pdf') {
      this.clerror = false;
      return;
    }
    try {
    this.cltask = this.storage.upload(this.clpath, this.clfile);
    this.clerror = false;
    this.cluploaded = true;
    } catch(err) {
      console.error(err)
    }
  }

  startUploadResume(event: FileList) {
    this.cvpath = `resumes/${this.user.liuid}_${new Date().getTime()}`;
    this.cvfile = event.item(0)
    if (this.cvfile.type !== 'application/pdf') {
      this.cverror = true;
      return;
    }
    this.cvtask = this.storage.upload(this.cvpath, this.cvfile);
    this.cverror = false;
    this.cvuploaded = true;
  }

  startUploadGrades(event: FileList) {
    this.gradespath = `grades/${this.user.liuid}_${new Date().getTime()}`;
    this.gradesfile = event.item(0)
    if (this.gradesfile.type !== 'application/pdf') {
      this.gradeserror = true;
      return;
    }
    this.gradestask = this.storage.upload(this.gradespath, this.gradesfile);
    this.gradeserror = false;
    this.gradesuploaded = true;
  }

  refresh() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['interview']));
  }

}
