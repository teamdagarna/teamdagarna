import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TreasurehuntService } from '../../services/treasurehunt.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company, Code } from '../../shared/models';
import * as firebase from 'firebase/app';
import { switchMap, map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registertreasurehunt',
  templateUrl: './registertreasurehunt.component.html',
  styleUrls: ['./registertreasurehunt.component.scss']
})
export class RegistertreasurehuntComponent implements OnInit {

  submitCodeForm: FormGroup;
  code;
  user;
  treasureCompany: any;
  treasurehuntPointsTuesday: any;
  treasurehuntPointsWednesday: any;
  success: boolean = false;
  submitMode: boolean = true;
  notsuccess: boolean = false;
  hasPoint: boolean = false;
  showerror: boolean = false;
  loading: boolean = false;
  noOfPointsTuesday: number;
  noOfPointsWednesday: number;

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder, public auth: AuthService, private treasure: TreasurehuntService, private router: Router) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.treasure.getTreasurePointsTuesday(this.user).subscribe(treasurehuntPoints => {
          this.treasurehuntPointsTuesday = treasurehuntPoints;
          if(treasurehuntPoints) {
            this.noOfPointsTuesday = _.size(treasurehuntPoints)-1;
          } else {
            this.noOfPointsTuesday = 0;
          }
        });
        this.treasure.getTreasurePointsWednesday(this.user).subscribe(treasurehuntPoints => {
          this.treasurehuntPointsWednesday = treasurehuntPoints;
          if(treasurehuntPoints) {
            this.noOfPointsWednesday = _.size(treasurehuntPoints)-1;
          } else {
            this.noOfPointsWednesday = 0;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.submitCodeForm = this.fb.group({
      'code': ['', [Validators.required]]
    });
  }

  //Change value of this to approriate afs-collection depending on day for the competition.
  getCompanyID(code) {
    return this.afs.collection('treasurecodesTuesday', ref => {
      return ref
        .where('treasurecode', '==', code)
        .limit(1);
    }).valueChanges()
  }

  getCompany(id) {
    return this.afs.doc<Company>(`companies/${id}`).valueChanges();
  }

  checkPoint(company) {
    const user = this.user;
    const companyName = company.name;
    const treasurehuntPoints = this.treasurehuntPointsTuesday;
    var hasPoint: any;
    if(treasurehuntPoints) {
      if(treasurehuntPoints[companyName] != null) {
        hasPoint = treasurehuntPoints[companyName];
      } else {
        hasPoint = false;
      }
    } else {
        hasPoint = false;
    }
    return hasPoint;
  }

  submit(data) {
    this.loading = true;
    return this.getCompanyID(data.code).subscribe(code => {
        if (code[0] == undefined) {
          this.loading = false;
          return this.showerror = true;
        }
        this.code = code[0];
        this.getCompany(this.code.company).subscribe(async company => {
          this.treasureCompany = company;
          if (!this.checkPoint(company)) {
            try {
              await this.treasure.registerPointsTuesday(this.user, company.name);
              this.success = true;
            } catch(err) {
              console.log(err)
              this.notsuccess = true;
            }
          } else {
            this.hasPoint = true;
          }
        });
        this.submitMode = false;
        this.loading = false;
    });
  }

  refresh() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['pusseljakten']));
  }

}
