import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { environment } from '@mxc/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appMetaReducers, appReducer } from './app.reducer';
import { CalculateEffects } from './calculate/calculate.effects';
import { FixerEffects } from './fixer/fixer.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([
      FixerEffects,
      CalculateEffects
    ]),
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ]
})
export class StateModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StateModule
  ) {
    if (parentModule) {
      // tslint:disable-next-line: no-throw
      throw new Error('StateModule is already loaded. Import it in the AppModule only');
    }
  }
}
