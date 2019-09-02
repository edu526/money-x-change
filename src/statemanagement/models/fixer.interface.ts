import { IsoCodeCurrency } from '../enums/currency.enum';

export interface IFixerRequest {
  base?: IsoCodeCurrency | string;
  symbols?: Array<IsoCodeCurrency | string>;
}

export interface IFixer {
  success: boolean;
  timestamp: number;
  base: IsoCodeCurrency;
  date: string;
  rates: IRates;

  isFailed?: boolean;
}

export interface IRates {
  [key: string]: number;
}
