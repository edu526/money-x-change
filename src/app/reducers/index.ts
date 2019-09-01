import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface IState {

}

export const reducers: ActionReducerMap<IState> = {

};

export const metaReducers: Array<MetaReducer<IState>> = !environment.production ? [] : [];
