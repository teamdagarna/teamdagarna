import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TreasurehuntService } from '../../services/treasurehunt.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company, Code, LeaderBoardUser } from '../../shared/models';
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
  treasureBoard: any;
  leaderBoard: LeaderBoardUser[];
  treasurehuntPoints: any;
  success: boolean = false;
  submitMode: boolean = true;
  notsuccess: boolean = false;
  hasPoint: boolean = false;
  showerror: boolean = false;
  loading: boolean = false;
  noOfPoints: number;

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder, public auth: AuthService, private treasure: TreasurehuntService, private router: Router) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.treasure.getTreasurePoints(this.user).subscribe(treasurehuntPoints => {
          this.treasurehuntPoints = treasurehuntPoints;
          if(treasurehuntPoints) {
            this.noOfPoints = _.size(treasurehuntPoints)-2;
          } else {
            this.noOfPoints = 0;
          }
        });
      }
    });
    this.treasure.getTreasureBoard().subscribe(treasureBoard => {
      this.treasureBoard = treasureBoard;
      this.leaderBoard = this.createLeaderBoard();
    });
  }

  ngOnInit() {
    this.submitCodeForm = this.fb.group({
      'code': ['', [Validators.required]]
    });
  }

  getCompanyID(code) {
    return this.afs.collection('treasurecodes', ref => {
      return ref
        .where('treasurecode', '==', code)
        .limit(1);
    }).valueChanges()
  }

  getCompany(id) {
    return this.afs.doc<Company>(`companies/${id}`).valueChanges();
  }

  countPoints(treasurehuntDoc) {
    if(treasurehuntDoc) {
      return _.size(treasurehuntDoc)-3;
    } else {
      return 0;
    }
  }

  createLeaderBoard() {
    const treasureBoard = this.treasureBoard;
    var leaderBoard: LeaderBoardUser[] = new Array();
    for (let index = 0; index < treasureBoard.length; ++index) {
      const newUser: LeaderBoardUser = {
        firstname: treasureBoard[index].firstname,
        lastname: treasureBoard[index].lastname,
        noOfPoints: this.countPoints(treasureBoard[index])
      }
      leaderBoard.push(newUser);
    }
    return _.take(_.orderBy(leaderBoard, ['noOfPoints'], ['desc']), 10);
  }

  checkPoint(company) {
    const user = this.user;
    const companyName = company.name;
    const treasurehuntPoints = this.treasurehuntPoints;
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
    this.submitMode = false;
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
              await this.treasure.registerPoints(this.user, company.name);
              this.success = true;
            } catch(err) {
              console.log(err)
              this.notsuccess = true;
            }
          } else {
            this.hasPoint = true;
          }
        });
        this.loading = false;
    });
  }

  refresh() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['pusseljakten']));
  }

}
