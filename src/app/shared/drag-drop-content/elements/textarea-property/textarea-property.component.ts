import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-textarea-property',
  templateUrl: './textarea-property.component.html',
  styleUrls: ['./textarea-property.component.scss']
})
export class TextareaPropertyComponent implements OnInit {
  private _attributes: any;

  @Input() component: any;

  @Input() set attributes(value: any) {
    this._attributes = value;

    if (this._attributes) {
      this.varcharAttributes = _.sortBy(
        this._attributes.filter((att: any) => {
          return att.type === 'varchar';
        }),
        ['name']
      );
    }
  }

  get attributes(): any {
    return this._attributes;
  }

  @Output() onBindVariableChange: EventEmitter<any> = new EventEmitter();
  public varcharAttributes: Array<any> = [];

  constructor() {}

  ngOnInit() {}

  handleOnBindVariableChange($event: any) {
    this.onBindVariableChange.emit({
      value: $event,
      id: this.component.id
    });
  }
}
