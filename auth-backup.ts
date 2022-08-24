import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

interface Roles {
    student?: boolean;
    dreamteamMember?: boolean;
    dreamteamPlatinumMember?: boolean;
 }

interface User {
  uid: string;
  email: string;
  roles: Roles;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: Observable<firebase.User>;
  userDetails: firebase.User = null;
  userData: firebase.User = null;
  isAuthenticated: Boolean = false;
  emailIsVerified: Boolean = false;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
                // Define the user observable
                  afs.firestore.settings({timestampsInSnapshots: true});
                  this.user$ = this.afAuth.authState;
                  this.user$.pipe(switchMap(auth => {
                      if (auth) {
                        this.emailIsVerified = this.afAuth.auth.currentUser.emailVerified;
                        this.userDetails = auth;
                        const userData: AngularFirestoreDocument<User> = afs.doc('users/' + auth.uid);
                        const userData$: Observable<User> = userData.valueChanges();
                        userData$.subscribe((data) => {
                          this.userData = data;
                        });
                      } else {
                        // logged out, null
                        this.userDetails = null;
                        return of(null)
                      }
                    })
                  ).subscribe()
               }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        var userToVer = firebase.auth().currentUser;
        userToVer.sendEmailVerification().then(() => {
          console.log("Sent");
          return this.createProfile(email)
          // return this.setUserDoc(user); // create initial user document
        }).catch(function(error) {
          console.log(error);
        });
        // return this.setUserDoc(user) // create initial user document
      })
      .catch(error => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }


  // Update properties on the user document
  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data)
  }



  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
    // this.notify.update(error.message, 'error')
  }
  createProfile(value) {
  var userDocRef = this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid);
    return userDocRef.set({
      uid: value,
      confirmedEmail: false,
    })
  }

  // Sets user data to firestore after succesful login
  private setUserDoc(user) {
    var userDocRef = this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid);
    const data: user = {
      uid: user.uid,
      email: user.email || null
    }
    return userDocRef.set(data)
  }

  isSignedIn() {
    return this.userData;
  }

  isVerified() {
    return this.emailIsVerified;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.userDetails = null;
        this.router.navigated = false;
        window.location.reload(true);
        this.router.navigate([''])
    });
  }

  getUserID() {
    return this.userDetails.uid;
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
}
