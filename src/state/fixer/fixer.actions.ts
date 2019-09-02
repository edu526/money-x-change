import { Action } from '@ngrx/store';

export enum FixerActionTypes {
  GetBaseFixer = '[API] GetBaseFixer',
  GetBaseFixerSuccess = '[API] GetBaseFixerSuccess',
  GetBaseFixerFail = '[API] GetBaseFixerFail',
  CalculateFixer = '[Page] CalculateFixer'
}

export class GetBaseFixer implements Action {
  public readonly type = FixerActionTypes.GetBaseFixer;
  constructor(public payload: any) { }
}

export class GetBaseFixerFail implements Action {
  public readonly type = FixerActionTypes.GetBaseFixerFail;
  constructor(public payload: any) { }
}

export class GetBaseFixerSuccess implements Action {
  public readonly type = FixerActionTypes.GetBaseFixerSuccess;
  constructor(public payload: any) { }
}

export type FixerAction = GetBaseFixer | GetBaseFixerFail | GetBaseFixerSuccess;
