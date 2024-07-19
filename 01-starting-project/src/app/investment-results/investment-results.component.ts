import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InvestmentInput } from '../investment-input.model';
import { InvestmentResult } from '../investment-result.model';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  @Input() results!: InvestmentResult[];
}
