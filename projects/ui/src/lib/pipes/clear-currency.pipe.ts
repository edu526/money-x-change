import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clearCurrency'
})
export class ClearCurrencyPipe implements PipeTransform {

  transform(value: any): any {
    value = `${value || ''}`;

    return Number(value.replace(/[^0-9.-]+/g, ''));
  }

}

@NgModule({
  declarations: [ClearCurrencyPipe],
  exports: [ClearCurrencyPipe],
  providers: [ClearCurrencyPipe]
})
export class ClearCurrencyPipeModule { }
