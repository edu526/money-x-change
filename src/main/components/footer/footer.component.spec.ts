import { CommonModule } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      imports: [
        CommonModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    compiled = fixture.debugElement.nativeElement;
  }));

  it('Should create the footer', () => {
    fixture.detectChanges();

    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  it('Should create four divs', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.container').childElementCount)
      .toEqual(4);
  });

});
