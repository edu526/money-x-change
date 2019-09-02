import { IsoCodeCurrency } from '../enums/currency.enum';
import { IRates } from './fixer.interface';

export interface ICalculate {
  fromCurrency: IsoCodeCurrency | string;
  toCurrency: IsoCodeCurrency | string;
  rate: number;
  amount: number;
  total: number;

  isFailed?: boolean;
}

export interface ICalculateRequest {
  fromCurrency: IsoCodeCurrency | string;
  toCurrency: IsoCodeCurrency | string;
  baseRate: IsoCodeCurrency | string;
  rates: IRates;
  amount: number;
}
