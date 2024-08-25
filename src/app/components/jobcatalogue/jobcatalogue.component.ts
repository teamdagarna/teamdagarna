import { Component, AfterViewInit } from '@angular/core';

declare var Jexpo: any;
declare global {
  interface Window {
    Jexpo: any[];
  }
}
@Component({
  selector: 'app-jobcatalogue',
  templateUrl: './jobcatalogue.component.html',
  styleUrls: ['./jobcatalogue.component.scss']
})
export class JobcatalogueComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    window.Jexpo = (window.Jexpo || []).concat(function(){
      Jexpo.widget('/team/bundles/exhibitors-jobs-catalogue.jsx', '#jobs-catalogue');
    });
  }
  loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

}
