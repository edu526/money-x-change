import { Injectable } from '@angular/core';
import { FixerService } from '@mxc/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as allFixerActions from './fixer.actions';

@Injectable()
export class FixerEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly fixerService: FixerService
  ) { }

  @Effect()
  public requestFixer$: Observable<Action> = this.actions$
    .pipe(
      ofType<allFixerActions.GetBaseFixer>(allFixerActions.FixerActionTypes.GetBaseFixer),
      switchMap(action => {
        const { base, synbols } = action.payload;

        return this.fixerService.getBase(base, synbols)
          .pipe(
            map(r => {
              if (r && r.success) {
                return new allFixerActions.GetBaseFixerSuccess(r);
              }

              return new allFixerActions.GetBaseFixerFail(r);
            }),
            catchError(err => of(new allFixerActions.GetBaseFixerFail(err)))
          );
      }),
      catchError(err => of(new allFixerActions.GetBaseFixerFail(err)))
    );

}
