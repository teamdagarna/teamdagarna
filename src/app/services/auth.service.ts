import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map, take, first } from 'rxjs/operators';

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

    afs.firestore.settings({});
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        //Checks if request comes from the app
        if (navigator.userAgent.indexOf('gonative') > -1) {
          this.loggedInMenuApp();
        }
        this.isAuthenticated = true;
        this.emailIsVerified = user.emailVerified;
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        if (navigator.userAgent.indexOf('gonative') > -1) {
          this.loggedOutMenuApp();
        }
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

  async emailSignUp(data) {
    const liumail = data.liuid + '@student.liu.se';
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(liumail, data.password);
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

        this.updateUserData(newUser);
        // return this.createProfile(email)
        // return this.setUserDoc(user); // create initial user document
      }).catch(function (error) {
        console.log(error);
      });
      // return this.setUserDoc(user) // create initial user document
    } catch (error) {
      var errorCode = error.code;
      var errorMessage: string;
      if (errorCode == "auth/email-already-in-use") {
        errorMessage = "Det finns redan ett konto registrerat på detta LiU-ID. Logga in eller återställ lösenord.";
      } else if (errorCode == "auth/invalid-email") {
        errorMessage = "Inget giltigt LiU-ID";
      } else if (errorCode == "auth/operation-not-allowed") {
        errorMessage = "Operation not allowed";
      } else if (errorCode == "auth/weak-password") {
        errorMessage = "Svagt lösenord. Testa igen.";
      } else {
        errorMessage = "Något gick fel. Testa igen.";
      }
      throw new Error(errorMessage);
    }
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
    return this.isAuthenticated;
  }

  loggedInMenuApp() {
    var items = [{
      subLinks: [],
      label: "Hem",
      url: "https://teamdagarna.com/",
      icon: "fa-home"
    },
    {
      subLinks: [
        {
          subLinks: [],
          label: "Företagen 2024",
          url: "https://teamdagarna.com/companies"
        },
       // {
        //  subLinks: [],
        //  label: "Tävling med Exsitec",
        //  url: "https://teamdagarna.com/exsiteccompetition"
        //},
     //   {
       //   subLinks: [],
        //  label: "Jobbmöjligheter",
        //  url: "https://teamdagarna.com/jobopportunities"
       // },
        {
          subLinks: [],
          label: "Framtidschansen",
          url: "https://teamdagarna.com/framtidschansen"
        },
        {
          subLinks: [],
          label: "Event",
          url: "https://teamdagarna.com/events"
        },
        //{
          //subLinks: [],
         // label: "Mässkarta",
         // url: "https://teamdagarna.com/masskarta"
        //},
       // {
         // subLinks: [],
        //  label: "Mässchema",
         // url: "https://teamdagarna.com/fairschedule"
        //},
        // {
        // subLinks: [],
        //  label: "Pusseljakten",
        // url: "https://teamdagarna.com/pusseljakten"
        // }, 
        // {
        //   subLinks: [],
        //   label: "Företagsskyltar",
        //   url: "https://teamdagarna.com/foretagsskyltar"
        // },
      /*   {
          subLinks: [],
          label: "Sök värd",
          url: "https://teamdagarna.com/sokvard"
        }, */
       {
          subLinks: [],
          label: "Kontaktsamtal",
          url: "https://teamdagarna.com/interviewapplication"
       },
        //{
        // subLinks: [],
        // label: "Sök DreamTEAM",
        // url: "https://teamdagarna.com/sokdreamteam"
        // }
      ],
      label: "För Studenter",
      isGrouping: true,
      icon: "fa-users"
    },
    {
      subLinks: [
        {
          subLinks: [],
          label: "Erbjudande",
          url: "https://teamdagarna.com/weoffer"
        },
        {
          subLinks: [],
          label: "Produktportfölj",
          url: "https://teamdagarna.com/productportfolio"
        },
        {
          subLinks: [],
          label: "FAQ",
          url: "https://teamdagarna.com/faq"
        },
        {
          subLinks: [],
          label: "Om utbildningarna",
          url: "https://teamdagarna.com/educations"
        },
        {
          subLinks: [],
          label: "Hitta hit",
          url: "https://teamdagarna.com/find"
        },
        //{
        //  subLinks: [],
        //  label: "Sponsorer",
        //  url: "https://teamdagarna.com/sponsors"
        //},
      //  {
      //    subLinks: [],
      //    label: "Intresseanmälan",
      //    url: "https://teamdagarna.com/pre-registration"
      //  }, 
      //  {
       //   subLinks: [],
        //  label: "Inloggning gästföretag",
        //  url: "https://teamdagarna.com/companysignin"
       // }
      ],
      label: "För företag",
      isGrouping: true,
      icon: "fa-briefcase"
    },
    {
      subLinks: [],
      label: "Hållbarhet",
      url: "https://teamdagarna.com/hallbarhet",
      icon: "fa-leaf"
    },
    {
      subLinks: [],
      label: "TEAM-bloggen",
      url: "https://teamdagarna.com/blogposts",
      icon: "fa-comment"
    },
    {
      subLinks: [
        {
          subLinks: [],
          label: "Kontakt",
          url: "https://teamdagarna.com/dreamteam"
        },
        {
          subLinks: [],
          label: "Om TEAM-dagarna",
          url: "https://teamdagarna.com/about"
        },
        // {
        //   subLinks: [],
        //   label: "Hållbarhet",
        //   url: "https://teamdagarna.com/hallbarhet"
        // },
        {
          subLinks: [],
          label: "Integritetspolicy",
          url: "https://teamdagarna.com/integritetspolicy"
        }
      ],
      label: "Om oss",
      isGrouping: true,
      icon: "fa-question"
    },
    {
      subLinks: [],
      label: "English info",
      url: "https://teamdagarna.com/about-english",
      icon: "fa-cog"
    },
    {
      subLinks: [
        {
          subLinks: [],
          label: "Min profil",
          url: "https://teamdagarna.com/profile",
        },
       // {
       //   sublinks: [],
       //   label: "Mina favoritföretag",
       //   url: "https://teamdagarna.com/favoritforetag",
       //   icon: "fa-heart"
       // }
      ],
      label: "Mina sidor",
      isGrouping: true,
      icon: "fa-user"
    },
    {
      subLinks: [],
      label: "Logga ut",
      url: "https://teamdagarna.com/signout",
      icon: "fa-sign-out"
    }
    ];
    var json = JSON.stringify(items);
    window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
  }

  loggedOutMenuApp() {
    var items2 = [{
      subLinks: [],
      label: "Hem",
      url: "https://teamdagarna.com/",
      icon: "fa-home"
    },
    {
      subLinks: [
        // OBS LÄGG TILL KOMMA EFTER kontaktsamtal
        {
          subLinks: [],
          label: "Företagen 2024",
          url: "https://teamdagarna.com/companies"
        },
        //{
         // subLinks: [],
          //label: "Tävling med Exsitec",
          //url: "https://teamdagarna.com/exsiteccompetition"
        //},
        {
          subLinks: [],
          label: "Jobbmöjligheter",
          url: "https://teamdagarna.com/jobcatalogue"
        },
        {
          subLinks: [],
          label: "Framtidschansen",
          url: "https://teamdagarna.com/framtidschansen"
        },
        {
          subLinks: [],
          label: "Event",
          url: "https://teamdagarna.com/events"
        },
        // {
        //   subLinks: [],
        //   label: "TEAM-bloggen",
        //   url: "https://teamdagarna.com/blogposts"
        // },
        //{
        //  subLinks: [],
        //  label: "Mässkarta",
        //  url: "https://teamdagarna.com/masskarta"
        //},
        //{
        //  subLinks: [],
        //  label: "Mässchema",
        //  url: "https://teamdagarna.com/fairschedule"
        //},
        //{
        //subLinks: [],
        //label: "Pusseljakten",
        //url: "https://teamdagarna.com/pusseljakten"
        //},
        // {
        //   subLinks: [],
        //   label: "Företagsskyltar",
        //   url: "https://teamdagarna.com/foretagsskyltar"
        // },
      /*   {
          subLinks: [],
          label: "Sök värd",
          url: "https://teamdagarna.com/sokvard"
        }, */
         {
          subLinks: [],
          label: "Kontaktsamtal",
          url: "https://teamdagarna.com/interview"
        }, 
        // {
        //   subLinks: [],
        //   label: "Sök DreamTEAM",
        //   url: "https://teamdagarna.com/sokdreamteam"
        // }
      ],
      label: "För Studenter",
      isGrouping: true,
      icon: "fa-users"
    },
    {
      subLinks: [
        {
          subLinks: [],
          label: "Erbjudande",
          url: "https://teamdagarna.com/weoffer"
        },
        {
          subLinks: [],
          label: "Produktportfölj",
          url: "https://teamdagarna.com/productportfolio"
        },
        {
          subLinks: [],
          label: "FAQ",
          url: "https://teamdagarna.com/faq"
        },
        {
          subLinks: [],
          label: "Om utbildningarna",
          url: "https://teamdagarna.com/educations"
        },
        {
          subLinks: [],
          label: "Hitta hit",
          url: "https://teamdagarna.com/find"
        },
        //{
        //  subLinks: [],
        //  label: "Sponsorer",
        //  url: "https://teamdagarna.com/sponsors"
        //},
        //{
        //  subLinks: [],
        //  label: "Intresseanmälan",
        //  url: "https://teamdagarna.com/pre-registration"
        //}, 
        //{
        //  subLinks: [],
        //  label: "Inloggning gästföretag",
        //  url: "https://teamdagarna.com/companysignin"
        //}

      ],
      label: "För företag",
      isGrouping: true,
      icon: "fa-briefcase"
    },
    {
      subLinks: [],
      label: "Hållbarhet",
      url: "https://teamdagarna.com/hallbarhet",
      icon: "fa-leaf"
    },
    // {
    //   subLinks: [],
    //   label: "TEAM-bloggen",
    //   url: "https://teamdagarna.com/blogposts",
    //   icon: "fa-comment"
    // },
    {
      subLinks: [
        {
          subLinks: [],
          label: "Kontakt",
          url: "https://teamdagarna.com/dreamteam"
        },
        {
          subLinks: [],
          label: "Om TEAM-dagarna",
          url: "https://teamdagarna.com/about"
        },
        // {
        //   subLinks: [],
        //   label: "Hållbarhet",
        //   url: "https://teamdagarna.com/hallbarhet"
        // },
        {
          subLinks: [],
          label: "Integritetspolicy",
          url: "https://teamdagarna.com/integritetspolicy"
        }
      ],
      label: "Om oss",
      isGrouping: true,
      icon: "fa-question"
    },
    {
      subLinks: [],
      label: "English info",
      url: "https://teamdagarna.com/about-english",
      icon: "fa-cog"
    },
    {
      subLinks: [],
      label: "Logga in",
      url: "https://teamdagarna.com/signin",
      icon: "fa-sign-out"
    }
    ];
    var json = JSON.stringify(items2);
    window.location.href = 'gonative://sidebar/setItems?items=' + encodeURIComponent(json);
  }

  isVerified() {
    return this.emailIsVerified;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      //Checks if request comes from the app. If user signs out the info in the navbar will change in the app.
      if (navigator.userAgent.indexOf('gonative') > -1) {
        this.loggedOutMenuApp();
      }
      this.router.navigate([''])
    });
  }

  getUserID() {
    return this.afAuth.auth.currentUser.uid;
  }

  getUserEmail() {
    return this.afAuth.auth.currentUser.email;
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
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }

}
