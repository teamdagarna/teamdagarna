import { Component, OnInit } from '@angular/core';
import { TreasurehuntService } from '../../../services/treasurehunt.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Company, Code, LeaderBoardUser } from '../../../shared/models';
import * as firebase from 'firebase/app';
import { switchMap, map} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-treasurescore',
  templateUrl: './treasurescore.component.html',
  styleUrls: ['./treasurescore.component.scss']
})
export class TreasurescoreComponent implements OnInit {

  treasureBoardTuesday: any;
  treasureBoardWednesday: any;
  leaderBoardTuesday: LeaderBoardUser[];
  leaderBoardWednesday: LeaderBoardUser[];

  constructor(private readonly afs: AngularFirestore, private treasure: TreasurehuntService) {
    this.treasure.getTreasureBoardTuesday().subscribe(treasureBoard => {
      this.treasureBoardTuesday = treasureBoard;
      this.leaderBoardTuesday = this.createLeaderBoard(treasureBoard);
    });
    this.treasure.getTreasureBoardWednesday().subscribe(treasureBoard => {
      this.treasureBoardWednesday = treasureBoard;
      this.leaderBoardWednesday = this.createLeaderBoard(treasureBoard);
    });

   }

  ngOnInit() {
  }

  createLeaderBoard(treasureBoard) {
    var leaderBoard: LeaderBoardUser[] = new Array();
    for (let index = 0; index < treasureBoard.length; ++index) {
      const newUser: LeaderBoardUser = {
        liuid: treasureBoard[index].liuid,
        noOfPoints: this.countPoints(treasureBoard[index])
      }
      leaderBoard.push(newUser);
    }
    return _.orderBy(leaderBoard, ['noOfPoints'], ['desc']);
  }

  countPoints(treasurehuntDoc) {
    if(treasurehuntDoc) {
      return _.size(treasurehuntDoc)-2;
    } else {
      return 0;
    }
  }

}
