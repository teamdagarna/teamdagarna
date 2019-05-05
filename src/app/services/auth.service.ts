import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map, take, first} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Roles, User } from '../shared/models';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userDetails: firebase.User = null;
  // userData: user = null;
  isAuthenticated: Boolean = false;
  emailIsVerified: Boolean = false;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

              afs.firestore.settings({timestampsInSnapshots: true});
              this.user$ = this.afAuth.authState.pipe(switchMap(user => {
                    if (user) {
                      this.isAuthenticated = true;
                      this.emailIsVerified = user.emailVerified;
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                    } else {
                      this.isAuthenticated = false;
                      return of(null)
                    }
                  })
              )
              // this.afAuth.authState.subscribe(res => {
              //   if (res && res.uid) {
              //     this.isAuthenticated = true;
              //       this.emailIsVerified = res.emailVerified;
              //     // this.emailIsVerified = res.emailVerified;
              //   } else {
              //     this.isAuthenticated = false;
              //     this.emailIsVerified = true;
              //   }
              // });
            }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, { merge: true })
  }

  emailSignUp(data) {
    const liumail = data.liuid + '@student.liu.se';
    return this.afAuth.auth.createUserWithEmailAndPassword(liumail, data.password)
      .then(credentials => {
        var userToVer = firebase.auth().currentUser;
        userToVer.sendEmailVerification().then(() => {

          const newUser: User = {
              uid: firebase.auth().currentUser.uid,
              email: liumail,
              firstname: data.firstname,
              lastname: data.lastname,
              liuid: data.liuid,
              program: data.program,
              year: data.year,
              engineerbachelor: data.engineerbachelor,
              engineermaster: data.engineermaster,
              specialfood: data.specialfood,
              nekorfek: data.nekorfek,
              filfakspecialization: data.filfakspecialization,
              verified: false,
              roles: {
                student: true
              }
          }

          return this.updateUserData(newUser)
          // return this.createProfile(email)
          // return this.setUserDoc(user); // create initial user document
        }).catch(function(error) {
          console.log(error);
        });
        // return this.setUserDoc(user) // create initial user document
      })
      .catch(error => this.handleError(error) );
  }

  newVerify() {
    var userToVer = firebase.auth().currentUser;
    userToVer.sendEmailVerification();
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
  // createProfile(value) {
  // var userDocRef = this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid);
  //   return userDocRef.set({
  //     uid: value,
  //     confirmedEmail: false,
  //   })
  // }

  // Sets user data to firestore after succesful login
  // private setUserDoc(user) {
  //   var userDocRef = this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid);
  //   const data: user = {
  //     uid: user.uid,
  //     email: user.email || null
  //   }
  //   return userDocRef.set(data)
  // }

  isSignedIn() {
    if (navigator.userAgent.indexOf('gonative') > -1) {
      if (this.isAuthenticated) {
        //Checks if request comes from the app

        //Checks if user is logged in and presents the content in the navbar differently depending on the answer
        var items = [{
          "subLinks": [],
          "label": "Hem",
          "url": "http://teamdagarna.com/",
          "icon": "fa-home"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Sök DreamTEAM",
              "url": "http://teamdagarna.com/sokdreamteam"
            },
            {
              "subLinks": [],
              "label": "Företagen 2018",
              "url": "http://teamdagarna.com/companies"
            },
            {
              "subLinks": [],
              "label": "Sök kontaktsamtal",
              "url": "https://teamdagarna.com/interview"
            },
            {
              "subLinks": [],
              "label": "Event",
              "url": "https://teamdagarna.com/events"
            }
          ],
          "label": "För Studenter",
          "isGrouping": true,
          "icon": "fa-user"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "http://teamdagarna.com/about"
            },
            {
              "subLinks": [],
              "label": "FAQ",
              "url": "https://teamdagarna.com/faq"
            },
            {
              "subLinks": [],
              "label": "Erbjudande",
              "url": "https://teamdagarna.com/weoffer"
            },
            {
              "subLinks": [],
              "label": "Hitta hit",
              "url": "https://teamdagarna.com/weoffer"
            }
          ],
          "label": "För företag",
          "isGrouping": true,
          "icon": "fa-briefcase"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Kontakt",
              "url": "https://teamdagarna.com/dreamteam"
            },
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "https://teamdagarna.com/dreamteam"
            }
          ],
          "label": "Om oss",
          "isGrouping": true,
          "icon": "fa-question"
        },
        {
          "subLinks": [],
          "label": "English info",
          "url": "https://teamdagarna.com/about-english",
          "icon": "fa-cog"
        },
        {
          "subLinks": [],
          "label": "Din profil",
          "url": "https://teamdagarna.com/profile",
          "icon": "fa-user-graduate"
        },
        {
          "subLinks": [],
          "label": "Logga ut",
          "url": "https://teamdagarna.com/signout",
          "icon": "fa-sign-out"
        }
      ];

        var json = JSON.stringify(items);

        window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
      } else {
        var items = [{
          "subLinks": [],
          "label": "Hem",
          "url": "http://teamdagarna.com/",
          "icon": "fa-home"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Sök DreamTEAM",
              "url": "http://teamdagarna.com/sokdreamteam"
            },
            {
              "subLinks": [],
              "label": "Företagen 2018",
              "url": "http://teamdagarna.com/companies"
            },
            {
              "subLinks": [],
              "label": "Sök kontaktsamtal",
              "url": "https://teamdagarna.com/interview"
            },
            {
              "subLinks": [],
              "label": "Event",
              "url": "https://teamdagarna.com/events"
            }
          ],
          "label": "För Studenter",
          "isGrouping": true,
          "icon": "fa-user"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "http://teamdagarna.com/about"
            },
            {
              "subLinks": [],
              "label": "FAQ",
              "url": "https://teamdagarna.com/faq"
            },
            {
              "subLinks": [],
              "label": "Erbjudande",
              "url": "https://teamdagarna.com/weoffer"
            },
            {
              "subLinks": [],
              "label": "Hitta hit",
              "url": "https://teamdagarna.com/weoffer"
            }
          ],
          "label": "För företag",
          "isGrouping": true,
          "icon": "fa-briefcase"
        },
        {
          "subLinks": [
            {
              "subLinks": [],
              "label": "Kontakt",
              "url": "https://teamdagarna.com/dreamteam"
            },
            {
              "subLinks": [],
              "label": "Om dagarna",
              "url": "https://teamdagarna.com/dreamteam"
            }
          ],
          "label": "Om oss",
          "isGrouping": true,
          "icon": "fa-question"
        },
        {
          "subLinks": [],
          "label": "English info",
          "url": "https://teamdagarna.com/about-english",
          "icon": "fa-cog"
        },
        {
          "subLinks": [],
          "label": "Logga in",
          "url": "https://teamdagarna.com/signin",
          "icon": "fa-sign-out"
        }
      ];
        var json = JSON.stringify(items);

        window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
      }
    }
    return this.isAuthenticated;
  }

  isVerified() {
    return this.emailIsVerified;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate([''])
        //Checks if request comes from the app. If user signs out the info in the navbar will change in the app.
        if (navigator.userAgent.indexOf('gonative') > -1) {
          var items = [{
            "subLinks": [],
            "label": "Hem",
            "url": "http://teamdagarna.com/",
            "icon": "fa-home"
          },
          {
            "subLinks": [
              {
                "subLinks": [],
                "label": "Sök DreamTEAM",
                "url": "http://teamdagarna.com/sokdreamteam"
              },
              {
                "subLinks": [],
                "label": "Företagen 2018",
                "url": "http://teamdagarna.com/companies"
              },
              {
                "subLinks": [],
                "label": "Sök kontaktsamtal",
                "url": "https://teamdagarna.com/interview"
              },
              {
                "subLinks": [],
                "label": "Event",
                "url": "https://teamdagarna.com/events"
              }
            ],
            "label": "För Studenter",
            "isGrouping": true,
            "icon": "fa-user"
          },
          {
            "subLinks": [
              {
                "subLinks": [],
                "label": "Om dagarna",
                "url": "http://teamdagarna.com/about"
              },
              {
                "subLinks": [],
                "label": "FAQ",
                "url": "https://teamdagarna.com/faq"
              },
              {
                "subLinks": [],
                "label": "Erbjudande",
                "url": "https://teamdagarna.com/weoffer"
              },
              {
                "subLinks": [],
                "label": "Hitta hit",
                "url": "https://teamdagarna.com/weoffer"
              }
            ],
            "label": "För företag",
            "isGrouping": true,
            "icon": "fa-briefcase"
          },
          {
            "subLinks": [
              {
                "subLinks": [],
                "label": "Kontakt",
                "url": "https://teamdagarna.com/dreamteam"
              },
              {
                "subLinks": [],
                "label": "Om dagarna",
                "url": "https://teamdagarna.com/dreamteam"
              }
            ],
            "label": "Om oss",
            "isGrouping": true,
            "icon": "fa-question"
          },
          {
            "subLinks": [],
            "label": "English info",
            "url": "https://teamdagarna.com/about-english",
            "icon": "fa-cog"
          },
          {
            "subLinks": [],
            "label": "Logga in",
            "url": "https://teamdagarna.com/signin",
            "icon": "fa-sign-out"
          }
        ];
        var json = JSON.stringify(items);

        window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
      }
    });
  }

  getUserID() {
    return this.afAuth.auth.currentUser.uid;
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['dreamteamPlatinumMember', 'dreamteamMember', 'student']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['dreamteamPlatinumMember', 'dreamteamMember']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['dreamteamPlatinumMember']
    return this.checkAuthorization(user, allowed)
  }

  isCompany(user: User): boolean {
    const allowed = ['dreamteamPlatinumMember', 'company']
    return this.checkAuthorization(user, allowed)
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }






}
