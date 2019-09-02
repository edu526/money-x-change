import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberDirectiveModule } from '@mxc-ui/lib/directives/number.directive';
import { ClearCurrencyPipeModule } from '@mxc-ui/lib/pipes/clear-currency.pipe';
import { InputCurrencyComponent } from './input-currency/input-currency.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NumberDirectiveModule,
    ClearCurrencyPipeModule
  ],
  providers: [CurrencyPipe],
  declarations: [InputCurrencyComponent],
  exports: [InputCurrencyComponent]
})
export class InputModule { }
