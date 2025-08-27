import { Component, AfterViewInit } from '@angular/core';

declare var Jexpo: any;
declare global {
  interface Window {
    Jexpo: any[];
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    window.Jexpo = (window.Jexpo || []).concat(function(){
      Jexpo.widget('/team/bundles/exhibitors-registration.jsx', '#registration');
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