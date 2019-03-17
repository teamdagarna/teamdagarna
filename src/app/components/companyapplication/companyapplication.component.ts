import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml, SafeScript} from '@angular/platform-browser';

@Component({
  selector: 'app-companyapplication',
  templateUrl: './companyapplication.component.html',
  styleUrls: ['./companyapplication.component.scss']
})
export class CompanyapplicationComponent implements OnInit {

  dangerousScript: string="";
  trustedScript: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.dangerousScript = "<script type=\"text/javascript\"> _podioWebForm.render(\"1558304\") </script>" +
    "<noscript><a href=\"https://podio.com/webforms/22201647/1558304\" target=\"_blank\">Fyll i formuläret</a></noscript>" +
    "<div class=\"podio-webform-container\">A webform by <a href=\"https://podio.com\" class=\"podio-webform-inner\" rel=\"nofollow\">Podio</a></div>"
    this.trustedScript = sanitizer.bypassSecurityTrustHtml(this.dangerousScript);
  }

  ngOnInit() {
  }

}
