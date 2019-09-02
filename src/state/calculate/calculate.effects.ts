import { Injectable } from '@angular/core';
import { isDef, isObjNotEmpty } from '@mxc-shared/helpers/util/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as allCalculateActions from './calculate.actions';

@Injectable()
export class CalculateEffects {

  constructor(
    private readonly actions$: Actions
  ) { }

  @Effect()
  public calculate$: Observable<Action> = this.actions$
    .pipe(
      ofType<allCalculateActions.Calculate>(allCalculateActions.CalculateActionTypes.Calculate),
      switchMap(action => {
        const { fromCurrency, toCurrency, baseRate, rates, amount } = action.payload;

        if (isObjNotEmpty(rates)) {
          const fromRate = fromCurrency === baseRate ? 1 : rates[fromCurrency];
          let toRate = toCurrency === baseRate ? 1 : rates[toCurrency];

          if (!isDef(fromRate)) {
            return of(new allCalculateActions.CalculateFail(`Not found => ${fromCurrency} rate`));
          }

          if (!isDef(toRate)) {
            return of(new allCalculateActions.CalculateFail(`Not found => ${toCurrency} rate`));
          }

          if (fromCurrency !== baseRate) {
            toRate = 1 / rates[fromCurrency];
          }

          const total = (amount || 1) * toRate;

          return of(new allCalculateActions.CalculateSuccess({ rate: toRate, total, fromCurrency, toCurrency, amount }));
        }

        return of(new allCalculateActions.CalculateFail('Not found => rates'));
      }),
      catchError(err => of(new allCalculateActions.CalculateFail(err)))
    );

}
