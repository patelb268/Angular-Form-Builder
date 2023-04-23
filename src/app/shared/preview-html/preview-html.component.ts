import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview-html',
  templateUrl: './preview-html.component.html',
  styleUrls: ['./preview-html.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewHtmlComponent {
  @Input() content: any;
    
  isLoading: Boolean = false;
  public modeClass: string = 'desktop-mode';

  constructor(public activeModal: NgbActiveModal) {
    
  }

  setViewMode(mode: string) {
    switch (mode) {
      case 'mobile':
        this.modeClass = 'mobile-mode';
        break;

      case 'tablet':
        this.modeClass = 'tablet-mode';
        break;

      default:
        this.modeClass = 'desktop-mode';
        break;
    }
  }
}
