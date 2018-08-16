import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Company } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Subject } from 'rxjs';

import { switchMap, map} from 'rxjs/operators';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})



export class CompaniesComponent implements OnInit {


  isModalActive: boolean = false;
  showFilters: boolean = false;
  modalCompany: Company;
  showSpinner: boolean = true;
  orderBy: number = 1;
  filters = {}
  private companiesCollection: AngularFirestoreCollection<Company>;
  companies: any;
  filteredCompanies: any;

  constructor(private readonly afs: AngularFirestore) {
    this.companiesCollection = afs.collection<Company>('companies');
    // this.companies = this.companiesCollection.valueChanges();
    this.getCompanies().subscribe(companies => {
        this.companies = companies;
        this.applyOrder(this.orderBy);
        this.applyFilters();
        this.showSpinner = false;
    });
  }

  ngOnInit() {
  }

  getCompanies() {
    return this.afs.collection<Company>('companies').valueChanges();
  }
  /// filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    if (!rule) this.removeFilter(property)
    else {
      this.filters[property] = val => val
      console.log(this.filters)
      this.applyFilters()
    }
  }

  private applyFilters() {
  //   this.filteredCompanies = _.filter(this.companies, _.conforms(this.filters) )
     this.filteredCompanies = _.filter(this.companies, _.conforms(this.filters))
  }
  private applyOrder(cond) {
    if (cond == 1) {
      this.orderBy = 1;
      this.filteredCompanies = _.shuffle(this.filteredCompanies);
    } else if (cond == 2) {
      this.orderBy = 2;
      this.filteredCompanies = _.orderBy(this.filteredCompanies, ['name'])
    } else if (cond== 3) {
      this.orderBy = 3;
      this.filteredCompanies = _.orderBy(this.filteredCompanies, ['name'], ['desc'])
    }
  }

  clearFilter() {
    var clist = document.getElementsByTagName("input");
    for (var i = 0; i < clist.length; ++i) {
      if (false != clist[i].checked ) {
        clist[i].click();
      }
    }
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }

  filterIsOn() {
      return !_.isEmpty(this.filters);

  }

  closeModal() {
    this.isModalActive = !this.isModalActive;
  }
  openModal(companyToView) {
    this.isModalActive = !this.isModalActive;
    this.modalCompany = companyToView;
  }

}
