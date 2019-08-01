import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { switchMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouritecompaniesService {

  constructor(private afs: AngularFirestore) { }

  getFavouriteCompanies(user) {
    // Used to build the follower count
      return this.afs.doc(`favouritecompanies/${user.uid}`).valueChanges();
  }

  favourite(userId: string, companyName: string) {
    this.afs.doc(`favouritecompanies/${userId}`).set({[companyName]: true }, {merge: true} )
  }

  unfavourite(userId: string, companyName: string) {
    this.afs.doc(`favouritecompanies/${userId}`).update({[companyName]: firebase.firestore.FieldValue.delete() })
  }
}
