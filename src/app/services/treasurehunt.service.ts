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

  getTreasureBoardTuesday() {
    return this.afs.collection('treasurehuntPointsTuesday').snapshotChanges().pipe(
      map((actions : any) => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getTreasureBoardWednesday() {
    return this.afs.collection('treasurehuntPointsWednesday').snapshotChanges().pipe(
      map((actions : any)=> actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getTreasurePointsTuesday(user) {
    return this.afs.doc(`treasurehuntPointsTuesday/${user.uid}`).valueChanges();
  }

  getTreasurePointsWednesday(user) {
    return this.afs.doc(`treasurehuntPointsWednesday/${user.uid}`).valueChanges();
  }

  async registerPointsTuesday(user, companyName: string) {
    try {
      await this.afs.doc(`treasurehuntPointsTuesday/${user.uid}`).set({liuid: user.liuid, [companyName]: true }, {merge: true} );
    } catch(err) {
      console.log(err)
      throw new Error(err.message);
    }
  }

  async registerPointsWednesday(user, companyName: string) {
    try {
      await this.afs.doc(`treasurehuntPointsWednesday/${user.uid}`).set({liuid: user.liuid, [companyName]: true }, {merge: true} );
    } catch(err) {
      console.log(err)
      throw new Error(err.message);
    }
  }
}
