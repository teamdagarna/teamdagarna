import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Company } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { switchMap, map} from 'rxjs/operators';

import * as _ from 'lodash';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})



export class CompaniesComponent implements OnInit {

  isModalActive: boolean = false;
  showFilters: boolean = false;
  modalCompany: Company;
  // private companyCollection: AngularFirestoreCollection<Company>;
  // companies: Observable<Company[]>;


  showSpinner: boolean = true;

  companies$: Observable<Company[]>;

  // FILTERS

  masterthesisFilter$: BehaviorSubject<boolean>;
  otherthesisFilter$: BehaviorSubject<boolean>;
  internshipFilter$: BehaviorSubject<boolean>;
  fulltimeFilter$: BehaviorSubject<boolean>;
  parttimeFilter$: BehaviorSubject<boolean>;
  summerjobFilter$: BehaviorSubject<boolean>;
  abroadFilter$: BehaviorSubject<boolean>;
  traineeFilter$: BehaviorSubject<boolean>;
  engineersFilter$: BehaviorSubject<boolean>;
  filfakareFilter$: BehaviorSubject<boolean>;
  firstyearFilter$: BehaviorSubject<boolean>;
  secondyearFilter$: BehaviorSubject<boolean>;
  thirdyearFilter$: BehaviorSubject<boolean>;
  fourthyearFilter$: BehaviorSubject<boolean>;
  fifthyearFilter$: BehaviorSubject<boolean>;
  firstdayappearanceFilter$: BehaviorSubject<boolean>;
  seconddayappearanceFilter$: BehaviorSubject<boolean>;
  treasurehuntFilter$: BehaviorSubject<boolean>;

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) {
    // this.companyCollection = afs.collection<Company>('companies');
    // this.getCompanies().subscribe(() => this.showSpinner = false)

        this.masterthesisFilter$ = new BehaviorSubject(true);
        this.otherthesisFilter$ = new BehaviorSubject(true);
        this.internshipFilter$ = new BehaviorSubject(true);
        this.fulltimeFilter$ = new BehaviorSubject(true);
        this.parttimeFilter$ = new BehaviorSubject(true);
        this.summerjobFilter$ = new BehaviorSubject(true);
        this.abroadFilter$ = new BehaviorSubject(true);
        this.traineeFilter$ = new BehaviorSubject(true);
        this.engineersFilter$ = new BehaviorSubject(true);
        this.filfakareFilter$ = new BehaviorSubject(true);
        this.internshipFilter$ = new BehaviorSubject(true);
        this.firstyearFilter$ = new BehaviorSubject(true);
        this.secondyearFilter$ = new BehaviorSubject(true);
        this.thirdyearFilter$ = new BehaviorSubject(true);
        this.fourthyearFilter$ = new BehaviorSubject(true);
        this.fifthyearFilter$ = new BehaviorSubject(true);
        this.firstdayappearanceFilter$ = new BehaviorSubject(true);
        this.seconddayappearanceFilter$ = new BehaviorSubject(true);
        this.treasurehuntFilter$ = new BehaviorSubject(true);

        this.companies$ = combineLatest(

          this.masterthesisFilter$,
          this.otherthesisFilter$,
          this.internshipFilter$,
          this.fulltimeFilter$,
          this.parttimeFilter$,
          this.summerjobFilter$,
          this.abroadFilter$,
          this.traineeFilter$,
          this.engineersFilter$,
          this.filfakareFilter$,
          this.internshipFilter$,
          this.firstyearFilter$,
          this.secondyearFilter$,
          this.thirdyearFilter$,
          this.fourthyearFilter$,
          this.fifthyearFilter$,
          this.firstdayappearanceFilter$,
          this.seconddayappearanceFilter$,
          this.treasurehuntFilter$
        ).pipe(
          switchMap(([internship, masterthesis, otherthesis, parttime, fulltime, trainee, summerjob, abroad, engineers, filfakare, firstyear, secondyear, thirdyear, fourthyear, fifthyear, firstdayappearance, seconddayappearance, th]) =>
            afs.collection<Company>('companies', ref => {
              let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
              if (internship == false) { query = query.where('offers.internship', '==', false) };
              if (masterthesis == false) { query = query.where('offers.masterthesis', '==', false) };
              if (otherthesis == false) { query = query.where('offers.otherthesis', '==', false) };
              if (parttime == false) { query = query.where('offers.parttime', '==', false) };
              if (fulltime == false) { query = query.where('offers.fulltime', '==', false) };
              if (trainee == false) { query = query.where('offers.trainee', '==', false) };
              if (abroad == false) { query = query.where('offers.abroad', '==', false) };
              if (trainee == false) { query = query.where('offers.trainee', '==', false) };

              if (engineers == false) { query = query.where('seeking.engineers', '==', false) };
              if (filfakare == false) { query = query.where('seeking.filfakare', '==', false) };
              if (firstyear == false) { query = query.where('seeking.firstyear', '==', false) };
              if (secondyear == false) { query = query.where('seeking.secondyear', '==', false) };
              if (thirdyear == false) { query = query.where('seeking.thirdyear', '==', false) };
              if (fourthyear == false) { query = query.where('seeking.fourthyear', '==', false) };
              if (fifthyear == false) { query = query.where('seeking.fifthyear', '==', false) };

              if (firstdayappearance == false) { query = query.where('appearance.firstdayappearance', '==', false) };
              if (seconddayappearance == false) { query = query.where('appearance.seconddayappearance', '==', false) };



              if (th == false) { query = query.where('treasurehunt', '==', true) };
              return query;
            }).valueChanges()
          )
        );

  }

  // OFFERS
  filterByInternship(internship: boolean) {
    this.internshipFilter$.next(internship);
  }
  filterByMasterthesis(masterthesis: boolean) {
    this.masterthesisFilter$.next(masterthesis);
  }
  filterByOtherthesis(otherthesis: boolean) {
    this.otherthesisFilter$.next(otherthesis);
  }
  filterByParttime(parttime: boolean) {
    this.parttimeFilter$.next(parttime);
  }
  filterByFulltime(fulltime: boolean) {
    this.fulltimeFilter$.next(fulltime);
  }
  filterBySummerjob(summerjob: boolean) {
    this.summerjobFilter$.next(summerjob);
  }
  filterByAbroad(abroad: boolean) {
    this.abroadFilter$.next(abroad);
  }
  filterByTrainee(trainee: boolean) {
    this.traineeFilter$.next(trainee);
  }
  // SEEKING
  filterByEngineers(engineers: boolean) {
    this.engineersFilter$.next(engineers);
  }
  filterByFilfakare(filfakare: boolean) {
    this.filfakareFilter$.next(filfakare);
  }
  filterByFirstyear(firstyear: boolean) {
    this.firstyearFilter$.next(firstyear);
  }
  filterBySecondyear(secondyear: boolean) {
    this.secondyearFilter$.next(secondyear);
  }
  filterByThirdyear(thirdyear: boolean) {
    this.thirdyearFilter$.next(thirdyear);
  }
  filterByFourthyear(fourthyear: boolean) {
    this.fourthyearFilter$.next(fourthyear);
  }
  filterByFifthyear(fifthyear: boolean) {
    this.fifthyearFilter$.next(fifthyear);
  }
  // Appearance
  filterByFirstdayappearance(firstdayappearance: boolean) {
    this.firstdayappearanceFilter$.next(firstdayappearance);
  }
  filterBySeconddayappearance(seconddayappearance: boolean) {
    this.seconddayappearanceFilter$.next(seconddayappearance);
  }
  // Treasurehunt
  filterByTreasurehunt(th: boolean) {
    this.treasurehuntFilter$.next(th);
  }


  ngOnInit() {

  }

  closeModal() {
    this.isModalActive = !this.isModalActive;
  }
  openModal(companyToView) {
    this.isModalActive = !this.isModalActive;
    this.modalCompany = companyToView;
  }

}

