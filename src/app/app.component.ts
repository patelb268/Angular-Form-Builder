import { Component, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from './shared/i18n.service';

import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-form-builder';

  constructor(private i18nService: I18nService) {
    
  }

  ngOnInit() {
    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
    