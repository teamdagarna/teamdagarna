import { Component, AfterViewInit } from '@angular/core';

declare var Jexpo: any;
declare global {
  interface Window {
    Jexpo: any[];
  }
}
@Component({
  selector: 'app-exhibitors-pre-registration',
  templateUrl: './exhibitors-pre-registration.component.html',
  styleUrls: ['./exhibitors-pre-registration.component.scss'],
})
export class ExhibitorsPreRegistrationComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    window.Jexpo = (window.Jexpo || []).concat(function(){
      Jexpo.widget('/team/bundles/exhibitors-pre-registration.jsx', '#pre-registration');
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