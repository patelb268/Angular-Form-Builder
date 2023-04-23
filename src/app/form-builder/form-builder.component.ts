import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';
import { PreviewHtmlComponent } from '@app/shared/preview-html/preview-html.component';
import socialIcons from '@app/shared/drag-drop-content/elements/social-property/social-icons';
import { GeneratedCodeModalComponent } from './generated-code-modal/generated-code-modal.component';
import { FormBuilderService } from './form-builder-service.service';
import { I18nService } from '@app/shared/i18n.service';
import { ComponentSettingInterface } from '@app/shared/drag-drop-content/interfaces/component-setting.interface';
import { FormInterface } from '@app/shared/drag-drop-content/interfaces/form.interface';
import { ElementInterface } from '@app/shared/drag-drop-content/interfaces/element.interface';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('popover') popover!: NgbPopover;

  /**
   * Array for containing dropped components in a form
   */
  addedComponents!: Array<ElementInterface>;

  /**
   * Object for containing drag & drop form
   */
  subscriptionForm: FormInterface = {
    content_dnd: {
      added_components: [],
      form_design: {
        fullWidth: false,
        width: 600,
        page_alignment: 'top',
        background_color: '#f5f5f5',
        container_background_color: '#ffffff',
        text_color: '#000000',
        font_family: "'Helvetica Neue', Helvetica, sans-serif",
        font_size: 16,
        rounded_corners: 8,
        page_paddings: 15,
        form_paddings: 15,
        field_rounded_corners: 5,
        form_border_width: 1,
        form_border_color: '#ced4da',
        field_background_color: '#ffffff',
        field_border_width: 1,
        field_border_color: '#ced4da',
        label_font_color: '#000000',
        label_font_size: 14,
        label_font_bold: false,
        label_font_italic: false,
        field_size: 'm',
      },
    },
  };

  /**
   * Property for containing which tab is activated
   * 1: Current Element
   * 2: Form Design
   */
  public activeTab = 2;

  /**
   * Array for containing only section components
   */
  public sectionComponents: Array<ElementInterface> = [];

  /**
   * Array for containing components except section component
   */
  public components: Array<ElementInterface> = [];

  /**
   * Property for containing class name when dragging element
   */
  public dragStartClass: string = '';

  /**
   * Object for containing current selected component
   */
  public selectedComponent!: null | ElementInterface;

  /**
   * Object for containing component setting properties
   */
  protected componentSettings: ComponentSettingInterface = {
    background_color: '',
    rounded_corners: 0,
    padding_top: 10,
    padding_right: 0,
    padding_bottom: 10,
    padding_left: 0,
    height: 0,
  };

  /**
   * Current language ISO code
   */
  public currentLanguage: string = '';

  constructor(
    public vcRef: ViewContainerRef,
    private modalService: NgbModal,
    private translate: TranslateService,
    private formBuilderService: FormBuilderService,
    private i18nService: I18nService
  ) {}

  /**
   * On Init handler
   */
  ngOnInit() {
    document.body.classList.add('drag-drop-page');

    this.currentLanguage = this.i18nService.language;

    this.sectionComponents = [
      {
        name: this.translate.instant('2 columns'),
        machineName: 'section',
        image: 'assets/col2.png',
        column: '2',
        addedComponents: new Array(2).fill([] as ElementInterface[]),
        deletable: true,
      },
      {
        name: this.translate.instant('3 columns'),
        machineName: 'section',
        image: 'assets/col3.png',
        column: '3',
        addedComponents: new Array(3).fill([] as ElementInterface[]),
        deletable: true,
      },
      {
        name: this.translate.instant('4 columns'),
        machineName: 'section',
        image: 'assets/col4.png',
        column: '4',
        addedComponents: new Array(4).fill([] as ElementInterface[]),
        deletable: true,
      },
      {
        name: this.translate.instant('5 columns'),
        machineName: 'section',
        image: 'assets/col5.png',
        column: '5',
        addedComponents: new Array(5).fill([] as ElementInterface[]),
        deletable: true,
      },
      {
        name: this.translate.instant('2 Columns (2:1)'),
        machineName: 'section',
        image: 'assets/col2-1-3.png',
        column: '2-1-3',
        addedComponents: new Array(2).fill(<ElementInterface[]>[]),
        deletable: true,
      },
      {
        name: this.translate.instant('2 Column (1:2)'),
        machineName: 'section',
        image: 'assets/col2-3-1.png',
        column: '2-3-1',
        addedComponents: new Array(2).fill([] as ElementInterface[]),
        deletable: true,
      },
    ];

    this.components = [
      {
        name: this.translate.instant('Button'),
        machineName: 'button',
        iconClass: 'fas fa-square fa-2x',
        addedComponents: [],
        element: {
          content: 'Button',
          link_to: '',
          button_type: 'button',
          button_style: '',
          button_color: '#0143a3',
          text_color: '#FFFFFF',
          rounded_corners: 0,
          button_size_type: 'auto',
          button_size: 100,
          font_family: "'Helvetica Neue', Helvetica, sans-serif",
          font_size: 16,
          font_bold: false,
          font_italic: false,
          line_height: 1.5,
          height: 30,
          alignment: 'center',
          vertical_align: 'middle',
          box_shadow_color: '',
          gradient_top_color: '',
          gradient_bottom_color: '',
        },
        deletable: true,
        type: 'text',
      },
      {
        name: this.translate.instant('Input'),
        machineName: 'input',
        iconClass: 'far fa-square fa-2x',
        addedComponents: [],
        element: {
          label: 'Input label',
          field_name: null,
          is_required: false,
          show_label: true,
          placeholder_text: 'Placeholder text',
        },
        deletable: true,
        type: 'text',
      },
      {
        name: this.translate.instant('Textarea'),
        machineName: 'textarea',
        iconClass: 'far fa-window-maximize fa-2x',
        addedComponents: [],
        element: {
          label: 'Textarea label',
          field_name: null,
          is_required: false,
          show_label: true,
          placeholder_text: 'Placeholder text',
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Dropdown'),
        machineName: 'dropdown',
        iconClass: 'far fa-caret-square-down fa-2x',
        addedComponents: [],
        element: {
          label: 'Dropdown label',
          options: [
            {
              id: UUID.UUID(),
              text: this.translate.instant('Option') + ' 1',
              value: this.translate.instant('Value') + ' 1',
              is_selected: true,
            },
            {
              id: UUID.UUID(),
              text: this.translate.instant('Option') + ' 2',
              value: this.translate.instant('Value') + ' 2',
              is_selected: false,
            },
            {
              id: UUID.UUID(),
              text: this.translate.instant('Option') + ' 3',
              value: this.translate.instant('Value') + ' 3',
              is_selected: false,
            },
          ],
          is_required: false,
          show_label: true,
          field_name: null,
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Radio buttons'),
        machineName: 'radios',
        iconClass: 'fas fa-list-ul fa-2x',
        addedComponents: [],
        element: {
          label: 'Radio buttons label',
          options: [
            {
              id: UUID.UUID(),
              text: this.translate.instant('Option') + ' 1',
              value: this.translate.instant('Value') + ' 1',
              is_selected: true,
            },
            {
              id: UUID.UUID(),
              text: this.translate.instant('Option') + ' 2',
              value: this.translate.instant('Value') + ' 2',
              is_selected: false,
            },
            {
              id: UUID.UUID(),
              text: this.translate.instant('Option') + ' 3',
              value: this.translate.instant('Value') + ' 3',
              is_selected: false,
            },
          ],
          is_required: false,
          show_label: true,
          field_name: null,
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Checkbox'),
        machineName: 'checkbox',
        iconClass: 'far fa-check-square fa-2x',
        addedComponents: [],
        element: {
          label: 'Checkbox label',
          field_name: null,
          is_required: false,
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Text'),
        machineName: 'text',
        iconClass: 'fas fa-language fa-2x',
        addedComponents: [],
        element: {
          content:
            '<p>New Text Section</p>\
          <p>Click in the section and start typing to add content.</p>',
          line_height: 1.5,
          text_color: null,
          font_family: "'Helvetica Neue', Helvetica, sans-serif",
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Picture'),
        machineName: 'picture',
        iconClass: 'far fa-image fa-2x',
        addedComponents: [],
        element: {
          image_url: '',
          image_link: '',
          alignment: 'center',
          alt_text: '',
          width: 0,
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Spacer'),
        machineName: 'spacer',
        iconClass: 'fas fa-arrows-alt-v fa-2x',
        addedComponents: [],
        element: {
          height: 30,
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Separator'),
        machineName: 'separator',
        iconClass: 'fas fa-grip-lines fa-2x',
        addedComponents: [],
        element: {
          border_style: 'solid',
          border_color: '',
          border_width: 1,
        },
        deletable: true,
      },
      {
        name: this.translate.instant('Social'),
        machineName: 'social',
        iconClass: 'fas fa-share-alt fa-2x',
        addedComponents: [],
        element: {
          icon_size: '32px',
          alignment: 'left',
          placement: 'horizontally',
        },
        buttons: [
          { ...socialIcons[0], id: UUID.UUID() },
          { ...socialIcons[1], id: UUID.UUID() },
          { ...socialIcons[2], id: UUID.UUID() },
          { ...socialIcons[3], id: UUID.UUID() },
          { ...socialIcons[4], id: UUID.UUID() },
        ],
        deletable: true,
      },
      {
        name: this.translate.instant('Uploader'),
        machineName: 'uploader',
        iconClass: 'fas fa-upload fa-2x',
        addedComponents: [],
        element: {
          field_name: null,
          upload_url: 'https://example.com/upload-handler',
          accepted_files: 'image/*',
          max_file_size: 2,
          placeholder: this.translate.instant(
            'Click or drag images here to upload'
          ),
          line_height: 1.5,
          text_color: null,
          font_family: "'Helvetica Neue', Helvetica, sans-serif",
          font_size: 16,
          border_style: 'dashed',
          border_color: '#c7c3c3',
          border_width: 3,
          width_type: 'full-width',
          width: 150,
          alignment: 'center',
        },
        deletable: true,
      },
    ];
  }

  /**
   * On destroy handler
   */
  ngOnDestroy() {
    document.body.classList.remove('drag-drop-page');
  }

  /**
   * On preview handler
   */
  onPreview() {
    const modalRef = this.modalService.open(PreviewHtmlComponent, {
      size: 'lg',
      windowClass: 'full-width',
      centered: true,
      scrollable: false,
    });
    this.formBuilderService.components =
      this.subscriptionForm.content_dnd.added_components;
    this.formBuilderService.formDesign =
      this.subscriptionForm.content_dnd.form_design;

    modalRef.componentInstance.content = this.formBuilderService.generateHtml();
  }

  /**
   * On drag start event handler
   *
   * @param event
   */
  onDragStart(event: DragEvent) {
    this.dragStartClass = 'bg-light';
  }

  /**
   * On dragged event handler
   *
   * @param item
   * @param list
   * @param effect
   */
  onDragged(
    item: ElementInterface,
    list: Array<ElementInterface>,
    effect: string
  ) {
    if (effect === 'move') {
      const index = list.findIndex((i: any) => {
        if (item.id && item.id === i.id) {
          return true;
        }

        return false;
      });

      list.splice(index, 1);
    }
  }

  /**
   * On drag end event handler
   *
   * @param event
   */
  onDragEnd(event: DragEvent) {
    this.dragStartClass = '';
  }

  /**
   * On dropped event hanlder
   *
   * @param event
   * @param list
   * @returns
   */
  onDrop(event: DndDropEvent, list: Array<ElementInterface>) {
    this.closePopover();

    if (['copy', 'move'].indexOf(event.dropEffect) === -1) {
      return false;
    }

    let index = event.index;

    if (typeof index === 'undefined') {
      index = list.length;
    }

    // Reset selected state
    this.resetAllSelectedState();

    const component = _.clone(event.data);
    component.isSelected = true;
    component.id = UUID.UUID();

    if (
      [
        'radios',
        'dropdown',
        'input',
        'checkbox',
        'textarea',
        'uploader',
      ].includes(component.machineName)
    ) {
      component.element.field_name = `${component.machineName}-${component.id
        .split('-')
        .shift()}`;
    }

    if (
      component.machineName === 'radios' ||
      component.machineName === 'dropdown'
    ) {
      for (let option of component.element.options) {
        option.id = UUID.UUID();
      }
    }

    if (!component.hasOwnProperty('componentSettings')) {
      component.componentSettings = _.clone(this.componentSettings);
    }

    this.selectedComponent = component;
    list.splice(index, 0, component);

    this.activeTab = 1;

    return true;
  }

  /**
   * Set component as selected
   *
   * @param $event
   * @param component
   */
  setSelectedComponent($event: any, component: ElementInterface) {
    $event.stopPropagation();
    this.resetAllSelectedState();
    component.isSelected = true;
    this.selectedComponent = component;

    this.activeTab = 1;
  }

  /**
   * Reset all selected elements's state
   */
  resetAllSelectedState() {
    this.subscriptionForm.content_dnd.added_components.forEach((c: any) => {
      c.isSelected = false;

      if (c.addedComponents.length > 0) {
        c.addedComponents.forEach((cc: Array<any>) => {
          cc.forEach((ccc) => {
            ccc.isSelected = false;
          });
        });
      }
    });
  }

  /**
   * Delete selected component
   *
   * @param $event
   * @param id
   */
  deleteComponent($event: any, id: string) {
    $event.stopPropagation();

    const modalConfirm = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
    });

    modalConfirm.componentInstance.title = this.translate.instant(
      'Delete confirmation'
    );
    modalConfirm.componentInstance.message = this.translate.instant(
      'Are you sure, that you want to delete this element?'
    );

    modalConfirm.result.then(
      (result) => {
        if (result === 'OK_CLICK') {
          let index = -1;
          for (let c of this.subscriptionForm.content_dnd.added_components) {
            index++;
            if (c.id === id) {
              this.subscriptionForm.content_dnd.added_components.splice(
                index,
                1
              );
              break;
            }

            if (c.addedComponents.length) {
              for (let cc of c.addedComponents) {
                let cIndex = _.findIndex(cc, { id: id });

                if (cIndex > -1) {
                  cc.splice(cIndex, 1);
                  break;
                }
              }
            }
          }

          this.selectedComponent = null;
        }
      },
      (reason) => {}
    );
  }

  /**
   * Close Add section popup
   */
  closePopover() {
    if (this.popover.isOpen()) this.popover.close();
  }

  /**
   * Generate form builder to HTML code
   *
   * @return string
   */
  generateHtml() {
    const modalRef = this.modalService.open(GeneratedCodeModalComponent, {
      size: 'lg',
    });

    this.formBuilderService.components =
      this.subscriptionForm.content_dnd.added_components;
    this.formBuilderService.formDesign =
      this.subscriptionForm.content_dnd.form_design;

    modalRef.componentInstance.title = this.translate.instant('HTML code');
    modalRef.componentInstance.content = this.formBuilderService.generateHtml();
  }

  /**
   * Generate form builder to JSON code
   *
   * @return string
   */
  generateJson() {
    const modalRef = this.modalService.open(GeneratedCodeModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.title = this.translate.instant('JSON code');
    modalRef.componentInstance.content = JSON.stringify(
      this.subscriptionForm.content_dnd,
      null,
      2
    );
  }

  /**
   * Change application language
   *
   * @param langCode
   */
  changeLanguage(langCode: string) {
    this.currentLanguage = langCode;
    this.i18nService.language = langCode;
  }
}
