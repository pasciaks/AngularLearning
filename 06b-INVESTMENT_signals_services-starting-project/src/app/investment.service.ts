import { Injectable, signal } from '@angular/core';
import calculateInvestmentResults from '../investment-results';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResult } from './investment-result.model';
@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  constructor() {}

  // resultData: InvestmentResult[] = [];

  resultData = signal<InvestmentResult[]>([]);

  get getInvestmentResults(): InvestmentResult[] {
    return this.resultData();
  }

  calculateInvestmentResults(data: InvestmentInput): void {
    this.resultData.set(calculateInvestmentResults(data));
    //return this.resultData();
  }
}
