import { isDef } from '@mxc-shared/helpers/util/operators';
import { IFixer } from '@mxc/statemanagement/models/fixer.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getFixerState = createFeatureSelector<IFixer>('fixer');
const getFixer = createSelector(
  getFixerState,
  st => st || {}
);

const isGetFixerFail = createSelector(
  getFixerState,
  st => (isDef(st.isFailed) ? !!st.isFailed : undefined)
);

export const fixerSelect = {
  getFixer,
  isGetFixerFail
};
