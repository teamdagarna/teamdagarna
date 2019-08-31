import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { switchMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreasurehuntService {

  constructor(private afs: AngularFirestore) { }

  getTreasureBoard() {
    return this.afs.collection('treasurehuntpoints').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getTreasurePoints(user) {
    // Used to build the follower count
    return this.afs.doc(`treasurehuntpoints/${user.uid}`).valueChanges();
  }

  async registerPoints(user, companyName: string) {
    try {
      await this.afs.doc(`treasurehuntpoints/${user.uid}`).set({firstname: user.firstname, lastname: user.lastname, [companyName]: true }, {merge: true} );
    } catch(err) {
      console.log(err)
      throw new Error(err);
    }
  }
}
