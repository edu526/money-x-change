import { ICalculate } from '@mxc/statemanagement/models/calculate.interface';
import { CalculateAction, CalculateActionTypes } from './calculate.actions';

export const initialState: any = {};

export function reducer(state = initialState, action: CalculateAction): ICalculate {
  switch (action.type) {
    case CalculateActionTypes.Calculate:

      return { ...state, isFailed: undefined };
    case CalculateActionTypes.CalculateSuccess:

      return { ...action.payload };
    case CalculateActionTypes.CalculateFail:

      return { ...state, error: action.payload, isFailed: true };
    default:
      return state;
  }
}
