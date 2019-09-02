import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class UnsubscribeOnDestroy implements OnDestroy {

  unsubscribeDestroy$: Subject<boolean> = new Subject();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribeDestroy$.next(true);
    this.unsubscribeDestroy$.complete();
  }

}
