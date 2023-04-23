import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-input-property',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.scss']
})
export class InputPropertyComponent implements OnInit {
  private _attributes: any = [];
  public varcharAttributes: Array<any> = [];
  public inputTypes: Array<any> = [];

  @Input() component: any;
  @Input() set attributes(value: any) {
    this._attributes = value;
    if (this._attributes) {
      let defaultType = this.component.type;
      let attrTypes = ['varchar'];

      if (this.component.element.bind_to_variable) {
        for (let item of this._attributes) {
          if (item.slug === this.component.element.bind_to_variable) {
            defaultType = item.type;
            break;
          }
        }
      }

      switch (defaultType) {
        case 'date':
          attrTypes = ['date', 'varchar'];
          break;

        case 'datetime':
          attrTypes = ['datetime', 'varchar'];
          break;

        case 'number':
          attrTypes = ['integer', 'varchar'];
          break;

        default:
          attrTypes = ['varchar'];
      }

      this.varcharAttributes = _.sortBy(
        this._attributes.filter((att: any) => {
          return attrTypes.indexOf(att.type) > -1;
        }),
        ['name']
      );
    }
  }

  get attributes(): any {
    return this._attributes;
  }

  @Output() onBindVariableChange: EventEmitter<any> = new EventEmitter();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.inputTypes = [
      {
        value: 'text',
        label: this.translate.instant('Text')
      },
      {
        value: 'email',
        label: this.translate.instant('Email')
      },
      {
        value: 'date',
        label: this.translate.instant('Date')
      },
      {
        value: 'datetime',
        label: this.translate.instant('Date - Hour')
      },
      {
        value: 'number',
        label: this.translate.instant('Number')
      }
    ];
  }

  onInputTypeChange($event: any) {
    let attrTypes = ['varchar'];

    switch ($event) {
      case 'date':
        attrTypes = ['date', 'varchar'];
        break;

      case 'datetime':
        attrTypes = ['datetime', 'varchar'];
        break;

      case 'number':
        attrTypes = ['integer', 'varchar'];
        break;

      default:
        attrTypes = ['varchar'];
    }

    this.varcharAttributes = _.sortBy(
      this.attributes.filter((att: any) => {
        return attrTypes.indexOf(att.type) > -1;
      }),
      ['name']
    );

    this.handleOnBindVariableChange('');
  }

  handleOnBindVariableChange($event: any) {
    this.onBindVariableChange.emit({
      value: $event,
      id: this.component.id
    });
  }
}
