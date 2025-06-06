import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FavouritecompaniesService } from '../../services/favouritecompanies.service';
import { Company } from '../../shared/models';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs';

import { switchMap, map} from 'rxjs/operators';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})



export class CompaniesComponent implements OnInit {

  user;
  favouritecompanies: any;
  isFavourite: boolean;
  isModalActive: boolean = false;
  showFilters: boolean = false;
  modalCompany: Company;
  showSpinner: boolean = true;
  orderBy: number = 1;
  filters = {}
  companies: any;
  filteredCompanies: any;
  searchValue: string= "";
  searchInput: string="";

  constructor(private readonly afs: AngularFirestore, public auth: AuthService, private favourite: FavouritecompaniesService) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.favourite.getFavouriteCompanies(this.user).subscribe(favouritecompanies => {
          this.favouritecompanies = favouritecompanies;
        });
      }
    });
    // this.companies = this.companiesCollection.valueChanges();
    this.getCompanies().subscribe(companies => {
        this.companies = companies;
        this.applyFilters();
        this.applySearch();
        this.applyOrder(this.orderBy);
        this.showSpinner = false;
    });
  }

  ngOnInit() {}

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

  /// filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    if (!rule) this.removeFilter(property)
    else {
      this.filters[property] = val => val
      this.applyFilters()
    }
  }

  filterExact(property: string, rule: any, bol: boolean) {
    if (!bol) this.removeFilter(property)
    else {
      this.filters[property] = val => val == rule
      this.applyFilters()
    }
  }

  private applyFilters() {
  //   this.filteredCompanies = _.filter(this.companies, _.conforms(this.filters) )
     this.filteredCompanies = _.filter(this.companies, _.conforms(this.filters))
     if (this.searchValue) {
       this.applySearch();
     }
     // this.filteredCompanies = _.filter(this.filteredCompanies, function(company) {
	   //     return _.includes(company.name, "Bear");
     //   });
  }

  private applySearch() {
      const search = this.searchValue;

      const searchedCompanies = _.filter(this.companies, function(company) {
          // return _.includes(_.lowerCase(company.name), _.lowerCase(search));
          if (_.includes(_.lowerCase(company.name), _.lowerCase(search)) || _.includes(_.lowerCase(company.industry), _.lowerCase(search))) {
            return true;
          } else {
            return false;
          }
         });

      this.filteredCompanies = _.filter(searchedCompanies, _.conforms(this.filters))
  }

  applyOrder(cond) {
    if (cond == 1) {
      this.orderBy = 1;
      let specialCompanies = ['Exsitec', 'Deloitte AB', 'SCA'];
      let orderedCompanies = [];
      
      for(let i=0; i < specialCompanies.length; i++){
        let company = _.remove(this.filteredCompanies, function(company: Company) {
          return company.name === specialCompanies[i];
      });
      
      if (company.length > 0) {
        orderedCompanies.push(company[0]);
      }
    }
    this.filteredCompanies = _.shuffle(this.filteredCompanies);
    this.filteredCompanies.unshift(...orderedCompanies);
    } else if (cond == 2) {
      this.orderBy = 2;
      this.filteredCompanies = _.orderBy(this.filteredCompanies, ['name'])
    } else if (cond== 3) {
      this.orderBy = 3;
      this.filteredCompanies = _.orderBy(this.filteredCompanies, ['name'], ['desc'])
    }
  }

  clearFilter() {
    this.searchInput = '';
    this.searchValue = '';
    var clist = document.getElementsByTagName("input");
    for (var i = 0; i < clist.length; ++i) {
      if (false != clist[i].checked ) {
        clist[i].click();
      }
    }
    this.applyFilters();

  }

  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }

  filterIsOn() {
      return (!_.isEmpty(this.filters) || this.searchValue);
  }

  closeModal() {
    this.isModalActive = !this.isModalActive;
  }
  openModal(companyToView) {
    this.isModalActive = !this.isModalActive;
    this.modalCompany = companyToView;
  }

  checkFavourite(company) {
    const user = this.user;
    const companyName = company.name;
    const favouritecompanies = this.favouritecompanies;
    if(favouritecompanies) {
      if(favouritecompanies[companyName] != null) {
        this.isFavourite = favouritecompanies[companyName]
      } else {
        this.isFavourite = false;
      }
    } else {
      this.isFavourite = false;
    }
    return this.isFavourite;
  }

  toggleFavouriteCompany(company) {
    const user = this.user;
    const companyName = company.name;
      if (this.checkFavourite(company)) {
        this.favourite.unfavourite(user.uid, companyName)
      } else {
        this.favourite.favourite(user.uid, companyName)
      }
  }

  

}
