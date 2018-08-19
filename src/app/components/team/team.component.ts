import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Dreamteamer } from '../../shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {


  private dreamteamCollection: AngularFirestoreCollection<Dreamteamer>;
  dreamteam: Observable<Dreamteamer[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.dreamteamCollection = afs.collection<Dreamteamer>('dreamteam', ref => ref.orderBy('ordertoshow'));
    this.dreamteam = this.dreamteamCollection.valueChanges();
  }

  ngOnInit() {
  }

}
