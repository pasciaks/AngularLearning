import { Injectable } from '@angular/core';
import calculateInvestmentResults from '../investment-results';
@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  constructor() {}

  calculateInvestmentResults(data: {
    initialInvestment: number;
    annualInvestment: number;
    expectedReturn: number;
    duration: number;
  }) {
    return calculateInvestmentResults(data);
  }
}
