import { ICalculate, ICalculateRequest } from '@mxc/statemanagement/models/calculate.interface';
import { Action } from '@ngrx/store';

export enum CalculateActionTypes {
  Calculate = '[Button] Calculate',
  CalculateSuccess = '[Button] CalculateSuccess',
  CalculateFail = '[Button] CalculateFail'
}

export class Calculate implements Action {
  public readonly type = CalculateActionTypes.Calculate;
  constructor(public payload: ICalculateRequest) { }
}

export class CalculateFail implements Action {
  public readonly type = CalculateActionTypes.CalculateFail;
  constructor(public payload: string) { }
}

export class CalculateSuccess implements Action {
  public readonly type = CalculateActionTypes.CalculateSuccess;
  constructor(public payload: ICalculate) { }
}

export type CalculateAction = Calculate | CalculateFail | CalculateSuccess;
