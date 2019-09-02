import { ICalculate } from '@mxc/statemanagement/models/calculate.interface';
import { IFixer } from '@mxc/statemanagement/models/fixer.interface';

export interface IAppState {
  readonly fixer: IFixer;
  readonly calculate: ICalculate;
}

export type State = IAppState;
