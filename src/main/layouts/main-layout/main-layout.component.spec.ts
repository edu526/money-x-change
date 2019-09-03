import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FooterModule } from '@mxc/components/footer';
import { HeaderModule } from '@mxc/components/header';
import { RoutesModule } from '@mxc/routes';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let fixture;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainLayoutComponent
      ],
      imports: [
        CommonModule,
        RouterModule,
        HeaderModule,
        FooterModule,
        RoutesModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    compiled = fixture.debugElement.nativeElement;

  }));

  it('Should create the layout', () => {
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  it('Should exist header', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('header'))
      .toBeTruthy();
  });

  it('Should exist main', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('main'))
      .toBeTruthy();
  });

  it('Should exist class g-main in main', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('main.g-main'))
      .toBeTruthy();
  });

  it('Should exist footer', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('footer'))
      .toBeTruthy();
  });

});
