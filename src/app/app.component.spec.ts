import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule } from '@mxc-shared/public-api';
import { AuthenticationModule } from '@mxc/interceptors/authentication';
import { MainLayoutModule } from '@mxc/layouts';
import { RoutesModule } from '@mxc/routes';
import { StateModule } from '@mxc/state/state.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        RoutesModule,
        HttpClientModule,
        MainLayoutModule,
        ApiModule,
        AuthenticationModule,
        StateModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

});
