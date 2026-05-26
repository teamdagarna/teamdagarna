import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fair-catalogue-popup',
  template: `<div #catalogueProfile class="jexpo-wrapper"></div>`,
  styles: [`.jexpo-wrapper { min-height: 200px; color: black; }`]
})
export class FairCataloguePopupComponent implements OnChanges, OnDestroy {
  @Input() exhibitorEntity: any;
  @Output() handleClose = new EventEmitter<void>();
  @ViewChild('catalogueProfile', { static: true }) catalogueProfileEl!: ElementRef<HTMLDivElement>;

  private module: any;
  private reactRoot: any;
  private destroyed = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Rendera bara om vi faktiskt har en entity
    if (changes['exhibitorEntity'] && this.exhibitorEntity) {
      this.loadModule();
    }
  }

  ngOnDestroy(): void {
    console.log("Destroyed");
    this.destroyed = true;
    if (this.reactRoot) {
      try {
        this.reactRoot.unmount();
      } catch (e) {
        console.warn("Could not unmount React root", e);
      }
    }
  }

  private loadModule(): void {
    const win = (window as any);
    // Säkerställ att kön finns
    win.Jexpo = win.Jexpo || [];
    
    const init = async () => {
      try {
        // Vi hämtar modulen via den globala Jexpo-instansen
        const module = await win.Jexpo.import('/team/bundles/exhibitors-fair-catalogue.jsx');
        if (this.destroyed) return;
        this.module = module;
        this.render();
      } catch (err) {
        console.error("Failed to import Jexpo module:", err);
      }
    };

    // Om Jexpo redan är initierat som ett objekt med import-funktion
    if (win.Jexpo && typeof win.Jexpo.import === 'function') {
      init();
    } else {
      // Annars lägger vi oss i kön
      win.Jexpo.push(init);
    }
  }

  private render(): void {
  console.log(this.exhibitorEntity);

  if (!this.module || !this.exhibitorEntity || this.destroyed) return;

  try {
    const win = (window as any);
    const J = win.Jexpo;
    const React = J['react'];
    const ReactDOMClient = J['react-dom/client'].default;

    this.reactRoot ??= ReactDOMClient.createRoot(this.catalogueProfileEl.nativeElement);

    this.reactRoot.render(
      React.createElement(this.module.ProfileCard, { 
        entity: this.exhibitorEntity,
        handleClose: () => this.handleClose.emit()
      })
    );

  } catch (err) {
    console.error("Jexpo Rendering failed with ProfileCard:", err);
  }
}
}