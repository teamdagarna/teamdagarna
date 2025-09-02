import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

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
export class ApplicationComponent implements AfterViewInit {

  isApplicationOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkTime();
  }

  @ViewChild('collapsibleHeader') collapsibleHeader!: ElementRef<HTMLDivElement>;
  @ViewChild('collapsibleContent') collapsibleContent!: ElementRef<HTMLDivElement>;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    window.Jexpo = (window.Jexpo || []).concat(function(){
      Jexpo.widget('/team/bundles/interviews-application.jsx', '#interviews-application');
    });

    this.collapsibleHeader.nativeElement.addEventListener('click', () => {
      this.collapsibleContent.nativeElement.classList.toggle('open');
      this.toggleBtn.nativeElement.classList.toggle('active');
    });
  }

  checkTime() {
    const now = new Date();

    // Close at 31 August 2025, 23:59:59
    const closeApplicationDate = new Date(2025, 7, 31, 23, 59, 59);

    if (now < closeApplicationDate) {
      this.isApplicationOpen = true;

      const timeUntilHide = closeApplicationDate.getTime() - now.getTime();
      setTimeout(() => {
        this.isApplicationOpen = false;
      }, timeUntilHide);
    } else {
      this.isApplicationOpen = false;
    }
  }
}