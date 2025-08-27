import { Component, AfterViewInit, OnInit } from '@angular/core';

declare var Jexpo: any;
declare global {
  interface Window {
    Jexpo: any[];
  }
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements AfterViewInit, OnInit {

  isMessageVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkTime();
  }

  ngAfterViewInit(): void {
    window.Jexpo = (window.Jexpo || []).concat(function(){
      Jexpo.widget('/team/bundles/interviews-application.jsx', '#interviews-application');
    });
  }

  checkTime() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 8, 5, 12, 0, 0, 0); // Set to 8:00 AM on September 5th (month is 0-indexed)

    if (now >= targetDate) {
      this.isMessageVisible = true;
    } else {
      const timeUntilVisible = targetDate.getTime() - now.getTime();
      setTimeout(() => {
        this.isMessageVisible = true;
      }, timeUntilVisible);
    }
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

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector<HTMLButtonElement>("#pink-hero .toggle-btn");
  const content = document.querySelector<HTMLDivElement>("#pink-hero .collapsible-content");

  if (toggleBtn && content) {
    toggleBtn.addEventListener("click", () => {
      content.classList.toggle("open");
      toggleBtn.classList.toggle("active");
    });
  }
});