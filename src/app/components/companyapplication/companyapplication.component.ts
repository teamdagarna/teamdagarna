import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml, SafeScript} from '@angular/platform-browser';

@Component({
  selector: 'app-companyapplication',
  templateUrl: './companyapplication.component.html',
  styleUrls: ['./companyapplication.component.scss']
})
export class CompanyapplicationComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

}
