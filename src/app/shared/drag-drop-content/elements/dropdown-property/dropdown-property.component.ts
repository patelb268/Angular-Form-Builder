import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
@Component({
  selector: 'app-dropdown-property',
  templateUrl: './dropdown-property.component.html',
  styleUrls: ['./dropdown-property.component.scss']
})
export class DropdownPropertyComponent implements OnInit {
  private _attributes: any;
  public varcharAttributes: Array<any> = [];

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

  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  setAsDefault($event: any) {
    this.component.element.options.forEach((v: any, k: number) => {
      if (v.id == $event.target.value) {
        v.is_selected = true;
      } else {
        v.is_selected = false;
      }
    });
  }

  addOption() {
    this.component.element.options.push({
      id: UUID.UUID(),
      text: this.translate.instant('Option') + ' ' + (this.component.element.options.length + 1),
      value: this.translate.instant('Value') + ' ' + (this.component.element.options.length + 1),
      is_selected: false
    });
  }

  removeOption(optionId: any) {
    this.component.element.options = this.component.element.options.filter((v: any) => {
      return v.id != optionId;
    });
  }

  handleOnBindVariableChange($event: any) {
    this.onBindVariableChange.emit({
      value: $event,
      id: this.component.id
    });
  }
}