//   ngOnInit() {
//
//     this.filterForm = this.fb.group({
//       'companyName': ['', [
//         Validators.required
//         ]
//       ],
//       'internship': [false, [
//         ]
//       ],
//       'masterthesis': [false, [
//         ]
//       ],
//       'otherthesis': [false, [
//         ]
//       ],
//       'parttime': [false, [
//         ]
//       ],
//       'fulltime': [false, [
//         ]
//       ],
//       'trainee': [false, [
//         ]
//       ],
//       'summerjob': [false, [
//         ]
//       ],
//       'abroad': [false, [
//         ]
//       ],
//       'engineers': [false, [
//         ]
//       ],
//       'filfakare': [false, [
//         ]
//       ],
//       'firstyear': [false, [
//         ]
//       ],
//       'secondyear': [false, [
//         ]
//       ],
//       'thirdyear': [false, [
//         ]
//       ],
//       'fourthyear': [false, [
//         ]
//       ],
//       'fifthyear': [false, [
//         ]
//       ],
//       'firstdayappearance': [false, [
//         ]
//       ],
//       'seconddayappearance': [false, [
//         ]
//       ],
//       'offersinterview': [false, [
//         ]
//       ],
//       'treasurehunt': [false, [
//         ]
//       ],
//     });
//
//   }


