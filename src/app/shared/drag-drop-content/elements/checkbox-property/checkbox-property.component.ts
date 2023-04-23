import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-checkbox-property',
  templateUrl: './checkbox-property.component.html',
  styleUrls: ['./checkbox-property.component.scss']
})
export class CheckboxPropertyComponent implements OnInit {
  private _attributes: any;
  public booleanAttributes: Array<any> = [];

  @Input() component: any;
  @Input() set attributes(value: any) {
    this._attributes = value;

    if (this._attributes) {
      this.booleanAttributes = _.sortBy(
        this._attributes.filter((att: any) => {
          return att.type === 'boolean';
        }),
        ['name']
      );
    }
  }

  get attributes(): any {
    return this._attributes;
  }

  @Output() onBindVariableChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleOnBindVariableChange($event: any) {
    this.onBindVariableChange.emit({
      value: $event,
      id: this.component.id
    });
  }
}
