import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';
import { InvestmentInput } from '../investment-input.model';

@Component({
  selector: 'app-user-input',
  // standalone: true,
  // imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  constructor(private investmentService: InvestmentService) {}

  initialInvestment = signal('0'); //: string = '0';
  annualInvestment = signal('0'); //: string = '0';
  returnRate = signal('5'); //: string = '5';
  duration = signal('10'); //: string = '10';

  @Output() calculate = new EventEmitter<InvestmentInput>();

  onSubmit() {
    console.log('Initial Investment: ' + this.initialInvestment());
    console.log('Annual Investment: ' + this.annualInvestment());
    console.log('Return Rate: ' + this.returnRate());
    console.log('Duration: ' + this.duration());

    let data = {
      initialInvestment: Number(this.initialInvestment()),
      annualInvestment: Number(this.annualInvestment()),
      expectedReturn: Number(this.returnRate()),
      duration: Number(this.duration()),
    };

    //this.calculate.emit(data);

    this.investmentService.calculateInvestmentResults(data);
  }
}
