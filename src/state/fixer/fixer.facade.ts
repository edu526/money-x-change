import { Injectable } from '@angular/core';
import { IFixer, IFixerRequest } from '@mxc/statemanagement/models/fixer.interface';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as allFixerActions from './fixer.actions';
import { fixerSelect } from './fixer.selector';

@Injectable({
  providedIn: 'root'
})
export class FixerFacade {

  constructor(private readonly store: Store<IFixer>) { }

  public readonly getFixer$: Observable<IFixer> = this.store.pipe<IFixer>(
    select<IFixer>(fixerSelect.getFixer)
  );

  public readonly isFixerFailed$: Observable<IFixer> = this.store.pipe<IFixer>(
    select<IFixer>(fixerSelect.isGetFixerFail)
  );

  public fixer(request: IFixerRequest): void {
    this.store.dispatch(new allFixerActions.GetBaseFixer(request));
  }

}
