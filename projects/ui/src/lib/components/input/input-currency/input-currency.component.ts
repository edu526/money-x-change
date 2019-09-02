import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClearCurrencyPipe } from '@mxc-ui/lib/pipes/clear-currency.pipe';
import { MxcInputBaseComponent, providerInputBase } from '../input-base.component';

@Component({
  selector: 'mxc-input-currency',
  templateUrl: './input-currency.component.html',
  providers: [providerInputBase(InputCurrencyComponent)]
})
export class InputCurrencyComponent extends MxcInputBaseComponent implements OnInit {

  @Output() onchange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onfocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() onblur: EventEmitter<any> = new EventEmitter<any>();

  @Input() isoCode: string;

  constructor(
    private clearCurrency: ClearCurrencyPipe,
    private currencyPipe: CurrencyPipe
  ) {
    super();
  }

  onChangeInput(event: any): void {
    this.onchange.emit(event);
  }

  onFocusInput(event: any): void {
    this.onfocus.emit(event);
    this.value = this.clearCurrency.transform(this.value || '') || null;
  }

  onBlurInput(event: any): void {
    this.onblur.emit(event);
    this.formatValue();
  }

  ngOnInit(): void { }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }

    this.formatValue();
  }

  private formatValue(): void {
    const clearValue = this.clearCurrency.transform(this.value || '');
    this.value = clearValue && this.currencyPipe.transform(clearValue, this.isoCode, 'symbol', '.2-5') || null;
  }
}
