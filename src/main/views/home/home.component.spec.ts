import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClearCurrencyPipeModule } from '@mxc-ui/lib/pipes/clear-currency.pipe';
import { InputModule } from '@mxc-ui/public-api';
import { appMetaReducers, appReducer } from '@mxc/state/app.reducer';
import { CalculateFacade } from '@mxc/state/calculate';
import { Store, StoreModule } from '@ngrx/store';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;
  let instance: HomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HomeRoutes,
        InputModule,
        ReactiveFormsModule,
        ClearCurrencyPipeModule,
        StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers })
      ],
      declarations: [HomeComponent],
      providers: [Store, CalculateFacade]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    compiled = fixture.debugElement.nativeElement;
    instance = fixture.componentRef.instance;
  }));

  it('Should create the home', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  describe('HTML', () => {

    it('Should exist Currency from INPUT', () => {
      fixture.detectChanges();

      expect(compiled.querySelector('mxc-input-currency'))
        .toBeTruthy();
    });

    it('Should exist button Calculate', () => {
      fixture.detectChanges();

      expect(compiled.querySelector('button'))
        .toBeTruthy();

      expect(compiled.querySelector('button').innerText)
        .toEqual('CALCULATE');
    });

    it('Should exist Currency to INPUT', () => {
      fixture.detectChanges();

      expect(compiled.querySelector('#result'))
        .toBeTruthy();
    });

    it('Should input #result be readonly', () => {
      fixture.detectChanges();

      expect(compiled.querySelector<HTMLInputElement>('#result').readOnly)
        .toBeTruthy();
    });
  });

  describe('TS', () => {
    it('Should Defined form', () => {
      fixture.detectChanges();
      expect(instance.form)
        .toBeDefined();
    });

    it('Should calculate Success', done => {
      fixture.detectChanges();
      instance.fixerFacade.fixer({});
      instance.amount.setValue(1);
      instance.calculate();

      instance.calculateFacade
        .getCalculate$
        .subscribe(res => {
          expect(res.isFailed)
            .toBeFalsy();
          done();
        });
    });
  });

});
