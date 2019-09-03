import { Injectable } from '@angular/core';
import { ApiService } from '@mxc-shared/public-api';
import { FixerEndpoint } from '@mxc/endpoints/fixer.endpoint';
import { IsoCodeCurrency } from '@mxc/statemanagement/enums/currency.enum';
import { IFixer } from '@mxc/statemanagement/models/fixer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixerService {
  constructor(
    private apiService: ApiService
  ) { }

  getBase(base?: IsoCodeCurrency, symbols: Array<IsoCodeCurrency> = []): Observable<IFixer> {
    return this.apiService.get(FixerEndpoint.baseFixer, { params: { base: base || '', symbols: symbols.join(',') } });
  }

}
