import { isDef } from '@mxc-shared/helpers/util/operators';
import { ICalculate } from '@mxc/statemanagement/models/calculate.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getCalculateState = createFeatureSelector<ICalculate>('calculate');
const getCalculate = createSelector(
  getCalculateState,
  st => st || {}
);

const isCalculateFail = createSelector(
  getCalculateState,
  st => (isDef(st.isFailed) ? !!st.isFailed : undefined)
);

export const calculateSelect = {
  getCalculate,
  isCalculateFail
};
