import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeLogger } from 'ngrx-store-logger';
import { IAppState } from './app.interface';
import { reducer as calculateReducer } from './calculate/calculate.reducer';
import { reducer as fixerReducer } from './fixer/fixer.reducer';

export function logger(reducer: ActionReducer<IAppState>): any {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
  return localStorageSync({
    keys: ['fixer', 'calculate'],
    rehydrate: true,
    storageKeySerializer: key => `mxc_${key}`
  })(reducer);
}

export const appReducer: ActionReducerMap<IAppState> = {
  fixer: fixerReducer,
  calculate: calculateReducer
};

export const appMetaReducers: Array<MetaReducer<IAppState>> = [logger, storeFreeze, localStorageSyncReducer];
