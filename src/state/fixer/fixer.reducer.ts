import { IFixer } from '@mxc/statemanagement/models/fixer.interface';
import { FixerAction, FixerActionTypes } from './fixer.actions';

export const initialState: any = {};

export function reducer(state = initialState, action: FixerAction): IFixer {
  switch (action.type) {
    case FixerActionTypes.GetBaseFixer:

      return { ...state, isFailed: undefined };
    case FixerActionTypes.GetBaseFixerSuccess:

      return { ...state, ...action.payload, isFailed: false };
    case FixerActionTypes.GetBaseFixerFail:

      return { ...state, isFailed: true };
    default:
      return state;
  }
}
