import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-design-property',
  templateUrl: './form-design-property.component.html',
  styleUrls: ['./form-design-property.component.scss']
})
export class FormDesignPropertyComponent implements OnInit {
  @Input() formDesign: any;

  public widthOptions: Array<string> = ['500px', '550px', '600px', '650px', '700px', '750px'];

  constructor(private translate: TranslateService) {}

  ngOnInit() {}
}
