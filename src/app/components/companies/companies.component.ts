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
    // filterForm: FormGroup;
    // nonSelected: boolean = true;



  /// Active filter rules
  filters = {}

  intern: boolean;

  isModalActive: boolean = false;
  showFilters: boolean = false;
  modalCompany: Company;
  private companyCollection: AngularFirestoreCollection<Company>;
  // companies: Observable<Company[]>;
  companies: any;
  filteredCompanies: any;

  showSpinner: boolean = true;

  constructor(private readonly afs: AngularFirestore, public fb: FormBuilder) {
      this.afs.collection('companies').subscribe((companies) => {
        this.showSpinner = false
        this.applyFilters()
      })




  }

  ngOnInit() {

  }

  private applyFilters() {
    this.filteredCompanies = _.filter(this.companies, _.conforms(this.filters) )
  }
  /// filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    if (!rule) this.removeFilter(property)
    else {
      this.filters[property] = val => val
      this.applyFilters()
    }
  }
  /// removes filter
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }


  getCompanies() {
    return this.companies = this.afs.collection<Company>('companies').valueChanges();
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
