import { CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        CommonModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    compiled = fixture.debugElement.nativeElement;

  }));

  it('Should create the header', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  it('Should exist avatar div', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.g-avatar'))
      .toBeTruthy();
  });

  it('Should exist four ghost div', () => {
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.g-ghost').length)
      .toEqual(4);
  });

});
