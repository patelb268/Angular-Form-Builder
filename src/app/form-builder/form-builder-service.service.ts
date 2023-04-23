import { Injectable } from '@angular/core';
import { ButtonInterface } from '@app/shared/drag-drop-content/interfaces/button.interface';
import { CheckboxInterface } from '@app/shared/drag-drop-content/interfaces/checkbox.interface';
import { ElementInterface } from '@app/shared/drag-drop-content/interfaces/element.interface';
import { FormDesignInterface } from '@app/shared/drag-drop-content/interfaces/form-design.interface';
import { InputInterface } from '@app/shared/drag-drop-content/interfaces/input.interface';
import { MultipleSelectInterface } from '@app/shared/drag-drop-content/interfaces/multiple-select.interface';
import { PictureInterface } from '@app/shared/drag-drop-content/interfaces/picture.interface';
import { SeparatorInterface } from '@app/shared/drag-drop-content/interfaces/separator.interface';
import { SocialInterface } from '@app/shared/drag-drop-content/interfaces/social.interface';
import { SpacerInterface } from '@app/shared/drag-drop-content/interfaces/spacer.interface';
import { TextInterface } from '@app/shared/drag-drop-content/interfaces/text.interface';
import { UploaderInterface } from '@app/shared/drag-drop-content/interfaces/uploader.interface';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private _components: Array<ElementInterface> = [];
  private _formDesign!: FormDesignInterface;

  constructor() {}

  set components(comps: Array<ElementInterface>) {
    this._components = comps;
  }

  set formDesign(frmDesign: FormDesignInterface) {
    this._formDesign = frmDesign;
  }

  /**
   * Generate HTML from drag & drop components
   *
   * @return string
   */
  generateHtml() {
    let html = `<!doctype html>
      <html>
        <head>
        <title>Angular Form Builder</title>
        <!--[if !mso]>-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.39.0/css/tempusdominus-bootstrap-4.min.css" integrity="sha512-3JRrEUwaCkFUBLK1N8HehwQgu8e23jTH4np5NHOmQOobuC4ROQxFwFgBLTnhcnQRMs84muMh0PnnwXlPq5MGjg==" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.39.0/js/tempusdominus-bootstrap-4.min.js" integrity="sha512-k6/Bkb8Fxf/c1Tkyl39yJwcOZ1P4cRrJu77p83zJjN2Z55prbFHxPs9vN7q3l3+tSMGPDdoH51AEU8Vgo1cgAA==" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>        
        <style>
          .hr-form-builder {
            opacity: 1;
            background-color: transparent;
          }         
          div[id^="date_input_"] input,
          div[id^="datetime_input_"] input {
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
          }
          .dz-button {
            background: none;
            border: 0;
          }
          .dropzone {
            min-height: auto;
            padding: 0;
            margin: 0;
          }
          .dropzone .dz-message {
            margin: 0;
          }
        </style>
        <style type="text/css">
            @media only screen and (min-width:751px) {
              .column-per-20 {
                  width: 19.4% !important;
                  max-width: 19.4%;
              }
              .column-per-25 {
                  width: 24.4% !important;
                  max-width: 24.4%;
              }
              .column-per-33 {
                  width: 32.8% !important;
                  max-width: 32.8%;
              }
              .column-per-50 {
                  width: 49.4% !important;
                  max-width: 49.4%;
              }
              .column-per-66 {
                  width: 66.3% !important;
                  max-width: 66.3%;
              }
              .column-per-100 {
                  width: 100% !important;
                  max-width: 100%;
              }
            }
        </style>\n`;

    let formStyles = '';
    let pageStyles = '';

    switch (this._formDesign.page_alignment) {
      case 'center':
        pageStyles += `align-items: center;`;
        break;

      case 'bottom':
        pageStyles += `align-items: flex-end;`;
        break;

      default:
        pageStyles += `align-items: flex-start;`;
        break;
    }

    if (this._formDesign['font_family']) {
      pageStyles += `font-family: ${this._formDesign['font_family']};`;
    }

    if (this._formDesign['font_size']) {
      pageStyles += `font-size: ${this._formDesign['font_size']}px;`;
    }

    if (this._formDesign['background_color']) {
      pageStyles += `background: ${this._formDesign['background_color']};`;
    }

    if (this._formDesign['page_paddings']) {
      pageStyles += `padding: ${this._formDesign['page_paddings']}px;`;
    }

    if (this._formDesign['container_background_color']) {
      formStyles += `background: ${this._formDesign['container_background_color']};`;
    }

    if (this._formDesign['fullWidth'] && this._formDesign['fullWidth']) {
      formStyles += 'width: 100%;';
    } else if (this._formDesign['width']) {
      formStyles += `max-width: ${this._formDesign['width']}px;`;
    }

    if (this._formDesign['form_paddings']) {
      formStyles += `padding: ${this._formDesign['form_paddings']}px;`;
    }

    if (this._formDesign['rounded_corners']) {
      formStyles += `border-radius: ${this._formDesign['rounded_corners']}px;`;
    }

    formStyles += `border: solid ${
      this._formDesign['form_border_width']
        ? this._formDesign['form_border_width']
        : 0
    }px ${
      this._formDesign['form_border_color']
        ? this._formDesign['form_border_color']
        : 'transparent'
    }`;

    html += `</head>
            <body class="d-flex min-vh-100" style="${pageStyles}">
              <form method="post" action="" class="container-fluid user-select-auto mx-auto" style="${formStyles}">\n`;
    html += this.parseComponents(this._components);
    html += `\n</form>            
            <script type="text/javascript">
            Dropzone.autoDiscover = false;
            $(document).ready(function(){
                $(function () {
                  $.fn.datetimepicker.Constructor.Default = $.extend({}, $.fn.datetimepicker.Constructor.Default, {
                    icons: {
                        time: 'far fa-clock',
                        date: 'far fa-calendar',
                        up: 'fas fa-arrow-up',
                        down: 'fas fa-arrow-down',
                        previous: 'fas fa-chevron-left',
                        next: 'fas fa-chevron-right',
                        today: 'far fa-calendar-check-o',
                        clear: 'far fa-trash',
                        close: 'far fa-times'
                    } });

                    $('div[id^="datetime_input_"]').datetimepicker({
                      format: "YYYY-MM-DD HH:mm",
                      focusOnShow: false,
                    });

                    $('div[id^="date_input_"]').datetimepicker({                        
                      format: "YYYY-MM-DD",
                      focusOnShow: false,
                    });

                    $('div[id^="dropzone_"]').each(function() {   
                      console.log($(this).data('max-file-size'))                   
                      $(this).dropzone({
                        addRemoveLinks: true,
                        url: $(this).data('upload-url'),
                        paramName: $(this).data('param-name'),
                        dictDefaultMessage: $(this).data('message'),
                        acceptedFiles: $(this).data('accepted-files'),
                        maxFilesize: $(this).data('max-file-size')
                      });
                    });
                });
            });
            </script>
          </body>
        </html>`;

    return html;
  }

  /**
   * Parse drag & drop components to HTML
   *
   * @param components
   * @return string
   */
  parseComponents(components: Array<ElementInterface>) {
    let content = '';

    for (let component of components) {
      switch (component.machineName) {
        case 'section':
          content += this.parseSectionComponent(component);
          break;

        case 'text':
          content += this.parseTextComponent(component);
          break;

        case 'picture':
          content += this.parsePictureComponent(component);
          break;

        case 'button':
          content += this.parseButtonComponent(component);
          break;

        case 'input':
          content += this.parseInputComponent(component);
          break;

        case 'textarea':
          content += this.parseTextareaComponent(component);
          break;

        case 'radios':
          content += this.parseRadiosComponent(component);
          break;

        case 'dropdown':
          content += this.parseDropdownComponent(component);
          break;

        case 'checkbox':
          content += this.parseCheckboxComponent(component);
          break;

        case 'spacer':
          content += this.parseSpacerComponent(component);
          break;

        case 'separator':
          content += this.parseSeparatorComponent(component);
          break;

        case 'social':
          content += this.parseSocialComponent(component);
          break;

        case 'uploader':
          content += this.parseUploaderComponent(component);
          break;

        default:
          break;
      }
    }

    return content;
  }

  /**
   * Parse component settings to inline styles
   * @param component
   * @return string
   */
  parseComponentSettings(component: ElementInterface) {
    let styles = `padding-top: ${component?.componentSettings?.padding_top}px;
    padding-right: ${component?.componentSettings?.padding_right}px;
    padding-bottom: ${component?.componentSettings?.padding_bottom}px;
    padding-left: ${component?.componentSettings?.padding_left}px;
    background-color: ${component?.componentSettings?.background_color};
    border-radius: ${component?.componentSettings?.rounded_corners}px;`;

    if (
      component.element?.hasOwnProperty('height') &&
      component.machineName === 'spacer'
    ) {
      let spacerEl = component.element as SpacerInterface;
      if (spacerEl.height > 0) {
        styles += `min-height: ${spacerEl.height}px;`;
      } else {
        styles += `min-height: auto;`;
      }
    } else {
      if (
        component?.componentSettings &&
        component?.componentSettings?.height > 0
      ) {
        styles += `min-height: ${component?.componentSettings?.height}px;`;
      } else {
        styles += `min-height: auto;`;
      }
    }

    return styles;
  }

  /**
   * Parse section component to HTML
   *
   * @param component
   * @return string
   */
  parseSectionComponent(component: ElementInterface) {
    let section = '<div class="container-fluid p-0">\n';

    switch (component['column']) {
      case '2-1-3':
        section +=
          '<div class="column-per-33 d-inline-block w-100 float-start">';
        section += this.parseComponents(component.addedComponents[0]);
        section += '</div>';
        section +=
          '<div class="column-per-66 d-inline-block w-100 float-start">';
        section += this.parseComponents(component.addedComponents[1]);
        section += '</div>';
        break;

      case '2-3-1':
        section +=
          '<div class="column-per-66 d-inline-block w-100 float-start">';
        section += this.parseComponents(component.addedComponents[0]);
        section += '</div>';
        section +=
          '<div class="column-per-33 d-inline-block w-100 float-start">';
        section += this.parseComponents(component.addedComponents[1]);
        section += '</div>';
        break;

      default:
        let width = 100;
        let columnClass = '';

        if (component['addedComponents'].length > 0) {
          width = 100 / component['addedComponents'].length;
          columnClass = 'column-per-' + Math.floor(width);
        }
        for (let addedComponents of component.addedComponents) {
          section += `<div class="${columnClass} d-inline-block w-100 float-start">\n`;
          section += this.parseComponents(addedComponents);
          section += '</div>';
        }

        break;
    }

    section += '</div><div class="clearfix"></div>';
    return section;
  }

  /**
   * Parse text component to HTML
   *
   * @param component
   * @return string
   */
  parseTextComponent(component: ElementInterface) {
    const el = component.element as TextInterface;
    let styles = this.parseComponentSettings(component);

    if (el.text_color) {
      styles += `color: ${el.text_color};`;
    }

    if (el.line_height) {
      styles += `line-height: ${el.line_height};`;
    }

    if (el.font_family) {
      styles += `font-family: ${el.font_family};`;
    }

    styles += component?.componentSettings?.background_color
      ? `background-color: ${component?.componentSettings?.background_color};`
      : '';

    let text = `<div style="${styles}" class="text-break">
        ${el.content}
        </div>`;

    return text;
  }

  /**
   * Parse picture component to HTML
   * @param component
   * @return string
   */
  parsePictureComponent(component: ElementInterface) {
    const el = component.element as PictureInterface;
    let styles = this.parseComponentSettings(component);

    let imgStyles = 'max-width: 100%;';

    if (el.alignment) {
      styles += `text-align: ${el.alignment}`;
    }

    if (el.width) {
      imgStyles += 'width:' + (!el.width ? 'auto;' : `${el.width}%;`);
    }

    let picture = `<div style="${styles}">
    <a href="${el.image_link}">
        <img src="${el.image_url}" style="${imgStyles}" alt="${el.alt_text}" />
    </a>
    </div>`;

    return picture;
  }

  /**
   * Parse button component to HTML
   *
   * @param component
   * @return string
   */
  parseButtonComponent(component: ElementInterface) {
    const el = component.element as ButtonInterface;
    let componentStyles = this.parseComponentSettings(component);
    let tableStyles = 'margin:0;border-collapse:collapse;';
    let buttonStyles =
      'padding:0 15px;text-decoration:none;display:block;text-align:center;border:0;';

    if (el.button_size_type === 'full-width') {
      tableStyles += 'width:100%;';
    }

    if (el.text_color) {
      buttonStyles += `color:${el.text_color};`;
    }

    if (el.font_family) {
      buttonStyles += `font-family: ${el.font_family};`;
    }

    if (el.font_size) {
      buttonStyles += `font-size: ${el.font_size}px;`;
    }

    if (el.font_bold) {
      buttonStyles += `font-weight: ${el.font_bold ? 'bold;' : 'normal;'}`;
    }

    if (el.font_italic) {
      buttonStyles += `font-style: ${el.font_italic ? 'italic;' : 'inherit;'}`;
    }

    if (el.rounded_corners) {
      buttonStyles += `border-radius: ${el.rounded_corners}px;`;
    }

    if (el.height) {
      buttonStyles += `height: ${el.height}px; line-height: ${el.height}px;`;
    }

    if (el.gradient_top_color && el.gradient_bottom_color) {
      buttonStyles += `background: linear-gradient(to top, ${el.gradient_bottom_color}, ${el.gradient_top_color});`;
    } else {
      if (el.button_color) {
        buttonStyles += `background-color: ${el.button_color};`;
      }
    }

    if (el.box_shadow_color) {
      buttonStyles += `box-shadow: ${el.box_shadow_color} 0px -3px 0px 0px inset;`;
    }

    if (el.button_size_type) {
      if (el.button_size_type === 'full-width') {
        buttonStyles += 'width: 100%;';
      } else if (el.button_size_type === 'fixed') {
        buttonStyles += `width: ${el.button_size}px;`;
      } else {
        buttonStyles += 'width:auto;';
      }
    } else {
      buttonStyles += 'width:auto;';
    }

    let $div = `<div style="${componentStyles}">`;

    if (el.alignment === 'center') {
      $div += '<center>';
    }

    $div += `<table cellpadding="0" cellspacing="0" style="${tableStyles}" align="${el.alignment}">
          <tr>
            <td style="vertical-align: ${el.vertical_align}">`;

    if (el.link_to) {
      $div += `<a href="${el.link_to}" style="${buttonStyles}">
        ${el.content}
      </a>`;
    } else {
      $div += `<button type="${el.button_type}" style="${buttonStyles}">
        ${el.content}
      </button>`;
    }

    $div += `</td>
          </tr>
        </table>`;

    if (el.alignment === 'center') {
      $div += '</center>';
    }

    $div += '<div style="clear: both"></div>';
    $div += '</div>';

    return $div;
  }

  /**
   * Parse input component to HTML
   *
   * @param component
   * @return string
   */
  parseInputComponent(component: ElementInterface) {
    const el = component.element as InputInterface;
    let componentStyles = this.parseComponentSettings(component);
    let labelStyles = [];
    let styles = [];
    let labelClasses = [];
    let fieldClasses = ['form-control'];
    let requiredAttr = '';
    let requiredAsterisk = '';

    if (this._formDesign['label_font_color']) {
      labelStyles.push(`color: ${this._formDesign['label_font_color']}`);
    }

    if (this._formDesign['label_font_size']) {
      labelStyles.push(`font-size: ${this._formDesign['label_font_size']}px`);
    }

    if (this._formDesign['label_font_bold']) {
      labelClasses.push('fw-bold');
    }

    if (this._formDesign['label_font_italic']) {
      labelClasses.push('fst-italic');
    }

    if (!el.show_label) {
      labelClasses.push('d-none');
    }

    if (el.is_required) {
      requiredAsterisk = '<span class="text-danger d-inline-block">*</span>';
      requiredAttr = ' required ';
    }

    let html = `<div style="${componentStyles}">
        <label class="${labelClasses.join(' ')}" style="${labelStyles.join(
      ';'
    )}">
            <span class="d-inline-block">${el.label}</span>
            ${requiredAsterisk}`;

    if (this._formDesign['field_size'] === 'l') {
      fieldClasses.push('form-control-lg');
    }

    if (this._formDesign['field_size'] === 's') {
      fieldClasses.push('form-control-sm');
    }

    if (this._formDesign['field_background_color']) {
      styles.push(
        `background-color: ${this._formDesign['field_background_color']}`
      );
    }

    if (this._formDesign['field_border_width']) {
      styles.push(
        `border: solid ${this._formDesign['field_border_width']}px ${this._formDesign['field_border_color']}`
      );
    }

    if (this._formDesign['field_rounded_corners']) {
      styles.push(
        `border-radius: ${this._formDesign['field_rounded_corners']}px`
      );
    }

    html += '</label>';

    switch (component['type']) {
      case 'date':
        html += `<div class="input-group date date-picker" id="date_input_${
          component.id
        }" data-target-input="nearest">
                        <input type="text"
                            data-target="#date_input_${component.id}"
                            data-toggle="datetimepicker"
                            class="${fieldClasses.join(' ')}"
                            name="${el.field_name}"
                            autocomplete="off"
                            placeholder="${el.placeholder_text}"
                            style="${styles.join(';')}"
                            ${requiredAttr} />                              
                            <div class="input-group-text" data-toggle="datetimepicker" data-target="#date_input_${
                              component.id
                            }"><i class="fa fa-calendar"></i></div>                            
                        </div>`;
        break;

      case 'datetime':
        html += `<div class="input-group date datetime-picker" id="datetime_input_${
          component.id
        }" data-target-input="nearest">
                      <input type="text"
                          data-target="#datetime_input_${component.id}"
                          data-toggle="datetimepicker"
                          class="datetimepicker-input ${fieldClasses.join(' ')}"
                          name="${el.field_name}"
                            autocomplete="off"
                            placeholder="${el.placeholder_text}"
                          style="${styles.join(';')}"
                          ${requiredAttr} />                              
                          <div class="input-group-text" data-toggle="datetimepicker" data-target="#datetime_input_${
                            component.id
                          }"><i class="fas fa-calendar-times"></i></div>                            
                      </div>`;
        break;

      case 'number':
        html += `<input type="number" class="${fieldClasses.join(' ')}"
        name="${el.field_name}"
        autocomplete="off"
        placeholder="${el.placeholder_text}"
            style="${styles.join(';')}" ${requiredAttr} />`;
        break;

      default:
        html += `<input type="${component.type}" class="${fieldClasses.join(
          ' '
        )}"
        name="${el.field_name}"
        autocomplete="off"
        placeholder="${el.placeholder_text}"
              style="${styles.join(';')}" ${requiredAttr} />`;
        break;
    }

    html += '</div>';

    return html;
  }

  /**
   * Parse textarea component to HTML
   *
   * @param component
   * @return string
   */
  parseTextareaComponent(component: ElementInterface) {
    const el = component.element as InputInterface;
    let labelStyles = [];
    let styles = this.parseComponentSettings(component);
    let labelClasses = [];
    let fieldStyles = '';
    let fieldClasses = ['form-control'];
    let requiredAttr = '';
    let requiredAsterisk = '';

    if (this._formDesign['label_font_color']) {
      labelStyles.push(`color: ${this._formDesign['label_font_color']}`);
    }

    if (this._formDesign['label_font_size']) {
      labelStyles.push(`font-size: ${this._formDesign['label_font_size']}px`);
    }

    if (this._formDesign['label_font_bold']) {
      labelClasses.push('fw-bold');
    }

    if (this._formDesign['label_font_italic']) {
      labelClasses.push('fst-italic');
    }

    if (el.is_required) {
      requiredAsterisk =
        '<span class="text-danger d-inline-block ms-1">*</span>';
      requiredAttr = ' required ';
    }

    if (!el.show_label) {
      labelClasses.push('d-none');
    }

    let html = `<div style="${styles}">
    <label class="${labelClasses.join(' ')}" style="${labelStyles.join(';')}">
        <span class="d-inline-block">${el.label}</span>${requiredAsterisk}`;

    if (this._formDesign['field_size'] === 'l') {
      fieldClasses.push('form-control-lg');
    }

    if (this._formDesign['field_size'] === 's') {
      fieldClasses.push('form-control-sm');
    }

    if (this._formDesign['field_background_color']) {
      fieldStyles += `background-color: ${this._formDesign['field_background_color']};`;
    }

    if (this._formDesign['field_border_width']) {
      fieldStyles += `border: solid ${this._formDesign['field_border_width']}px ${this._formDesign['field_border_color']};`;
    }

    if (this._formDesign['field_rounded_corners']) {
      fieldStyles += `border-radius: ${this._formDesign['field_rounded_corners']}px;`;
    }

    html += `</label>
        <textarea class="${fieldClasses.join(' ')}"
            name="${el.field_name}"
            placeholder="${el.placeholder_text}"
            style="${fieldStyles}"${requiredAttr}></textarea>
        </div>`;

    return html;
  }

  /**
   * Parse radio component to HTML
   *
   * @param component
   * @return string
   */
  parseRadiosComponent(component: ElementInterface) {
    const el = component.element as MultipleSelectInterface;
    let componentStyles = this.parseComponentSettings(component);
    let labelStyles = [];
    let styles = [];
    let labelClasses = [];
    let fieldClasses = ['form-control'];
    let optionLabelClasses = ['form-check-label'];
    let optionLabelStyle = '';
    let requiredAttr = '';
    let requiredAsterisk = '';

    if (el.is_required) {
      requiredAsterisk =
        '<span class="text-danger d-inline-block ms-1">*</span>';
      requiredAttr = ' required ';
    }

    if (this._formDesign['label_font_color']) {
      labelStyles.push(`color: ${this._formDesign['label_font_color']}`);
      optionLabelStyle += `color: ${this._formDesign['label_font_color']};`;
    }

    if (this._formDesign['label_font_size']) {
      labelStyles.push(`font-size: ${this._formDesign['label_font_size']}px`);
      optionLabelStyle += `font-size: ${this._formDesign['label_font_size']}px;`;
    }

    if (this._formDesign['label_font_bold']) {
      labelClasses.push('fw-bold');
    }

    if (this._formDesign['label_font_italic']) {
      labelClasses.push('fst-italic');
      optionLabelClasses.push('fst-italic');
    }

    if (!el.show_label) {
      labelClasses.push('d-none');
    }

    let html = `<div style="${componentStyles}">
        <label class="${labelClasses.join(' ')}" style="${labelStyles.join(
      ';'
    )}">
        <span class="d-inline-block">${el.label}</span>${requiredAsterisk}`;

    if (this._formDesign['field_size'] === 'l') {
      fieldClasses.push('form-control-lg');
    }

    if (this._formDesign['field_size'] === 's') {
      fieldClasses.push('form-control-sm');
    }

    if (this._formDesign['field_background_color']) {
      styles.push(
        `background-color: ${this._formDesign['field_background_color']}`
      );
    }

    if (this._formDesign['field_border_width']) {
      styles.push(
        `border: solid ${this._formDesign['field_border_width']}px ${this._formDesign['field_border_color']}`
      );
    }

    if (this._formDesign['field_rounded_corners']) {
      styles.push(
        `border-radius: ${this._formDesign['field_rounded_corners']}px`
      );
    }

    const options = [];
    for (let option of el.options) {
      options.push(`<div class="form-check">
                        <input class="form-check-input" type="radio" name="${
                          el.field_name
                        }" 
                          id="radio_${option.id}" value="${option.value}"${
        option.is_selected ? ' checked' : ''
      } ${requiredAttr}>
                        <label class="${optionLabelClasses.join(' ')}" 
                          style="${optionLabelStyle}" 
                          for="radio_${option.id}">${option.text}</label>
                    </div>`);
    }

    html += `</label>${options.join('\n')}</div>`;

    return html;
  }

  /**
   * Parse dropdown component to HTML
   *
   * @param component
   * @return string
   */
  parseDropdownComponent(component: ElementInterface) {
    const el = component.element as MultipleSelectInterface;
    let componentStyles = this.parseComponentSettings(component);
    let styles = [];
    let labelStyles = [];
    let labelClasses = [];
    let fieldClasses = ['form-control'];
    let requiredAttr = '';
    let requiredAsterisk = '';
    let html = '';

    if (el.is_required) {
      requiredAsterisk =
        '<span class="text-danger d-inline-block ms-1">*</span>';
      requiredAttr = ' required ';
    }

    if (this._formDesign['label_font_color']) {
      labelStyles.push(`color: ${this._formDesign['label_font_color']}`);
    }

    if (this._formDesign['label_font_size']) {
      labelStyles.push(`font-size: ${this._formDesign['label_font_size']}px`);
    }

    if (this._formDesign['label_font_bold']) {
      labelClasses.push('fw-bold');
    }

    if (this._formDesign['label_font_italic']) {
      labelClasses.push('fst-italic');
    }

    if (!el.show_label) {
      labelClasses.push('d-none');
    }

    html += `<div style="${componentStyles}">
        <label class="${labelClasses.join(' ')}" style="${labelStyles.join(
      ';'
    )}">
            <span class="d-inline-block">${el.label}</span>${requiredAsterisk}`;

    if (this._formDesign['field_size'] === 'l') {
      fieldClasses.push('form-control-lg');
    }

    if (this._formDesign['field_size'] === 's') {
      fieldClasses.push('form-control-sm');
    }

    if (this._formDesign['field_background_color']) {
      styles.push(
        `background-color: ${this._formDesign['field_background_color']}`
      );
    }

    if (this._formDesign['field_border_width']) {
      styles.push(
        `border: solid ${this._formDesign['field_border_width']}px ${this._formDesign['field_border_color']}`
      );
    }

    if (this._formDesign['field_rounded_corners']) {
      styles.push(
        `border-radius: ${this._formDesign['field_rounded_corners']}px`
      );
    }

    const options = [];
    for (let option of el.options) {
      options.push(
        `<option value="${option.value}"${
          option.is_selected ? ' selected' : ''
        }>${option.text}</option>`
      );
    }

    html += `</label>
        <select class="${fieldClasses.join(' ')}"
            name="${el.field_name}"
            style="${styles.join(';')}"${requiredAttr}>
        ${options.join('\n')}
        '</select>
    </div>`;

    return html;
  }

  /**
   * Parse checkbox component to HTML
   *
   * @param component
   * @return string
   */
  parseCheckboxComponent(component: ElementInterface) {
    const el = component.element as CheckboxInterface;
    let styles = this.parseComponentSettings(component);
    const labelStyles = [];
    const labelClasses = ['form-check-label'];

    if (this._formDesign.label_font_color) {
      labelStyles.push(`color: ${this._formDesign.label_font_color}`);
    }

    if (this._formDesign.label_font_size) {
      labelStyles.push(`font-size: ${this._formDesign.label_font_size}px`);
    }

    if (this._formDesign.label_font_bold) {
      labelClasses.push('fw-bold');
    }

    if (this._formDesign.label_font_italic) {
      labelClasses.push('fst-italic');
    }

    let html = '';
    let requiredAttr = '';
    let requiredAsterisk = '';

    if (el.is_required) {
      requiredAttr = ' required ';
      requiredAsterisk =
        '<span class="text-danger d-inline-block ms-1">*</span>';
    }

    html += `<div class="form-check" style="${styles}">
        <input type="checkbox" class="form-check-input ms-0 me-2" name="${
          el.field_name
        }"${requiredAttr} value="1" id="${component.id}" />
        <label class="${labelClasses.join(' ')}" style="${labelStyles.join(
      ';'
    )}" for="${component.id}">            
            ${el.label} ${requiredAsterisk}
        </label>
    </div>`;

    return html;
  }

  /**
   * Parse spacer component to HTML
   *
   * @param component
   * @return string
   */
  parseSpacerComponent(component: ElementInterface) {
    let styles = this.parseComponentSettings(component);
    return `<div style="${styles}"></div>`;
  }

  /**
   * Parse separator component to HTML
   *
   * @param component
   * @return string
   */
  parseSeparatorComponent(component: ElementInterface) {
    const el = component.element as SeparatorInterface;
    let styles = this.parseComponentSettings(component);
    let hrStyles = 'margin:0;';

    if (el.border_style) {
      hrStyles += `border-top-style: ${el.border_style};`;
    }

    if (el.border_width) {
      hrStyles += `border-top-width: ${el.border_width}px;`;
    }

    if (el.border_color) {
      hrStyles += `border-top-color: ${el.border_color};`;
    }

    let div = `<div style="${styles}" class="mj-outlook-group-fix">
                <hr class="hr-form-builder" style="${hrStyles}">
                </div>`;

    return div;
  }

  /**
   * Parse social component to HTML
   *
   * @param component
   * @return string
   */
  parseSocialComponent(component: ElementInterface) {
    let styles = this.parseComponentSettings(component);
    let imgWrapperStyles = 'display:inline-block;';
    let imgStyles = 'margin:5px;';

    const element = component?.element as SocialInterface;
    if (element.placement) {
      imgWrapperStyles +=
        'width:' +
        (element.placement === 'vertically' ? element.icon_size : 'auto');
    }

    if (element.alignment) {
      styles += `text-align: ${element.alignment}`;
    }

    if (element.icon_size) {
      imgStyles += `width: ${element.icon_size}`;
    }

    let div = `<div style="${styles}">
                    <div style="${imgWrapperStyles}">`;

    if (component?.buttons) {
      for (let social of component?.buttons) {
        div +=
          '<a href="' + (social['link_to'] ? social['link_to'] : '') + '">';
        div +=
          '<img src="' +
          social['img_link'] +
          `" style="${imgStyles}" alt="" width="${element.icon_size}" />`;
        div += '</a>';
      }
    }

    div += '</div>';
    div += '</div>';

    return div;
  }

  /**
   * Parse uploader component to HTML
   *
   * @param component
   * @return string
   */
  parseUploaderComponent(component: ElementInterface) {
    const el = component?.element as UploaderInterface;
    let wrapperClass = '';
    let styles = this.parseComponentSettings(component);

    if (el.line_height > 0) {
      styles += `line-height: ${el.line_height};`;
    }

    if (el.width_type === 'fixed') {
      styles += `width: ${el.width}px;`;
    } else if (el.width_type === 'full-width') {
      styles += `width: 100%;`;
    } else {
      styles += `width: auto;`;
    }

    if (el.alignment === 'center') {
      wrapperClass = 'justify-content-center';
    } else  if (el.alignment === 'right') {
      wrapperClass = 'justify-content-end';
    }

    styles += `font-family: ${el.font_family};
      color: ${el.text_color};    
      border-style: ${el.border_style};
      border-width: ${el.border_width}px;
      border-color: ${el.border_color};
      font-size: ${el.font_size}px;
    `;

    return `<div class="d-flex align-items-center ${wrapperClass}">
      <div class="dropzone" 
        style="${styles}" 
        id="dropzone_${component.id}"
        data-param-name="${el.field_name}"
        data-message="${el.placeholder}"
        data-upload-url="${el.upload_url}"
        data-accepted-files="${el.accepted_files}"
        data-max-file-size="${el.max_file_size}"></div>
      </div>`;
  }
}
