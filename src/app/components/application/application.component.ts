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

  isMessageVisible: boolean = false;

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
}