//       'internship, masterthesis, otherthesis, parttime, fulltime, trainee, summerjob, abroad, engineers, filfakare, firstyear, secondyear, thirdyear, fourthyear, fifthyear, firstdayappearance, seconddayappearance
//       'offersinterview
//       'treasurehunt
//
//   }
//
//   closeModal() {
//     this.isModalActive = !this.isModalActive;
//   }
//   openModal(companyToView) {
//     this.isModalActive = !this.isModalActive;
//     this.modalCompany = companyToView;
//   }
//
// get internship() { return this.filterForm.get('internship') }
// get masterthesis() { return this.filterForm.get('masterthesis') }
// get otherthesis() { return this.filterForm.get('otherthesis') }
// get parttime() { return this.filterForm.get('parttime') }
// get fulltime() { return this.filterForm.get('fulltime') }
// get trainee() { return this.filterForm.get('trainee') }
// get summerjob() { return this.filterForm.get('summerjob') }
// get abroad() { return this.filterForm.get('abroad') }
// get engineers() { return this.filterForm.get('engineers') }
// get filfakare() { return this.filterForm.get('filfakare') }
// get firstyear() { return this.filterForm.get('firstyear') }
// get secondyear() { return this.filterForm.get('secondyear') }
// get thirdyear() { return this.filterForm.get('thirdyear') }
// get fourthyear() { return this.filterForm.get('fourthyear') }
// get fifthyear() { return this.filterForm.get('fifthyear') }
// get firstdayappearance() { return this.filterForm.get('firstdayappearance') }
// get seconddayappearance() { return this.filterForm.get('seconddayappearance') }
// get offersinterview() { return this.filterForm.get('offersinterview') }
// get treasurehunt() { return this.filterForm.get('treasurehunt') }
//
//   public async filterIsOn() {
//         this.nonSelected = true
//         Object.keys(this.filterForm.controls).forEach(key => {
//           if (this.filterForm.controls[key].value) {
//             this.nonSelected = false
//           }
//         });
//   }
//
//   clearFilters() {
//     this.filterForm.reset();
//     this.getCompanies().subscribe(() => this.showSpinner = false)
//     this.nonSelected = true
//   }
//
//   toggleFilters() {
//     this.showFilters = !this.showFilters;
//   }
//
//
//   getCompanies() {
//     return this.companies = this.afs.collection<Company>('companies').valueChanges();
//   }
//
//   async getFilteredCompanies() {
//     // return       this.companies = this.companyCollection.valueChanges();
//     await this.filterIsOn()
//
//
//       if (this.nonSelected) {
//         this.getCompanies()
//         this.nonSelected = true
//       } else {
//         return this.companies = this.afs.collection<Company>('companies', ref => {
//   // Compose a query using multiple .where() methods
//         return ref
//           .where('offers.internship', '==', this.internship)
//           // .where('masterthesis', '==', this.masterthesis)
//           // .where('otherthesis', '==', this.otherthesis)
//           // .where('parttime', '==', this.parttime)
//           // .where('fulltime', '==', this.fulltime)
//           // .where('trainee', '==', this.trainee)
//           // .where('abroad', '==', this.abroad)
//           // .where('engineers', '==', this.engineers)
//           // .where('filfakare', '==', this.filfakare)
//           // .where('firstyear', '==', this.firstyear)
//           // .where('secondyear', '==', this.secondyear)
//           // .where('thirdyear', '==', this.thirdyear)
//           // .where('fourthyear', '==', this.fourthyear)
//           // .where('fifthyear', '==', this.fifthyear)
//           // .where('firstdayappearance', '==', this.firstdayappearance)
//           // .where('seconddayappearance', '==', this.seconddayappearance)
//           // // .where('offersinterview', '==', this.offersinterview)
//           // .where('treasurehunt', '==', this.treasurehunt)
//
//
//           // .where('brand', '==', 'some-brand')
//           // .where('color', '==', 'gray')
//           // .where('price', '>', 10)
//           // .where('price', '<', 100)
//
//         }).valueChanges();
//       }
//
//     }
//
//
// }
