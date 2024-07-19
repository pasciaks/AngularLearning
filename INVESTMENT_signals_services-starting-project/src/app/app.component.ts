import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentService } from './investment.service';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { InvestmentResult } from './investment-result.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  constructor(private investmentService: InvestmentService) {}

  // investmentResults?: InvestmentResult[];

  // investmentResults = signal<InvestmentResult[] | undefined>(undefined);

  onCalculateInvestmentResults(data: InvestmentInput) {
    //let result: InvestmentResult[] =

    this.investmentService.calculateInvestmentResults(data);
    //this.investmentResults.set(result);
  }
}
