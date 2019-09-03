import { HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { ApiModule } from '@mxc-shared/public-api';
import { AuthenticationModule } from '@mxc/interceptors/authentication';
import { FixerService } from './fixer.service';

describe('Service: FixerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixerService],
      imports: [
        HttpClientModule,
        ApiModule,
        AuthenticationModule
      ]
    });
  });

  it('Should exist', inject([FixerService], (service: FixerService) => {
    expect(service)
      .toBeTruthy();
  }));

  it('Should response base', async(inject([FixerService], (service: FixerService) => {
    service.getBase()
      .subscribe(res => {
        expect(res && res.success)
          .toBeTruthy();
      });
  })));

});
