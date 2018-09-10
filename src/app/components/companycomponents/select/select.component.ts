import { Component, OnInit } from '@angular/core';
import { Company, Code, InterviewApplication } from '../../../shared/models';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, map} from 'rxjs/operators';
import * as _ from 'lodash';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  submitCodeForm: FormGroup;
  changeStatus: FormGroup;
  code;
  loading: boolean = false;
  selectView: boolean = false;
  company: any;
  user;

  interviews: any;
  openInterviews: any;
  filteredInterviews: any;

  orderBy: any = 'firstname';
  orderTime: any;
  orderByOpen: any = 'firstname';
  orderTimeOpen: any;

  selected;

  backup1available: boolean = true;
  backup2available: boolean = true;
  backup3available: boolean = true;
  backup4available: boolean = true;
  backup5available: boolean = true;
  selectedavailable: boolean = true;

  showerror: boolean = false;

  tempInt;
  tempComp;

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder, public auth: AuthService) {
    this.auth.user$.subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.submitCodeForm = this.fb.group({
      'code': ['', [Validators.required]]
    });
    this.changeStatus = this.fb.group({
      'change': ['', [Validators.required]]
    });
  }

  getCompanyID(code) {
    return this.afs.collection('companycodes', ref => {
      return ref
        .where('code', '==', code)
        .limit(1);
    }).valueChanges()
  }

  getCompany(id) {
    return this.afs.doc<Company>(`companies/${id}`).valueChanges();
  }

  getInterviews(companyid) {
    return this.afs.collection<InterviewApplication>('interviews', ref => {
      return ref
        .where('company', '==', companyid);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       var firstchoice;
        var secondchoice;
       if (data.program == 'Civilekonom') {
         firstchoice = data.nekorfek;
         secondchoice = data.filfakspecialization;
       } else if (data.program == 'Industriell Ekonomi') {
         firstchoice = data.engineerbachelor;
         secondchoice = data.engineermaster;
       } else if (data.program == 'Annat') {
         if (data.nekorfek !== '') {
           firstchoice = data.nekorfek;
           secondchoice = data.filfakspecialization;
         } else {
           firstchoice = data.engineerbachelor;
           secondchoice = data.engineermaster;
         }
       }
       var status;
       if (data.notselected) {
         status = 'Nekad'
       } else if (data.selected) {
         status = 'Antagen'
       } else if (data.pending) {
         status = 'Avvakta'
       } else if (data.backup) {
         if (data.backupnumber == 1) {
           status = 'Reserv 1'
          } else if (data.backupnumber == 2) {
            status = 'Reserv 2'
          } else if (data.backupnumber == 3) {
           status = 'Reserv 3'
         } else if (data.backupnumber == 4) {
            status = 'Reserv 4'
         } else if(data.backupnumber == 5) {
           status = 'Reserv 5'
        }
       }
       return { id, firstchoice, secondchoice, status, ...data };
     }))
   );
  }

  getOpenInterviews(companyid) {
    return this.afs.collection<InterviewApplication>('openinterviews', ref => {
      return ref
        .where('company', '==', companyid);
    }).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as InterviewApplication;
       const id = a.payload.doc.id;
       var firstchoice;
        var secondchoice;
       if (data.program == 'Civilekonom') {
         firstchoice = data.nekorfek;
         secondchoice = data.filfakspecialization;
       } else if (data.program == 'Industriell Ekonomi') {
         firstchoice = data.engineerbachelor;
         secondchoice = data.engineermaster;
       } else if (data.program == 'Annat') {
         if (data.nekorfek !== '') {
           firstchoice = data.nekorfek;
           secondchoice = data.filfakspecialization;
         } else {
           firstchoice = data.engineerbachelor;
           secondchoice = data.engineermaster;
         }
       }
       var status;
       if (data.notselected) {
         status = 'Nekad'
       } else if (data.selected) {
         status = 'Antagen'
       } else if (data.pending) {
         status = 'Avvakta'
       } else if (data.backup) {
         if (data.backupnumber == 1) {
           status = 'Reserv 1'
          } else if (data.backupnumber == 2) {
            status = 'Reserv 2'
          } else if (data.backupnumber == 3) {
           status = 'Reserv 3'
         } else if (data.backupnumber == 4) {
            status = 'Reserv 4'
         } else if(data.backupnumber == 5) {
           status = 'Reserv 5'
        }
       }
       return { id, firstchoice, secondchoice, status, ...data };
     }))
   );
  }

  checkRestrictions() {
    if (_.find(this.interviews, ['backupnumber', 1]) || _.find(this.openInterviews, ['backupnumber', 1])) {
      this.backup1available = false;
      console.log('hej')
    } else {
      this.backup1available = true;
    }
    if (_.find(this.interviews, ['backupnumber', 2]) || _.find(this.openInterviews, ['backupnumber', 2])) {
      this.backup2available = false;
      console.log('hej')
    } else {
      this.backup2available = true;
    }
    if (_.find(this.interviews, ['backupnumber', 3]) || _.find(this.openInterviews, ['backupnumber', 3])) {
      this.backup3available = false;
      console.log('hej')
    } else {
      this.backup3available = true;
    }
    if (_.find(this.interviews, ['backupnumber', 4]) || _.find(this.openInterviews, ['backupnumber', 4])) {
      this.backup4available = false;
      console.log('hej')
    } else {
      this.backup3available = true;
    }
    if (_.find(this.interviews, ['backupnumber', 5]) || _.find(this.openInterviews, ['backupnumber', 5])) {
      this.backup5available = false;
      console.log('hej')
    } else {
      this.backup5available = true;
    }
    if ((_.size(_.filter(this.interviews, 'selected')) + _.size(_.filter(this.openInterviews, 'selected'))) >= this.company.totalapplicants) {
      this.selectedavailable = false;
    } else {
      this.selectedavailable = true;
    }
  }


  async applyOrder(cond) {
      this.interviews = _.orderBy(this.interviews, ['firstname'], ['asc']);
      if (this.orderBy == cond && this.orderTime ) {
        this.orderTime = !this.orderTime;
        this.interviews = _.orderBy(this.interviews, [cond], ['asc'])
      } else {
        this.orderTime = !this.orderTime;
        this.interviews = _.orderBy(this.interviews, [cond], ['desc'])
      }
      this.orderBy = cond;
  }

  async applyOrderOpen(cond) {
      this.openInterviews = _.orderBy(this.openInterviews, ['firstname'], ['asc']);
      if (this.orderByOpen == cond && this.orderTimeOpen ) {
        this.orderTimeOpen = !this.orderTimeOpen;
        this.openInterviews = _.orderBy(this.openInterviews, [cond], ['asc'])
      } else {
        this.orderTimeOpen = !this.orderTimeOpen;
        this.openInterviews = _.orderBy(this.openInterviews, [cond], ['desc'])
      }
      this.orderBy = cond;
  }

  submit(data) {

    return this.getCompanyID(data.code).subscribe(code => {
        if (code[0] == undefined) {
          return this.showerror = true;
        }
        this.code = code[0];
        this.getCompany(this.code.company).subscribe(company => {
          this.getInterviews(this.code.company).subscribe(interviews => {
              this.interviews = interviews;
              this.orderTime = !this.orderTime;
              this.applyOrder(this.orderBy);
              this.checkRestrictions();
          });
          this.company = company;
          if (company.seeopenapplicants) {
            this.getOpenInterviews('2AyD1dEZ2ARERmjMr78X').subscribe(openinterviews => {
                this.openInterviews = openinterviews;
                this.orderTimeOpen = !this.orderTimeOpen;
                this.applyOrderOpen(this.orderByOpen);
                this.checkRestrictions();
            });
          }
        });
        this.selectView = true;
    });


  }

  updateApplicant(rule, id) {
    console.log(rule)
    if (rule == 'pending') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: true,
        selected: false,
        notselected: false,
        backup: false,
        backupnumber: 0
      })
    } else if (rule == 'selected') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: true,
        notselected: false,
        backup: false,
        backupnumber: 0
      })
    } else if (rule == 'notselected') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: true,
        backup: false,
        backupnumber: 0
      })
    } else if (rule == 'backup1') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 1
      })
    } else if (rule == 'backup2') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 2
      })
    } else if (rule == 'backup3') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 3
      })
    } else if (rule == 'backup4') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 4
      })
    } else if (rule == 'backup5') {
      return this.afs.doc(`interviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 5
      })
    }
  }

  updateApplicantOpen(rule, id) {
    console.log(rule)
    if (rule == 'pending') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: true,
        selected: false,
        notselected: false,
        backup: false,
        backupnumber: 0
      })
    } else if (rule == 'selected') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: true,
        notselected: false,
        backup: false,
        backupnumber: 0
      })
    } else if (rule == 'notselected') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: true,
        backup: false,
        backupnumber: 0
      })
    } else if (rule == 'backup1') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 1
      })
    } else if (rule == 'backup2') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 2
      })
    } else if (rule == 'backup3') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 3
      })
    } else if (rule == 'backup4') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 4
      })
    } else if (rule == 'backup5') {
      return this.afs.doc(`openinterviews/${id}`).update({
        pending: false,
        selected: false,
        notselected: false,
        backup: true,
        backupnumber: 5
      })
    }

  }

  trackByStatus(index, obj): number {
    return obj.status + obj.selected + obj.notselected + obj.backup + obj.pending + obj.backupnumber;
  }

  selectedRow(id) {
    this.selected = id;
  }




}
