import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroy } from '@mxc-shared/helpers/util/unsubscribe-on-destroy';
import { coerceBooleanProp } from '@mxc-ui/common/helpers';
import { ClearCurrencyPipe } from '@mxc-ui/lib/pipes/clear-currency.pipe';
import { environment } from '@mxc/environment';
import { CalculateFacade } from '@mxc/state/calculate';
import { FixerFacade } from '@mxc/state/fixer';
import { ICalculate, ICalculateRequest } from '@mxc/statemanagement/models/calculate.interface';
import { IFixer, IFixerRequest } from '@mxc/statemanagement/models/fixer.interface';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { IsoCodeCurrency } from '@mxc/statemanagement/enums/currency.enum';

@Component({
  selector: 'mxc-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends UnsubscribeOnDestroy implements OnInit {

  calculateData: ICalculate;
  form: FormGroup;

  private fixer: IFixer;
  amount: AbstractControl;
  isoCodeBase = environment.from_currency;

  constructor(
    private fixerFacade: FixerFacade,
    private calculateFacade: CalculateFacade,
    private fb: FormBuilder,
    private clearCurrency: ClearCurrencyPipe
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getRates();
    this.onRatesChange();
    this.onCalculate();
  }

  calculate(): void {
    if (this.form.valid) {
      const amount = this.clearCurrency.transform(this.amount.value);
      const params: ICalculateRequest = {
        amount: Number(amount || 0),
        baseRate: null,
        fromCurrency: environment.from_currency,
        toCurrency: environment.to_currency,
        rates: null
      };
      if (!coerceBooleanProp(this.fixer.isFailed)) {
        params.baseRate = this.fixer.base;
        params.rates = this.fixer.rates;

        this.calculateFacade.calculate(params);
      }
    } else {
      this.amount.markAsTouched({ onlySelf: true });
    }
  }

  private createForm(): void {
    this.form = this.fb.group({ amount: [null, Validators.required] });
    this.amount = this.form.get('amount');
  }

  private getRates(): void {
    /* INFO: Access key no cuenta con permisos suficinetes
     * environment.use_custom_base_api = false
    */
    const params: IFixerRequest = environment.use_custom_base_api ?
      { symbols: [environment.to_currency], base: environment.from_currency } : {};

    this.fixerFacade.fixer(params);
    interval((environment.minutes_refresh || 1) * 1000 * 60)
      .pipe(takeUntil(this.unsubscribeDestroy$))
      .subscribe(() => this.fixerFacade.fixer(params));
  }

  private onRatesChange(): void {
    this.fixerFacade.getFixer$
      .pipe(takeUntil(this.unsubscribeDestroy$))
      .subscribe(fixer => {
        this.fixer = fixer;
      });
  }

  private onCalculate(): void {
    this.calculateFacade.getCalculate$
      .subscribe(calculate => {
        this.calculateData = calculate;
        if (calculate && calculate.amount) {
          this.amount.setValue(calculate.amount);
        }
      });
  }

}
