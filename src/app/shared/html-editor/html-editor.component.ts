import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { CKEditorComponent } from 'ngx-ckeditor';
import { TranslateService } from '@ngx-translate/core';
// import { I18nService } from '@app/core';
// import { UserService } from '@app/user/user.service';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('ckEditor') ckEditor: any;
  @Input() content: any;
  @Output() onContentChange = new EventEmitter<string>();

  public currentLanguage: string = '';

  // @see https://ckeditor.com/latest/samples/toolbarconfigurator/index.html#basic
  public editorConfig: any = {
    toolbarGroups: [
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'links', groups: ['links'] },
      { name: 'forms', groups: ['forms'] },
      { name: 'styles', groups: ['styles'] },
      { name: 'insert', groups: ['insert'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'about', groups: ['about'] }
    ],
    removeButtons:
      'Templates,Save,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,PageBreak,Iframe,Font,About,Print,Preview,NewPage',
    height: '70vh',
    filebrowserImageUploadUrl: '',
    filebrowserImageBrowseUrl: `/ckfinder.html?type=Images`,
    // Disable content filtering because if you use full page mode, you probably
    // want to  freely enter any HTML content in source mode without any limitations.
    allowedContent: true
  };

  constructor(
    private translate: TranslateService,
    // private i18nService: I18nService,
    // private userService: UserService
  ) {}

  ngOnInit() {
    // this.currentLanguage = this.i18nService.language;
  }

  ngAfterViewInit() {
    this._addPersonalizationDropdown();
    this._handleCkeditorEvents();
  }

  _addPersonalizationDropdown() {
    const editor = this.ckEditor && this.ckEditor.instance;

    if (!editor) {
      return;
    }    
  }

  handleValueChange(value: string | any) {
    this.onContentChange.emit(value);
  }

  _handleCkeditorEvents() {
  }
}
