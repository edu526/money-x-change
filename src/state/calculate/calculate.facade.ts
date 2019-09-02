import { Injectable } from '@angular/core';
import { ICalculate, ICalculateRequest } from '@mxc/statemanagement/models/calculate.interface';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as allCalculateActions from './calculate.actions';
import { calculateSelect } from './calculate.selector';

@Injectable({
  providedIn: 'root'
})
export class CalculateFacade {

  constructor(private readonly store: Store<ICalculate>) { }

  public readonly getCalculate$: Observable<ICalculate> = this.store.pipe<ICalculate>(
    select<ICalculate>(calculateSelect.getCalculate)
  );

  public readonly isCalculateFail$: Observable<ICalculate> = this.store.pipe<ICalculate>(
    select<ICalculate>(calculateSelect.isCalculateFail)
  );

  public calculate(request: ICalculateRequest): void {
    this.store.dispatch(new allCalculateActions.Calculate(request));
  }

}
