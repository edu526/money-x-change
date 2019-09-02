import { forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProp } from '@mxc-ui/common/helpers';

// tslint:disable-next-line:only-arrow-functions
export function providerInputBase(type: any): any {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}

export abstract class MxcInputBaseComponent implements OnInit, ControlValueAccessor {

  protected _placeholder: string;
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value || '';
  }

  protected _type: string;
  @Input()
  get type(): string {
    return this._type;
  }
  set type(type: string) {
    this._type = type || 'text';
  }

  protected _value: string;
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this.propagateChange(this._value);
  }

  protected _disabled: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProp(value);
  }

  protected _error: boolean;
  @Input()
  get error(): boolean {
    return this._error;
  }
  set error(value: boolean) {
    this._error = coerceBooleanProp(value);
  }

  constructor() {
    this._placeholder = '';
    this._type = 'text';
    this._disabled = false;
    this._error = false;
  }

  ngOnInit(): void { }

  /* Takes the value  */
  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void { }

}
