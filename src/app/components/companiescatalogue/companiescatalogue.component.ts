import { Component, AfterViewInit } from '@angular/core';

declare var Jexpo: any;
declare global {
  interface Window {
    Jexpo: any[];
  }
}
@Component({
  selector: 'app-companiescatalogue',
  templateUrl: './companiescatalogue.component.html',
  styleUrls: ['./companiescatalogue.component.scss']
})
export class CompaniescatalogueComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    window.Jexpo = (window.Jexpo || []).concat(function(){
      Jexpo.widget('/team/bundles/exhibitors-fair-catalogue.jsx', '#fair-catalogue');
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
