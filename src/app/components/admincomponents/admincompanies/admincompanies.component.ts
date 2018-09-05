import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirestoreService } from '../../../services/firestore.service';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Company } from '../../../shared/models';

import * as _ from 'lodash';

import { Subject } from 'rxjs';
import { switchMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-admincompanies',
  templateUrl: './admincompanies.component.html',
  styleUrls: ['./admincompanies.component.scss']
})
export class AdmincompaniesComponent implements OnInit {

  isModalActive: boolean = false;
  modalCompany: Company;
  showSpinner: boolean = true;
  companies: any;
  filteredCompanies: any;
  searchValue: string= "";
  private companiesCollection: AngularFirestoreCollection<Company>;

  constructor(private readonly afs: AngularFirestore) {

    this.companiesCollection = afs.collection<Company>('companies');
    // this.companies = this.companiesCollection.valueChanges();
    this.getCompanies().subscribe(companies => {
        this.companies = _.orderBy(companies, ['name'])
        this.applySearch();
        this.showSpinner = false;
    });
   }

   ngOnInit() {
   }

   getCompanies() {
     return this.afs.collection<Company>('companies').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Company;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

   onSearch(event: any) { // without type info
     this.searchValue = event.target.value;
     this.applySearch();
   }

   private applySearch() {
       const search = this.searchValue;
       this.filteredCompanies = _.filter(this.companies, function(company) {
        if (_.includes(_.lowerCase(company.name), _.lowerCase(search)) || _.includes(_.lowerCase(company.industry), _.lowerCase(search))) {
         return true;
        } else {
         return false;
        }
        });
   }

   closeModal() {
     this.isModalActive = !this.isModalActive;
   }
   openModal(companyToView) {
     this.isModalActive = !this.isModalActive;
     this.modalCompany = companyToView;
   }


}
