import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { Button } from '@sl-design-system/button';
import { ButtonBar } from '@sl-design-system/button-bar';
import { Checkbox, CheckboxGroup } from '@sl-design-system/checkbox';
import { Form, FormController, FormField, FormValidationErrors } from '@sl-design-system/form';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import { TextField } from '@sl-design-system/text-field';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

/**
 * An example element.
 */
@customElement('my-foo')
export class Foo extends ScopedElementsMixin(LitElement) {
  static get scopedElements(): ScopedElementsMap {
    return {
      'sl-button': Button,
      'sl-button-bar': ButtonBar,
      'sl-form': Form,
      'sl-form-field': FormField,
      'sl-form-validation-errors': FormValidationErrors,
      'sl-radio': Radio,
      'sl-radio-group': RadioGroup,
      'sl-checkbox': Checkbox,
      'sl-checkbox-group': CheckboxGroup,
      'sl-text-field': TextField
    };
  }

  @state() items: string[] = [];

  form = new FormController<{
    firstName: string,
    lastName: string,
    visibility: string[]
  }>(this);

  render(): TemplateResult {
    return html`
      <sl-form>
        <sl-form-field label="Who is allowed to see this column and the results in it?">
          <sl-checkbox-group name="visibility">
            <sl-checkbox value="isVisibleForStudent">Parents and students</sl-checkbox>
            <sl-checkbox value="isVisibleForTeacher">Teaching staff (OP)</sl-checkbox>
          </sl-checkbox-group>
        </sl-form-field>
      
        <sl-form-field label="First name">
            <sl-text-field name="firstName" required></sl-text-field>
        </sl-form-field>
      
        <sl-form-field label="Last name">
            <sl-text-field name="lastName"></sl-text-field>
        </sl-form-field>

        <sl-form-validation-errors .controller=${this.form}></sl-form-validation-errors>
       
        <sl-button-bar align="end">
          <sl-button @click=${this.#update} variant="primary">Update</sl-button>
          <sl-button @click=${this.#onSave} variant="primary">Save</sl-button>
        </sl-button-bar>
      </sl-form>
    `
  }

  #update(): void {
    this.form.value = { firstName: 'Jane', lastName: 'Doe', visibility: ['isVisibleForStudent'] };

    this.requestUpdate();
  }

  #onSave(): void {
    console.log('first name', this.form.value?.firstName);
    console.log('last name', this.form.value?.lastName);

    this.form.reportValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-foo': Foo
  }
}
