import { CommonModule } from '@angular/common';
import { Component, computed, input, Input } from '@angular/core';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentResult } from '../investment-result.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  // @Input() results?: InvestmentResult[];
  // results = input<InvestmentResult[]>();

  // get results(): InvestmentResult[] {
  //   return this.investmentService.getInvestmentResults;
  // }

  // results = this.investmentService.resultData.asReadonly();

  results = computed(() => {
    return this.investmentService.resultData();
  });

  constructor(private investmentService: InvestmentService) {}
}
